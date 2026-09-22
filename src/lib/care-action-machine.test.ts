import { describe, expect, it } from "vitest";
import { resolveCareActionState } from "./care-action-machine";

const base = {
  walletInstalled: true,
  connected: true,
  wrongChain: false,
  readStatus: "idle" as const,
  hasPet: true,
  txPhase: "idle" as const,
  careEnabled: true,
};

describe("resolveCareActionState", () => {
  it("asks for a wallet when none is connected", () => {
    expect(
      resolveCareActionState({
        ...base,
        walletInstalled: false,
        connected: false,
      }),
    ).toEqual({ kind: "needs-wallet" });
  });

  it("reports wrong network before any pet action", () => {
    expect(resolveCareActionState({ ...base, wrongChain: true })).toEqual({
      kind: "wrong-network",
    });
  });

  it("maps signature and pending phases without treating a hash as success", () => {
    expect(
      resolveCareActionState({ ...base, txPhase: "awaiting-signature" }),
    ).toEqual({ kind: "awaiting-signature" });

    expect(
      resolveCareActionState({
        ...base,
        txPhase: "pending",
        transactionHash: "0xabc",
      }),
    ).toEqual({ kind: "pending", transactionHash: "0xabc" });
  });

  it("maps rejection and read failure without fixture fallback", () => {
    expect(
      resolveCareActionState({
        ...base,
        txPhase: "rejected",
      }),
    ).toMatchObject({ kind: "error" });

    // A failed read is "unavailable", not "error": the "error" kind renders an
    // enabled retry that submits a real care write, and after a failed read
    // neither the pet nor the cooldown is known.
    expect(
      resolveCareActionState({
        ...base,
        readStatus: "error",
        readErrorMessage: "Pet data could not be loaded.",
      }),
    ).toEqual({
      kind: "unavailable",
      message: "Pet data could not be loaded.",
    });
  });

  it("returns ready when care is enabled and there is no cooldown", () => {
    expect(resolveCareActionState(base)).toEqual({ kind: "ready" });
  });

  it("predicts cooldown from availableAtIso without submitting", () => {
    expect(
      resolveCareActionState({
        ...base,
        cooldownAvailableAtIso: "2030-01-02T00:00:00.000Z",
      }),
    ).toEqual({
      kind: "cooldown",
      availableAtIso: "2030-01-02T00:00:00.000Z",
    });
  });

  it("keeps care unavailable when careEnabled is false", () => {
    expect(resolveCareActionState({ ...base, careEnabled: false })).toEqual({
      kind: "unavailable",
      message: "Daily care is not enabled in this build.",
    });
  });

  it("points to adopt when connected on the right chain with no pet", () => {
    expect(resolveCareActionState({ ...base, hasPet: false })).toEqual({
      kind: "unavailable",
      message: "No pet adopted yet. Use Adopt on this page.",
    });
  });

  it.each(["rejected", "error"] as const)(
    "preserves an adoption %s without offering a care retry",
    (txPhase) => {
      expect(
        resolveCareActionState({
          ...base,
          hasPet: false,
          txKind: "adopt",
          txPhase,
          txErrorMessage: "Adoption was declined.",
        }),
      ).toEqual({ kind: "unavailable", message: "Adoption was declined." });
    },
  );

  it.each(["rejected", "error", "success"] as const)(
    "prioritizes an unknown pet read over a prior care %s",
    (txPhase) => {
      expect(
        resolveCareActionState({
          ...base,
          txKind: "care",
          txPhase,
          readStatus: "error",
          readErrorMessage: "Confirmed state could not be read.",
        }),
      ).toEqual({
        kind: "unavailable",
        message: "Confirmed state could not be read.",
      });
    },
  );

  it("keeps a known cooldown disabled even after a transaction error", () => {
    expect(
      resolveCareActionState({
        ...base,
        txPhase: "error",
        txKind: "care",
        cooldownAvailableAtIso: "2030-01-02T00:00:00.000Z",
      }),
    ).toEqual({
      kind: "cooldown",
      availableAtIso: "2030-01-02T00:00:00.000Z",
    });
  });
});
