/**
 * Single source of truth for what is actually deployed.
 *
 * Nothing here may be invented. Until the lead performs an authorized deploy
 * and records the verified values, `status` stays "not-deployed" and the UI
 * says so rather than implying a live contract exists.
 */
export type DeploymentStatus = "not-deployed" | "testnet" | "mainnet";

export interface Deployment {
  readonly status: DeploymentStatus;
  /** Verified network name, or null while nothing is deployed. */
  readonly networkName: string | null;
  /** Verified PetRegistry address, or null. Never a placeholder address. */
  readonly registryAddress: string | null;
  /** Public explorer base URL for the declared network, or null. */
  readonly explorerBaseUrl: string | null;
}

export const DEPLOYMENT: Deployment = {
  status: "not-deployed",
  networkName: null,
  registryAddress: null,
  explorerBaseUrl: null,
};

/** True only when a verified contract address is configured. */
export function isRegistryConfigured(
  deployment: Deployment = DEPLOYMENT,
): boolean {
  return (
    deployment.status !== "not-deployed" && deployment.registryAddress !== null
  );
}

/** Short label for the environment chip in the app bar. */
export function deploymentLabel(
  deployment: Deployment = DEPLOYMENT,
): string {
  if (!isRegistryConfigured(deployment)) {
    return "No contract connected";
  }

  return `${deployment.networkName}`;
}
