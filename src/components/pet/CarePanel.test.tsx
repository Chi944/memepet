import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { careFixtures, petFixtures } from "@/fixtures/ui-fixtures";
import { CarePanel } from "./CarePanel";

describe("CarePanel", () => {
  it("routes ready, connect, and switch-network clicks to the supplied callbacks", () => {
    const onCare = vi.fn();
    const onConnect = vi.fn();
    const onSwitchNetwork = vi.fn();

    const { rerender } = render(
      <CarePanel
        pet={petFixtures.hatchling}
        action={careFixtures.ready}
        onCare={onCare}
        onConnect={onConnect}
        onSwitchNetwork={onSwitchNetwork}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Care for Mochi" }));
    expect(onCare).toHaveBeenCalledTimes(1);

    rerender(
      <CarePanel
        pet={petFixtures.hatchling}
        action={careFixtures.needsWallet}
        onCare={onCare}
        onConnect={onConnect}
        onSwitchNetwork={onSwitchNetwork}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Connect wallet" }));
    expect(onConnect).toHaveBeenCalledTimes(1);

    rerender(
      <CarePanel
        pet={petFixtures.hatchling}
        action={careFixtures.wrongNetwork}
        onCare={onCare}
        onConnect={onConnect}
        onSwitchNetwork={onSwitchNetwork}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Switch network" }));
    expect(onSwitchNetwork).toHaveBeenCalledTimes(1);
  });

  it("disables care while pending and does not invent extra growth", () => {
    const onCare = vi.fn();

    render(
      <CarePanel
        pet={petFixtures.hatchling}
        action={careFixtures.pending}
        onCare={onCare}
        onConnect={() => undefined}
        onSwitchNetwork={() => undefined}
      />,
    );

    expect(
      screen.getByText("Transaction pending. No progress has been awarded yet."),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Pending confirmation" }),
    ).toBeDisabled();
    fireEvent.click(screen.getByRole("button", { name: "Pending confirmation" }));
    expect(onCare).not.toHaveBeenCalled();
  });
});
