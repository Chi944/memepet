/**
 * Single source of truth for what is actually deployed.
 *
 * Nothing here may be invented. Until the lead performs an authorized deploy
 * and records the verified values, `status` stays "not-deployed" and the UI
 * says so rather than implying a live contract exists.
 *
 * Local Anvil verification may override via NEXT_PUBLIC_MEMEPET_* env vars
 * without committing a registry address into this file.
 */
export type DeploymentStatus =
  | "not-deployed"
  | "local"
  | "testnet"
  | "mainnet";

export interface Deployment {
  readonly status: DeploymentStatus;
  /** Verified network name, or null while nothing is deployed. */
  readonly networkName: string | null;
  /** Verified PetRegistry address, or null. Never a placeholder address. */
  readonly registryAddress: string | null;
  /** Public explorer base URL for the declared network, or null. */
  readonly explorerBaseUrl: string | null;
  /** EVM chain id for the declared network, or null. */
  readonly chainId: number | null;
  /** JSON-RPC URL for the declared network, or null. */
  readonly rpcUrl: string | null;
  /** Native currency symbol for wallet network prompts. */
  readonly currencySymbol: string | null;
}

/**
 * Verified X Layer testnet deployment, recorded 21 September 2026.
 *
 * Every value below was confirmed on chain, not copied from tool output:
 *   - deployment tx 0x2ff191a789d48bc58f19e018dfee82aad4cba2ad50212d942e8e1e002fd593f9
 *     receipt status 0x1, block 41543244, 354926 gas
 *   - `cast code` at this address equals `forge inspect PetRegistry
 *     deployedBytecode` from main byte for byte, including CBOR metadata
 *   - APPROVED_COMMUNITY_ID() == 1, communityStats(1) == 0 at deploy,
 *     communityStats(99) reverts InvalidCommunity
 * Network values are from the official OKX X Layer network-information page.
 */
export const DEPLOYMENT: Deployment = {
  status: "testnet",
  networkName: "X Layer testnet",
  registryAddress: "0xe844152262D243a7B90F6e07FF7A67F1d7FeD216",
  explorerBaseUrl: "https://www.okx.com/web3/explorer/xlayer-test",
  chainId: 1952,
  rpcUrl: "https://testrpc.xlayer.tech/terigon",
  currencySymbol: "OKB",
};

function readEnvOverride(): Deployment | null {
  const registryAddress = process.env.NEXT_PUBLIC_MEMEPET_REGISTRY_ADDRESS;
  const chainIdRaw = process.env.NEXT_PUBLIC_MEMEPET_CHAIN_ID;
  const rpcUrl = process.env.NEXT_PUBLIC_MEMEPET_RPC_URL;
  const networkName = process.env.NEXT_PUBLIC_MEMEPET_NETWORK_NAME;
  const statusRaw = process.env.NEXT_PUBLIC_MEMEPET_DEPLOYMENT_STATUS;
  const explorerBaseUrl =
    process.env.NEXT_PUBLIC_MEMEPET_EXPLORER_BASE_URL ?? null;
  const currencySymbol =
    process.env.NEXT_PUBLIC_MEMEPET_CURRENCY_SYMBOL ?? "OKB";

  if (!registryAddress || !chainIdRaw || !rpcUrl || !networkName || !statusRaw) {
    return null;
  }

  if (
    statusRaw !== "local" &&
    statusRaw !== "testnet" &&
    statusRaw !== "mainnet"
  ) {
    return null;
  }

  const chainId = Number(chainIdRaw);
  if (!Number.isInteger(chainId) || chainId <= 0) {
    return null;
  }

  if (!/^0x[a-fA-F0-9]{40}$/.test(registryAddress)) {
    return null;
  }

  return {
    status: statusRaw,
    networkName,
    registryAddress,
    explorerBaseUrl,
    chainId,
    rpcUrl,
    currencySymbol,
  };
}

/**
 * Active deployment: env override (local Anvil / authorized testnet) or
 * committed defaults.
 *
 * Resolved once. NEXT_PUBLIC_* values are inlined at build time and cannot
 * change at runtime, and returning a fresh object per call made every consumer
 * of `deployment` referentially unstable — which re-fired the registry read
 * effects on every render.
 */
let activeDeployment: Deployment | null = null;

export function getActiveDeployment(): Deployment {
  activeDeployment ??= readEnvOverride() ?? DEPLOYMENT;
  return activeDeployment;
}

/** True only when a verified contract address is configured. */
export function isRegistryConfigured(
  deployment: Deployment = getActiveDeployment(),
): boolean {
  return (
    deployment.status !== "not-deployed" &&
    deployment.registryAddress !== null &&
    deployment.chainId !== null &&
    deployment.rpcUrl !== null
  );
}

/** Short label for the environment chip in the app bar. */
export function deploymentLabel(
  deployment: Deployment = getActiveDeployment(),
): string {
  if (!isRegistryConfigured(deployment)) {
    return "No contract connected";
  }

  return `${deployment.networkName}`;
}