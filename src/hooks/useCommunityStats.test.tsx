import { beforeEach, describe, expect, it, vi } from "vitest";
import { act, render, renderHook, waitFor } from "@testing-library/react";
import { ResourceUnavailableRpcError, type Address } from "viem";
import type { Deployment } from "@/lib/deployment";

const readContract = vi.fn();

vi.mock("viem", async (importOriginal) => {
  const actual = await importOriginal<typeof import("viem")>();
  return { ...actual, createPublicClient: vi.fn(() => ({ readContract })) };
});

const { useCommunityStats } = await import("@/hooks/useCommunityStats");

function deploymentFor(chainId: number, networkName: string): Deployment {
  return {
    status: "local",
    networkName,
    registryAddress: "0x0165878A594ca255338adfa4d48449f69242Eb8F",
    explorerBaseUrl: null,
    chainId,
    rpcUrl: "http://127.0.0.1:8545",
    currencySymbol: "ETH",
  };
}

function Probe({ deployment, address = "0x1111111111111111111111111111111111111111" }: { deployment: Deployment; address?: Address }) {
  const { community } = useCommunityStats({
    deployment,
    address,
    wrongChain: false,
  });
  return <span data-testid="total">{String(community.totalCareActions)}</span>;
}

const settle = () => new Promise((resolve) => setTimeout(resolve, 300));

describe("useCommunityStats read stability", () => {
  beforeEach(() => {
    readContract.mockReset();
    readContract.mockResolvedValue(BigInt(1));
  });

  // Regression: chainFromDeployment builds a fresh chain object for any id
  // outside X Layer. Unmemoised, that identity churn re-fired this effect on
  // every render — measured at >7000 reads in 400ms on Anvil.
  it("issues a bounded number of reads on a non-X-Layer chain", async () => {
    render(<Probe deployment={deploymentFor(31337, "Anvil local")} />);
    await settle();
    expect(readContract.mock.calls.length).toBeLessThan(5);
  });

  it("issues a bounded number of reads on X Layer", async () => {
    render(<Probe deployment={deploymentFor(196, "X Layer")} />);
    await settle();
    expect(readContract.mock.calls.length).toBeLessThan(5);
  });

  // Regression: `address` was missing from the effect deps. The render-phase
  // cacheKey reset puts the panel back into loading on an account switch, so
  // without the dep the effect never re-ran and the counter stuck on "Reading…".
  it("resolves the total again after the connected account changes", async () => {
    const deployment = deploymentFor(196, "X Layer");
    const { rerender, getByTestId } = render(
      <Probe deployment={deployment} key="stable" />,
    );
    await waitFor(() => expect(getByTestId("total")).toHaveTextContent("1"));

    readContract.mockClear();
    // Keep component type and key stable: a remount would conceal a missing
    // account dependency by starting a new effect even in the broken hook.
    rerender(<Probe deployment={deployment} address="0x2222222222222222222222222222222222222222" key="stable" />);
    await waitFor(() => expect(readContract).toHaveBeenCalled());
    await waitFor(() => expect(getByTestId("total")).toHaveTextContent("1"));
  });

  it("does not carry a receipt block into a different wallet session", async () => {
    const deployment = deploymentFor(31337, "Anvil local");
    const { result, rerender } = renderHook(
      ({ address }: { address: Address }) => useCommunityStats({
        deployment,
        address,
        wrongChain: false,
      }),
      { initialProps: { address: "0x1111111111111111111111111111111111111111" as Address } },
    );
    await waitFor(() => expect(result.current.community.totalCareActions).toBe(1));
    await act(async () => { result.current.refresh(BigInt(11)); });
    expect(readContract).toHaveBeenLastCalledWith(expect.objectContaining({ blockNumber: BigInt(11) }));

    rerender({ address: "0x2222222222222222222222222222222222222222" });
    await waitFor(() => expect(result.current.community.isLoading).toBe(false));
    expect(readContract).toHaveBeenLastCalledWith(expect.objectContaining({ blockNumber: undefined }));
  });

  it("retries a temporarily unavailable community read at the same receipt block", async () => {
    const deployment = deploymentFor(1952, "X Layer testnet");
    const { result } = renderHook(() => useCommunityStats({ deployment, address: null, wrongChain: false }));
    await waitFor(() => expect(result.current.community.totalCareActions).toBe(1));
    readContract.mockRejectedValueOnce(new ResourceUnavailableRpcError(new Error("Receipt state unavailable")));
    readContract.mockResolvedValue(BigInt(2));

    await act(async () => { result.current.refresh(BigInt(11)); });
    expect(result.current.community.isLoading).toBe(true);
    expect(result.current.community.totalCareActions).toBeNull();
    expect(result.current.community.errorMessage).toBeNull();
    await waitFor(() => expect(result.current.community.totalCareActions).toBe(2), { timeout: 3000 });

    expect(readContract).toHaveBeenCalledTimes(3);
    for (const [args] of readContract.mock.calls.slice(1)) {
      expect(args.blockNumber).toBe(BigInt(11));
    }
  });

  it("stops after three unavailable receipt reads and leaves the total unknown", async () => {
    const deployment = deploymentFor(1952, "X Layer testnet");
    const { result } = renderHook(() => useCommunityStats({ deployment, address: null, wrongChain: false }));
    await waitFor(() => expect(result.current.community.totalCareActions).toBe(1));
    readContract.mockRejectedValue(new ResourceUnavailableRpcError(new Error("Receipt state unavailable")));
    await act(async () => { result.current.refresh(BigInt(11)); });
    await waitFor(() => expect(result.current.community.isLoading).toBe(false), { timeout: 4000 });

    expect(readContract).toHaveBeenCalledTimes(4);
    expect(result.current.community.totalCareActions).toBeNull();
    expect(result.current.community.errorMessage).toMatch(/could not be loaded/i);
    for (const [args] of readContract.mock.calls.slice(1)) {
      expect(args.blockNumber).toBe(BigInt(11));
    }
  });

  it("cancels a delayed community retry when the wallet session changes", async () => {
    const deployment = deploymentFor(1952, "X Layer testnet");
    const { result, rerender } = renderHook(
      ({ address }: { address: Address }) => useCommunityStats({ deployment, address, wrongChain: false }),
      { initialProps: { address: "0x1111111111111111111111111111111111111111" as Address } },
    );
    await waitFor(() => expect(result.current.community.totalCareActions).toBe(1));
    readContract.mockRejectedValueOnce(new ResourceUnavailableRpcError(new Error("Receipt state unavailable")));
    await act(async () => { result.current.refresh(BigInt(11)); });
    expect(readContract).toHaveBeenCalledTimes(2);

    readContract.mockResolvedValue(BigInt(2));
    rerender({ address: "0x2222222222222222222222222222222222222222" });
    await waitFor(() => expect(result.current.community.totalCareActions).toBe(2));
    await act(async () => { await new Promise((resolve) => setTimeout(resolve, 650)); });

    expect(readContract).toHaveBeenCalledTimes(3);
    expect(readContract).toHaveBeenLastCalledWith(expect.objectContaining({ blockNumber: undefined }));
    expect(result.current.community.totalCareActions).toBe(2);
    expect(result.current.community.errorMessage).toBeNull();
  });
});
