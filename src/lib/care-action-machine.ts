import type { CareActionState } from "@/types/view-models";

export type LivePetControllerInput = {
  readonly walletInstalled: boolean;
  readonly connected: boolean;
  readonly wrongChain: boolean;
  readonly readStatus: "idle" | "loading" | "error";
  readonly readErrorMessage?: string;
  readonly hasPet: boolean;
  readonly txPhase:
    | "idle"
    | "awaiting-signature"
    | "submitting"
    | "pending"
    | "success"
    | "error"
    | "rejected";
  readonly transactionHash?: string;
  readonly txErrorMessage?: string;
  /** Slice 1: care is not live yet. */
  readonly careEnabled: boolean;
};

/**
 * Maps wallet / read / tx outcomes onto the frozen CareActionState union.
 * A hash alone never becomes success — callers only pass txPhase "success"
 * after receipt confirmation and a successful re-read.
 */
export function resolveCareActionState(
  input: LivePetControllerInput,
): CareActionState {
  if (!input.walletInstalled || !input.connected) {
    return { kind: "needs-wallet" };
  }

  if (input.wrongChain) {
    return { kind: "wrong-network" };
  }

  if (input.txPhase === "awaiting-signature") {
    return { kind: "awaiting-signature" };
  }

  if (input.txPhase === "submitting") {
    return { kind: "submitting" };
  }

  if (input.txPhase === "pending") {
    return {
      kind: "pending",
      transactionHash: input.transactionHash ?? "pending",
    };
  }

  if (input.txPhase === "rejected") {
    return {
      kind: "error",
      message:
        input.txErrorMessage ??
        "You declined the wallet request. No progress was awarded.",
    };
  }

  if (input.txPhase === "error") {
    return {
      kind: "error",
      message:
        input.txErrorMessage ??
        "The transaction failed. No progress was awarded.",
    };
  }

  if (input.txPhase === "success") {
    return { kind: "success" };
  }

  if (input.readStatus === "loading") {
    return {
      kind: "unavailable",
      message: "Reading pet state from the registry…",
    };
  }

  if (input.readStatus === "error") {
    return {
      kind: "error",
      message:
        input.readErrorMessage ??
        "Pet data could not be loaded. No preview data is shown.",
    };
  }

  if (!input.hasPet) {
    return {
      kind: "unavailable",
      message: "No pet adopted yet. Use Adopt on this page.",
    };
  }

  if (!input.careEnabled) {
    return {
      kind: "unavailable",
      message: "Daily care is not enabled in this build (L2 slice 2).",
    };
  }

  return { kind: "ready" };
}
