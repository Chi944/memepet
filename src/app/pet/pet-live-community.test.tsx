import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Address, WalletClient } from "viem";
import type { Deployment } from "@/lib/deployment";

const rpc = vi.hoisted(() => ({
  readContract: vi.fn(),
  getBlock: vi.fn(),
  waitForTransactionReceipt: vi.fn(),
  writeContract: vi.fn(),
}));
const wallet = vi.hoisted(() => ({ useWallet: vi.fn() }));

vi.mock("viem", async (importOriginal) => {
  const actual = await importOriginal<typeof import("viem")>();
  return { ...actual, createPublicClient: vi.fn(() => rpc) };
});
vi.mock("@/hooks/useWallet", () => wallet);

import { PetLiveClient } from "./pet-live-client";

const address = "0x1111111111111111111111111111111111111111" as Address;
const deployment: Deployment = {
  status: "local",
  networkName: "Anvil",
  registryAddress: "0x3333333333333333333333333333333333333333",
  chainId: 31337,
  rpcUrl: "http://127.0.0.1:8545",
  explorerBaseUrl: null,
  currencySymbol: "ETH",
};
const day = BigInt(20_000);
const receiptBlock = BigInt(11);
const hash = `0x${"a".repeat(64)}`;

function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason: Error) => void;
  const promise = new Promise<T>((accept, decline) => { resolve = accept; reject = decline; });
  return { promise, resolve, reject };
}

function communityTotal() {
  return screen.getByText("Community cares", { selector: "dt" }).nextElementSibling;
}

describe("live care refreshes the community counter", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.resetAllMocks();
    wallet.useWallet.mockReturnValue({
      installed: true,
      address,
      chainId: 31337,
      connecting: false,
      disconnectStatus: null,
      errorMessage: null,
      deployment,
      wrongChain: false,
      createBrowserWalletClient: () => rpc as unknown as WalletClient,
      connect: vi.fn(),
      disconnect: vi.fn(),
      switchNetwork: vi.fn(),
    });
    rpc.writeContract.mockResolvedValue(hash);
  });

  afterEach(() => { vi.useRealTimers(); });

  it.each([false, true])(
    "rereads confirmed care without retaining the pre-care total (latest RPC lags: %s)",
    async (latestLags) => {
      let confirmed = false;
      const receipt = deferred<{ status: string; blockNumber: bigint }>();
      rpc.waitForTransactionReceipt.mockReturnValue(receipt.promise);
      rpc.getBlock.mockImplementation(async ({ blockNumber }) => ({
        number: blockNumber ?? (confirmed ? receiptBlock : BigInt(10)),
        timestamp: day * BigInt(86400) + BigInt(3600),
      }));
      rpc.readContract.mockImplementation(async ({ functionName, blockNumber }) => {
        if (functionName === "communityStats") {
          // Some public RPC/cache paths can still answer a latest call with
          // the pre-care state while the receipt block is already readable.
          return blockNumber >= receiptBlock || (confirmed && !latestLags)
            ? BigInt(1)
            : BigInt(0);
        }
        return blockNumber >= receiptBlock
          ? [true, 1, 1, day]
          : [true, 1, 0, BigInt(0)];
      });

      await act(async () => { render(<PetLiveClient />); });
      expect(communityTotal()).toHaveTextContent("0");

      await act(async () => {
        fireEvent.click(screen.getByRole("button", { name: /Care for Mochi/ }));
      });
      expect(screen.getByRole("button", { name: "Pending confirmation" })).toBeDisabled();
      expect(communityTotal()).toHaveTextContent("0");

      await act(async () => {
        confirmed = true;
        receipt.resolve({ status: "success", blockNumber: receiptBlock });
      });
      expect(screen.getByText("10 growth points")).toBeInTheDocument();
      expect(communityTotal()).toHaveTextContent("1");
      expect(rpc.readContract).toHaveBeenCalledWith(expect.objectContaining({
        functionName: "communityStats",
        blockNumber: receiptBlock,
      }));
      await act(async () => { await vi.advanceTimersByTimeAsync(1600); });

      expect(communityTotal()).toHaveTextContent("1");
    },
  );

  it("recovers an unknown community total by retrying the receipt block without another transaction", async () => {
    let confirmed = false;
    const communityRead = deferred<bigint>();
    const recoveredRead = deferred<bigint>();
    let retrying = false;
    rpc.getBlock.mockImplementation(async ({ blockNumber }) => ({
      number: blockNumber ?? (confirmed ? receiptBlock : BigInt(10)),
      timestamp: day * BigInt(86400) + BigInt(3600),
    }));
    rpc.waitForTransactionReceipt.mockImplementation(async () => {
      confirmed = true;
      return { status: "success", blockNumber: receiptBlock };
    });
    rpc.readContract.mockImplementation(async ({ functionName, blockNumber }) => {
      if (functionName === "communityStats") {
        // Latest deliberately remains stale even after care succeeds.
        return blockNumber === receiptBlock
          ? retrying ? recoveredRead.promise : communityRead.promise
          : BigInt(0);
      }
      return blockNumber >= receiptBlock
        ? [true, 1, 1, day]
        : [true, 1, 0, BigInt(0)];
    });

    await act(async () => { render(<PetLiveClient />); });
    expect(communityTotal()).toHaveTextContent("0");
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /Care for Mochi/ }));
    });
    expect(screen.getByText("10 growth points")).toBeInTheDocument();
    expect(communityTotal()).toHaveTextContent("Reading…");

    await act(async () => { communityRead.reject(new Error("Receipt state unavailable")); });
    await act(async () => { await vi.advanceTimersByTimeAsync(1600); });
    expect(communityTotal()).toHaveTextContent("Unknown");
    expect(screen.getByRole("button", { name: "Care unavailable" })).toBeDisabled();
    expect(screen.getByText(/Retry only reads the chain/)).toBeInTheDocument();

    await act(async () => {
      retrying = true;
      fireEvent.click(screen.getByRole("button", { name: "Retry community total" }));
    });
    expect(communityTotal()).toHaveTextContent("Reading…");
    expect(screen.queryByRole("button", { name: "Retry community total" })).not.toBeInTheDocument();
    expect(screen.getByText("10 growth points")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Care unavailable" })).toBeDisabled();
    expect(rpc.readContract).toHaveBeenLastCalledWith(expect.objectContaining({
      functionName: "communityStats",
      blockNumber: receiptBlock,
    }));

    await act(async () => { recoveredRead.resolve(BigInt(1)); });
    expect(communityTotal()).toHaveTextContent("1");
    expect(screen.queryByText(/could not be loaded/)).not.toBeInTheDocument();
    expect(rpc.writeContract).toHaveBeenCalledTimes(1);
    expect(rpc.waitForTransactionReceipt).toHaveBeenCalledTimes(1);
  });
});
