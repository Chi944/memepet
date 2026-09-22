import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { CarePanel } from "@/components/pet/CarePanel";
import type { CareActionState, PetViewModel } from "@/types/view-models";

const PET: PetViewModel = {
  displayName: "Mochi",
  communityName: "Approved community",
  stage: "hatchling",
  growthPoints: 0,
  nextStageAt: 20,
  artSrc: "/pets/hatchling.png",
  dataMode: "live",
};

function panel(action: CareActionState) {
  return (
    <CarePanel
      pet={PET}
      action={action}
      onCare={() => {}}
      onConnect={() => {}}
      onSwitchNetwork={() => {}}
    />
  );
}

describe("CarePanel keyboard focus across state transitions", () => {
  // Regression: each state renders a different subtree, so activating Care
  // unmounted the focused button and dropped focus to <body>. Every follow-on
  // state renders only disabled buttons, which cannot hold focus.
  it("keeps focus inside the panel when ready -> awaiting-signature", () => {
    const { rerender } = render(panel({ kind: "ready" }));

    const careButton = screen.getByRole("button", { name: /Care for Mochi/i });
    careButton.focus();
    expect(document.activeElement).toBe(careButton);

    rerender(panel({ kind: "awaiting-signature" }));

    expect(document.activeElement).not.toBe(document.body);
    expect(document.activeElement?.getAttribute("aria-live")).toBe("polite");
  });

  it("keeps focus inside the panel through pending -> success", () => {
    const { rerender } = render(panel({ kind: "ready" }));

    screen.getByRole("button", { name: /Care for Mochi/i }).focus();
    rerender(panel({ kind: "pending", transactionHash: "0xabc" }));
    expect(document.activeElement).not.toBe(document.body);

    rerender(panel({ kind: "success" }));
    expect(document.activeElement).not.toBe(document.body);
  });

  // The panel must not yank focus when the user never had focus in it — for
  // example a background state change while they are reading elsewhere.
  it("does not steal focus when the panel never held it", () => {
    const outside = document.createElement("button");
    document.body.appendChild(outside);

    const { rerender } = render(panel({ kind: "ready" }));
    outside.focus();
    expect(document.activeElement).toBe(outside);

    rerender(panel({ kind: "awaiting-signature" }));

    expect(document.activeElement).toBe(outside);
    outside.remove();
  });
});