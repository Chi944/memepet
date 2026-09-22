import { defineChain } from "viem";
import type { Deployment } from "./deployment";

/** Official X Layer mainnet — https://web3.okx.com/onchainos/dev-docs/xlayer/developer/build-on-xlayer/network-information */
export const xLayerMainnet = defineChain({
  id: 196,
  name: "X Layer mainnet",
  nativeCurrency: { name: "OKB", symbol: "OKB", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.xlayer.tech", "https://xlayerrpc.okx.com"],
    },
  },
  blockExplorers: {
    default: {
      name: "OKX Explorer",
      url: "https://www.okx.com/web3/explorer/xlayer",
    },
  },
});

/** Official X Layer testnet — same docs source as mainnet. */
export const xLayerTestnet = defineChain({
  id: 1952,
  name: "X Layer testnet",
  nativeCurrency: { name: "OKB", symbol: "OKB", decimals: 18 },
  rpcUrls: {
    default: {
      http: [
        "https://testrpc.xlayer.tech/terigon",
        "https://xlayertestrpc.okx.com/terigon",
      ],
    },
  },
  blockExplorers: {
    default: {
      name: "OKX Explorer",
      url: "https://www.okx.com/web3/explorer/xlayer-test",
    },
  },
});

export function chainFromDeployment(deployment: Deployment) {
  if (
    deployment.chainId === null ||
    deployment.rpcUrl === null ||
    deployment.networkName === null
  ) {
    return null;
  }

  if (deployment.chainId === xLayerMainnet.id) {
    return xLayerMainnet;
  }

  if (deployment.chainId === xLayerTestnet.id) {
    return xLayerTestnet;
  }

  return defineChain({
    id: deployment.chainId,
    name: deployment.networkName,
    nativeCurrency: {
      name: deployment.currencySymbol ?? "ETH",
      symbol: deployment.currencySymbol ?? "ETH",
      decimals: 18,
    },
    rpcUrls: {
      default: { http: [deployment.rpcUrl] },
    },
    blockExplorers: deployment.explorerBaseUrl
      ? {
          default: {
            name: "Explorer",
            url: deployment.explorerBaseUrl,
          },
        }
      : undefined,
  });
}
