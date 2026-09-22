"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  type Address,
  createWalletClient,
  custom,
  getAddress,
  type EIP1193Provider,
} from "viem";
import { chainFromDeployment } from "@/lib/chains";
import {
  getActiveDeployment,
  isRegistryConfigured,
} from "@/lib/deployment";

type EthereumProvider = EIP1193Provider & {
  on?: (event: string, listener: (...args: unknown[]) => void) => void;
  removeListener?: (
    event: string,
    listener: (...args: unknown[]) => void,
  ) => void;
};

function getInjectedProvider(): EthereumProvider | null {
  if (typeof window === "undefined") {
    return null;
  }

  const injected = window as Window & {
    ethereum?: EthereumProvider;
    okxwallet?: EthereumProvider;
  };
  return injected.ethereum ?? injected.okxwallet ?? null;
}

export type WalletState = {
  readonly installed: boolean;
  readonly address: Address | null;
  readonly chainId: number | null;
  readonly connecting: boolean;
  readonly errorMessage: string | null;
  readonly disconnectStatus: "pending" | "revoked" | "manual" | null;
};

const initialState: WalletState = {
  installed: false,
  address: null,
  chainId: null,
  connecting: false,
  errorMessage: null,
  disconnectStatus: null,
};

const disconnectStorageKey = "memepet.wallet-disconnected";

function savedDisconnect(): "manual" | "revoked" | null {
  try {
    const value = window.localStorage.getItem(disconnectStorageKey);
    return value === "manual" || value === "revoked" ? value : null;
  } catch {
    return null;
  }
}

function saveDisconnect(value: "manual" | "revoked" | null) {
  try {
    if (value) window.localStorage.setItem(disconnectStorageKey, value);
    else window.localStorage.removeItem(disconnectStorageKey);
  } catch {
    // Wallet revocation still runs when browser storage is unavailable.
  }
}

async function readDisconnectedSnapshot(
  provider: EthereumProvider | null,
  saved: "manual" | "revoked",
): Promise<WalletState> {
  let disconnectStatus: "manual" | "revoked" = "manual";
  // A past revocation is not proof of the wallet's current permissions.
  // Check them again without restoring the account to the app.
  if (saved === "revoked" && provider) {
    try {
      const accounts = await provider.request({ method: "eth_accounts" });
      if (Array.isArray(accounts) && accounts.length === 0) disconnectStatus = "revoked";
    } catch {
      // Preserve local disconnection and explain that wallet access is unknown.
    }
  }
  return { ...initialState, installed: !!provider, disconnectStatus };
}

async function readWalletSnapshot(provider: EthereumProvider | null): Promise<WalletState> {
  if (!provider) {
    return initialState;
  }

  try {
    const accounts = (await provider.request({
      method: "eth_accounts",
    })) as string[];
    const chainHex = (await provider.request({
      method: "eth_chainId",
    })) as string;

    return {
      ...initialState,
      installed: true,
      address: accounts[0] ? getAddress(accounts[0]) : null,
      chainId: Number.parseInt(chainHex, 16),
      connecting: false,
      errorMessage: null,
    };
  } catch {
    return {
      ...initialState,
      installed: true,
      address: null,
      chainId: null,
      connecting: false,
      errorMessage: "Wallet state could not be read.",
    };
  }
}

