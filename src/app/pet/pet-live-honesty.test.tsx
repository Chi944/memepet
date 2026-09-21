import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { CarePanel } from "@/components/pet/CarePanel";
import { resolveCareActionState } from "@/lib/care-action-machine";

const baseInput = {
  walletInstalled: true,
  connected: true,
  wrongChain: false,
  hasPet: false,
  careEnabled: true,
  cooldownAvailableAtIso: null,
} as const;

describe("live pet surface never fabricates progress", () => {
  // Regression: PLACEHOLDER_PET was a hand-written pet with growthPoints 0,
  // nextStageAt 20 and dataMode "live", rendered whenever the chain read
  // returned no pet. A failed read therefore showed "0 growth points" while
  // the very same panel said "No preview data is shown".
  it("shows no growth numbers when no pet is known", () => {
    const action = resolveCareActionState({
      ...baseInput,
      readStatus: "error",
      txPhase: "idle",
    });

    render(
      <CarePanel
        pet={null}
        action={action}
        onCare={() => {}}
        onConnect={() => {}}
        onSwitchNetwork={() => {}}
      />,
    );

    expect(screen.queryByText(/growth points/i)).toBeNull();
    expect(screen.queryByText(/Next stage at/i)).toBeNull();
  });

  // Regression: readStatus "error" mapped to the "error" kind, which renders an
  // enabled retry wired to onCare — offering a real care transaction even
  // though neither the pet nor the cooldown was known.
  it("does not offer a care transaction while the read is failing", () => {
    const onCare = vi.fn();
    const action = resolveCareActionState({
      ...baseInput,
      readStatus: "error",
      txPhase: "idle",
      cooldownAvailableAtIso: "2099-01-01T00:00:00.000Z",
    });

    expect(action.kind).toBe("unavailable");

    render(
      <CarePanel
        pet={null}
        action={action}
        onCare={onCare}
        onConnect={() => {}}
        onSwitchNetwork={() => {}}
      />,
    );

    const retry = screen.queryByRole("button", { name: /care/i });
    expect(retry).toBeNull();

    screen.getAllByText(/could not be loaded/i);
    expect(onCare).not.toHaveBeenCalled();
  });

  // Regression: the state machine had no txKind, so an adopt receipt set
  // txPhase "success" and the panel announced "Care is confirmed".
  it("does not announce a confirmed care after an adoption", () => {
    const afterAdopt = resolveCareActionState({
      ...baseInput,
      readStatus: "idle",
      hasPet: true,
      txPhase: "success",
      txKind: "adopt",
    });

    expect(afterAdopt.kind).not.toBe("success");
  });

  it("still announces a confirmed care after a care", () => {
    const afterCare = resolveCareActionState({
      ...baseInput,
      readStatus: "idle",
      hasPet: true,
      txPhase: "success",
      txKind: "care",
    });

    expect(afterCare.kind).toBe("success");
  });

  it("keeps the retry affordance for a genuine transaction error", () => {
    const onCare = vi.fn();
    const action = resolveCareActionState({
      ...baseInput,
      readStatus: "idle",
      hasPet: true,
      txPhase: "error",
      txErrorMessage: "The care transaction reverted. No progress was awarded.",
    });

    expect(action.kind).toBe("error");

    render(
      <CarePanel
        pet={null}
        action={action}
        onCare={onCare}
        onConnect={() => {}}
        onSwitchNetwork={() => {}}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /Try care again/i }));
    expect(onCare).toHaveBeenCalledTimes(1);
  });
});