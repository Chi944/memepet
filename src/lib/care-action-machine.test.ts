import { describe, expect, it } from "vitest";
import { resolveCareActionState } from "./care-action-machine";

const base = {
  walletInstalled: true,
  connected: true,
  wrongChain: false,
  readStatus: "idle" as const,
  hasPet: true,
  txPhase: "idle" as const,
  careEnabled: false,
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

  it("maps rejection and read failure to error without fixture fallback", () => {
    expect(
      resolveCareActionState({
        ...base,
        txPhase: "rejected",
      }),
    ).toMatchObject({ kind: "error" });

    expect(
      resolveCareActionState({
        ...base,
        readStatus: "error",
        readErrorMessage: "Pet data could not be loaded.",
      }),
    ).toEqual({
      kind: "error",
      message: "Pet data could not be loaded.",
    });
  });

  it("keeps care unavailable in slice 1 after a pet exists", () => {
    expect(resolveCareActionState(base)).toEqual({
      kind: "unavailable",
      message: "Daily care is not enabled in this build (L2 slice 2).",
    });
  });

  it("points to adopt when connected on the right chain with no pet", () => {
    expect(resolveCareActionState({ ...base, hasPet: false })).toEqual({
      kind: "unavailable",
      message: "No pet adopted yet. Use Adopt on this page.",
    });
  });
});
