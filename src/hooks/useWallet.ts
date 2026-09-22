"use client";

import { useCallback, useEffect, useState } from "react";
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

  const ethereum = (
    window as Window & { ethereum?: EthereumProvider }
  ).ethereum;
  return ethereum ?? null;
}

export type WalletState = {
  readonly installed: boolean;
  readonly address: Address | null;
  readonly chainId: number | null;
  readonly connecting: boolean;
  readonly errorMessage: string | null;
};

const initialState: WalletState = {
  installed: false,
  address: null,
  chainId: null,
  connecting: false,
  errorMessage: null,
};

async function readWalletSnapshot(): Promise<WalletState> {
  const provider = getInjectedProvider();
  if (!provider) {
    return {
      installed: false,
      address: null,
      chainId: null,
      connecting: false,
      errorMessage: null,
    };
  }

  try {
    const accounts = (await provider.request({
      method: "eth_accounts",
    })) as string[];
    const chainHex = (await provider.request({
      method: "eth_chainId",
    })) as string;

    return {
      installed: true,
      address: accounts[0] ? getAddress(accounts[0]) : null,
      chainId: Number.parseInt(chainHex, 16),
      connecting: false,
      errorMessage: null,
    };
  } catch {
    return {
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

  useEffect(() => {
    let cancelled = false;

    void readWalletSnapshot().then((snapshot) => {
      if (!cancelled) {
        setState(snapshot);
      }
    });

    const provider = getInjectedProvider();
    if (!provider?.on || !provider.removeListener) {
      return () => {
        cancelled = true;
      };
    }

    const onAccounts = () => {
      setHydrationToken((value) => value + 1);
    };
    const onChain = () => {
      setHydrationToken((value) => value + 1);
    };

    provider.on("accountsChanged", onAccounts);
    provider.on("chainChanged", onChain);

    return () => {
      cancelled = true;
      provider.removeListener?.("accountsChanged", onAccounts);
      provider.removeListener?.("chainChanged", onChain);
    };
  }, [hydrationToken]);

  const connect = useCallback(async () => {
    const provider = getInjectedProvider();
    if (!provider) {
      setState((prev) => ({
        ...prev,
        installed: false,
        errorMessage: "No injected wallet was found.",
      }));
      return;
    }

    setState((prev) => ({ ...prev, connecting: true, errorMessage: null }));

    try {
      const accounts = (await provider.request({
        method: "eth_requestAccounts",
      })) as string[];
      const chainHex = (await provider.request({
        method: "eth_chainId",
      })) as string;
      setState({
        installed: true,
        address: accounts[0] ? getAddress(accounts[0]) : null,
        chainId: Number.parseInt(chainHex, 16),
        connecting: false,
        errorMessage: null,
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Wallet connection failed.";
      setState((prev) => ({
        ...prev,
        connecting: false,
        errorMessage: message,
      }));
    }
  }, []);

  const disconnect = useCallback(() => {
    setState((prev) => ({
      ...prev,
      address: null,
      errorMessage: null,
      connecting: false,
    }));
  }, []);

  const switchNetwork = useCallback(async () => {
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

    setHydrationToken((value) => value + 1);
  }, [configured, expectedChain]);

  const createBrowserWalletClient = useCallback(() => {
    const provider = getInjectedProvider();
    if (!provider || !expectedChain || !state.address) {
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