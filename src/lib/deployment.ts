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

/** Committed defaults: no invented address. */
export const DEPLOYMENT: Deployment = {
  status: "not-deployed",
  networkName: null,
  registryAddress: null,
  explorerBaseUrl: null,
  chainId: null,
  rpcUrl: null,
  currencySymbol: null,
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

/** Active deployment: env override (local Anvil / authorized testnet) or committed defaults. */
export function getActiveDeployment(): Deployment {
  return readEnvOverride() ?? DEPLOYMENT;
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
