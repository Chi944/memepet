import { act, cleanup, renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useWallet } from "./useWallet";

const accountA = "0x1111111111111111111111111111111111111111";
const accountB = "0x2222222222222222222222222222222222222222";
const originalProviders = {
  ethereum: Object.getOwnPropertyDescriptor(window, "ethereum"),
  okxwallet: Object.getOwnPropertyDescriptor(window, "okxwallet"),
};
type ProviderKey = keyof typeof originalProviders;
type Listener = (...args: unknown[]) => void;

function installProvider(key: ProviderKey, provider: unknown) {
  Object.defineProperty(window, key, {
    configurable: true,
    writable: true,
    value: provider,
  });
}

function createProvider(initialAccounts: string[] = []) {
  let accounts = initialAccounts;
  let chainId = "0x1";
  const listeners = new Map<string, Set<Listener>>();
  const request = vi.fn(async ({ method, params }: {
    method: string;
    params?: readonly { chainId: string }[];
  }) => {
    if (method === "eth_accounts") return accounts;
    if (method === "eth_requestAccounts") {
      accounts = [accountA];
      return accounts;
    }
    if (method === "eth_chainId") return chainId;
    if (method === "wallet_switchEthereumChain") {
      chainId = params![0].chainId;
      return null;
    }
    throw new Error(`Unexpected provider request: ${method}`);
  });
  const on = vi.fn((event: string, listener: Listener) => {
    const registered = listeners.get(event) ?? new Set<Listener>();
    registered.add(listener);
    listeners.set(event, registered);
  });
  const removeListener = vi.fn((event: string, listener: Listener) => {
    listeners.get(event)?.delete(listener);
  });

  return {
    request,
    on,
    removeListener,
    changeAccounts(next: string[]) {
      accounts = next;
      for (const listener of listeners.get("accountsChanged") ?? []) listener(next);
    },
    changeChain(next: string) {
      chainId = next;
      for (const listener of listeners.get("chainChanged") ?? []) listener(next);
    },
    listenerCount(event: string) {
      return listeners.get(event)?.size ?? 0;
    },
  };
}

describe("useWallet injected provider selection", () => {
  beforeEach(() => {
    installProvider("ethereum", undefined);
    installProvider("okxwallet", undefined);
  });

  afterEach(() => {
    cleanup();
    for (const key of Object.keys(originalProviders) as ProviderKey[]) {
      const descriptor = originalProviders[key];
      if (descriptor) Object.defineProperty(window, key, descriptor);
      else Reflect.deleteProperty(window, key);
    }
  });

  it("detects and connects an OKX-only provider and uses it for the wallet client", async () => {
    const okx = createProvider();
    installProvider("okxwallet", okx);
    const { result } = renderHook(() => useWallet());
    await waitFor(() => expect(result.current.installed).toBe(true));
    expect(result.current.address).toBeNull();

    await act(async () => { await result.current.connect(); });

    expect(okx.request).toHaveBeenCalledWith({ method: "eth_requestAccounts" });
    expect(result.current.address).toBe(accountA);
    expect(result.current.chainId).toBe(1);
    expect(result.current.errorMessage).toBeNull();
    const client = result.current.createBrowserWalletClient();
    expect(client).not.toBeNull();
    expect(client?.account?.address).toBe(accountA);
    okx.request.mockClear();
    expect(await client!.request({ method: "eth_chainId" })).toBe("0x1");
    expect(okx.request).toHaveBeenCalledTimes(1);
    expect(okx.request.mock.calls[0][0]).toEqual({ method: "eth_chainId" });
  });

  it("refreshes OKX account and chain events and removes listeners on unmount", async () => {
    const okx = createProvider([accountA]);
    installProvider("okxwallet", okx);
    const { result, unmount } = renderHook(() => useWallet());
    await waitFor(() => expect(result.current.address).toBe(accountA));

    act(() => { okx.changeAccounts([accountB]); });
    await waitFor(() => expect(result.current.address).toBe(accountB));
    act(() => { okx.changeChain("0x7a0"); });
    await waitFor(() => expect(result.current.chainId).toBe(1952));
    act(() => { okx.changeAccounts([]); });
    await waitFor(() => expect(result.current.address).toBeNull());
    expect(result.current.createBrowserWalletClient()).toBeNull();
    expect(okx.listenerCount("accountsChanged")).toBe(1);
    expect(okx.listenerCount("chainChanged")).toBe(1);

    unmount();
    expect(okx.listenerCount("accountsChanged")).toBe(0);
    expect(okx.listenerCount("chainChanged")).toBe(0);
  });

  it("switches the network through an OKX-only provider", async () => {
    const okx = createProvider([accountA]);
    installProvider("okxwallet", okx);
    const { result } = renderHook(() => useWallet());
    await waitFor(() => expect(result.current.chainId).toBe(1));
    const expectedChainId = result.current.expectedChainId!;

    await act(async () => { await result.current.switchNetwork(); });

    expect(okx.request).toHaveBeenCalledWith({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: `0x${expectedChainId.toString(16)}` }],
    });
    await waitFor(() => expect(result.current.chainId).toBe(expectedChainId));
    expect(result.current.wrongChain).toBe(false);
  });

  it("keeps the Ethereum provider when both injected providers are present", async () => {
    const ethereum = createProvider([accountB]);
    const okx = createProvider();
    installProvider("ethereum", ethereum);
    installProvider("okxwallet", okx);
    const { result } = renderHook(() => useWallet());
    await waitFor(() => expect(result.current.address).toBe(accountB));
    await act(async () => { await result.current.connect(); });
    await act(async () => { await result.current.switchNetwork(); });
    const client = result.current.createBrowserWalletClient();
    await client!.request({ method: "eth_chainId" });

    expect(ethereum.request).toHaveBeenCalledWith({ method: "eth_requestAccounts" });
    expect(ethereum.on).toHaveBeenCalledWith("accountsChanged", expect.any(Function));
    expect(okx.request).not.toHaveBeenCalled();
    expect(okx.on).not.toHaveBeenCalled();
  });

  it("reports the missing wallet without fabricating a connected account", async () => {
    const { result } = renderHook(() => useWallet());
    // Settle the mount-time snapshot before checking the user-initiated error.
    await act(async () => {});
    await act(async () => { await result.current.connect(); });

    expect(result.current.installed).toBe(false);
    expect(result.current.address).toBeNull();
    expect(result.current.errorMessage).toBe("No injected wallet was found.");
    expect(result.current.createBrowserWalletClient()).toBeNull();
  });
});