export function useWallet() {
  const deployment = getActiveDeployment();
  const configured = isRegistryConfigured(deployment);
  const expectedChain = chainFromDeployment(deployment);
  const [state, setState] = useState<WalletState>(initialState);
  const [hydrationToken, setHydrationToken] = useState(0);
  // Every explicit connect/disconnect invalidates older async completions.
  const operation = useRef(0);
  const locallyDisconnected = useRef(false);
  const connecting = useRef(false);
  const disconnecting = useRef(false);
  const refreshAfterConnect = useRef(false);

  useEffect(() => () => {
    // A route change must not let an old request overwrite a new session's
    // saved disconnect preference after this hook has unmounted.
    operation.current += 1;
  }, []);

  useEffect(() => {
    let cancelled = false;
    const generation = operation.current;
    const provider = getInjectedProvider();
    const saved = savedDisconnect();
    if (saved) locallyDisconnected.current = true;

    if (saved || !locallyDisconnected.current) {
      const snapshot = saved
        ? readDisconnectedSnapshot(provider, saved)
        : readWalletSnapshot(provider);
      void snapshot.then((next) => {
        if (!cancelled && generation === operation.current && !connecting.current) {
          setState(next);
        }
      });
    }

    const refresh = () => {
      if (connecting.current) {
        refreshAfterConnect.current = true;
      } else if (!locallyDisconnected.current) {
        setHydrationToken((value) => value + 1);
      }
    };
    const onAccounts = (...args: unknown[]) => {
      // An external reconnection can restore permissions without a connect
      // click in this tab. Keep this tab disconnected but drop stale success.
      if (locallyDisconnected.current && !connecting.current && Array.isArray(args[0]) && args[0].length > 0) {
        operation.current += 1;
        setState({ ...initialState, installed: !!provider, disconnectStatus: "manual" });
      }
      refresh();
    };
    const onStorage = (event: StorageEvent) => {
      if (event.key !== disconnectStorageKey) return;
      if (!event.newValue) {
        // Another tab explicitly connected. It may use the wallet, but this
        // tab stays locally disconnected and cannot claim permission removal.
        if (locallyDisconnected.current) {
          operation.current += 1;
          setState({ ...initialState, installed: !!provider, disconnectStatus: "manual" });
        }
        return;
      }
      operation.current += 1;
      const generation = operation.current;
      locallyDisconnected.current = true;
      setState({ ...initialState, installed: !!provider, disconnectStatus: "manual" });
      void readDisconnectedSnapshot(provider, savedDisconnect() ?? "manual").then((snapshot) => {
        if (!cancelled && generation === operation.current) setState(snapshot);
      });
    };

    if (typeof provider?.on === "function" && typeof provider.removeListener === "function") {
      provider.on("accountsChanged", onAccounts);
      provider.on("chainChanged", refresh);
    }
    window.addEventListener("storage", onStorage);

    return () => {
      cancelled = true;
      provider?.removeListener?.("accountsChanged", onAccounts);
      provider?.removeListener?.("chainChanged", refresh);
      window.removeEventListener("storage", onStorage);
    };
  }, [hydrationToken]);

  const connect = useCallback(async () => {
    if (connecting.current || disconnecting.current) return;
    const generation = ++operation.current;
    const provider = getInjectedProvider();
    if (!provider) {
      setState((prev) => ({
        ...prev,
        installed: false,
        errorMessage: "No injected wallet was found.",
      }));
      return;
    }

    connecting.current = true;
    refreshAfterConnect.current = false;
    setState((prev) => ({ ...prev, connecting: true, errorMessage: null }));

    try {
      const accounts = (await provider.request({
        method: "eth_requestAccounts",
      })) as string[];
      if (generation !== operation.current) return;
      const chainHex = (await provider.request({
        method: "eth_chainId",
      })) as string;
      if (generation !== operation.current) return;
      if (!accounts[0]) throw new Error("No wallet account was connected.");
      const address = getAddress(accounts[0]);
      locallyDisconnected.current = false;
      saveDisconnect(null);
      setState({
        ...initialState,
        installed: true,
        address,
        chainId: Number.parseInt(chainHex, 16),
        connecting: false,
        errorMessage: null,
      });
    } catch (error) {
      if (generation !== operation.current) return;
      const message =
        error instanceof Error ? error.message : "Wallet connection failed.";
      setState((prev) => ({
        ...prev,
        connecting: false,
        errorMessage: message,
      }));
    } finally {
      connecting.current = false;
      if (refreshAfterConnect.current && generation === operation.current && !locallyDisconnected.current) {
        setHydrationToken((value) => value + 1);
      }
      refreshAfterConnect.current = false;
    }
  }, []);

  const disconnect = useCallback(async () => {
    if (disconnecting.current) return;
    const generation = ++operation.current;
    const provider = getInjectedProvider();
    const hadPendingConnection = connecting.current;
    // Remember the user's intent even if this provider cannot revoke access.
    // No address, permission, or game state is stored here.
    locallyDisconnected.current = true;
    disconnecting.current = true;
    saveDisconnect("manual");
    setState({ ...initialState, installed: !!provider, disconnectStatus: "pending" });
    let status: "manual" | "revoked" = "manual";
    try {
      if (!provider) throw new Error("Wallet unavailable");
      await provider.request({
        method: "wallet_revokePermissions",
        params: [{ eth_accounts: {} }],
      });
      const accounts = await provider.request({ method: "eth_accounts" });
      // A still-open connect prompt can grant access after this read-back.
      // In that case, retain the manual instruction rather than promise removal.
      if (Array.isArray(accounts) && accounts.length === 0 && !hadPendingConnection) {
        status = "revoked";
      }
    } catch {
      // Unsupported, declined, failed, and unverified revocations all need the
      // same honest next step in the wallet's own connection controls.
    } finally {
      disconnecting.current = false;
      if (generation === operation.current) {
        saveDisconnect(status);
        setState({ ...initialState, installed: !!provider, disconnectStatus: status });
      }
    }
  }, []);

  const switchNetwork = useCallback(async () => {
    if (locallyDisconnected.current || disconnecting.current) return;
    const generation = operation.current;
    const provider = getInjectedProvider();
    if (!provider || !expectedChain || !configured) {
      return;
    }

    const chainIdHex = `0x${expectedChain.id.toString(16)}`;

    try {
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: chainIdHex }],
      });
    } catch (error) {
      if (generation !== operation.current) return;
      const code =
        typeof error === "object" && error && "code" in error
          ? Number((error as { code: number }).code)
          : null;

      if (code === 4902) {
        // Declining this prompt rejects too. Without its own catch the
        // rejection escapes switchNetwork, and every call site invokes it as
        // `void switchNetwork()` — an unhandled rejection with no error shown.
        try {
          await provider.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: chainIdHex,
                chainName: expectedChain.name,
                nativeCurrency: expectedChain.nativeCurrency,
                rpcUrls: [...expectedChain.rpcUrls.default.http],
                blockExplorerUrls: expectedChain.blockExplorers
                  ? [expectedChain.blockExplorers.default.url]
                  : undefined,
              },
            ],
          });
        } catch (addError) {
          if (generation !== operation.current) return;
          const addMessage =
            addError instanceof Error
              ? addError.message
              : `${expectedChain.name} could not be added to your wallet.`;
          setState((prev) => ({ ...prev, errorMessage: addMessage }));
          return;
        }
      } else {
        const message =
          error instanceof Error ? error.message : "Network switch failed.";
        setState((prev) => ({ ...prev, errorMessage: message }));
        return;
      }
    }

    if (generation === operation.current && !locallyDisconnected.current) {
      setHydrationToken((value) => value + 1);
    }
  }, [configured, expectedChain]);

  const createBrowserWalletClient = useCallback(() => {
    const provider = getInjectedProvider();
    if (!provider || !expectedChain || !state.address || locallyDisconnected.current) {
      return null;
    }

    return createWalletClient({
      account: state.address,
      chain: expectedChain,
      transport: custom(provider),
    });
  }, [expectedChain, state.address]);

  const wrongChain =
    configured &&
    state.chainId !== null &&
    deployment.chainId !== null &&
    state.chainId !== deployment.chainId;

  return {
    ...state,
    configured,
    deployment,
    expectedChainId: deployment.chainId,
    wrongChain,
    connect,
    disconnect,
    switchNetwork,
    createBrowserWalletClient,
  };
}
