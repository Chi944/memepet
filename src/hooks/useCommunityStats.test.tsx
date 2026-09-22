import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, waitFor } from "@testing-library/react";
import type { Address } from "viem";
import type { Deployment } from "@/lib/deployment";

const readContract = vi.fn(async () => BigInt(1));

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
  beforeEach(() => readContract.mockClear());

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
});
