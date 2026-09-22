import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { communityFixtures } from "@/fixtures/ui-fixtures";
import { CommunityPanel } from "./CommunityPanel";

describe("CommunityPanel", () => {
  it("treats a zero total as zero, not unknown", () => {
    render(<CommunityPanel community={communityFixtures.empty} />);

    expect(screen.getByText("Care actions:")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
    // Substring, not an exact match: the unknown state renders "Care actions:
    // Unknown" as one node, so queryByText("Unknown") returned null even when
    // the panel WAS unknown, and the assertion could never fail.
    expect(screen.queryByText(/Unknown/)).not.toBeInTheDocument();
  });

  it("treats a null total as unknown, not zero", () => {
    render(
      <CommunityPanel
        community={{
          ...communityFixtures.growing,
          totalCareActions: null,
        }}
      />,
    );

    expect(screen.getByText("Care actions: Unknown")).toBeInTheDocument();
    expect(screen.queryByText("0")).not.toBeInTheDocument();
  });

  // Regression: each state used to return its own Card, so the loading live
  // region was replaced by a node carrying no aria-live. A screen reader was
  // never told the total had arrived.
  it("keeps one live region mounted from loading through to the total", () => {
    const { container, rerender } = render(
      <CommunityPanel community={communityFixtures.loading} />,
    );

    const region = container.querySelector("[aria-live]");
    expect(region).not.toBeNull();
    expect(region).toHaveAttribute("aria-busy", "true");

    rerender(<CommunityPanel community={communityFixtures.empty} />);

    const afterwards = container.querySelector("[aria-live]");
    expect(afterwards).toBe(region);
    expect(afterwards).not.toHaveAttribute("aria-busy", "true");
    expect(afterwards).toHaveTextContent("Care actions:");
  });

  it("shows loading without a fake total", () => {
    render(<CommunityPanel community={communityFixtures.loading} />);

    expect(screen.getByText("Loading community progress…")).toBeInTheDocument();
    expect(screen.queryByText("Care actions:")).not.toBeInTheDocument();
  });

  it("shows an error without invented live progress", () => {
    render(<CommunityPanel community={communityFixtures.error} />);

    expect(
      screen.getByText("Community progress could not be loaded."),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Live progress is unavailable; no fictional total is shown.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("progressbar", {
        name: "Community milestone progress",
      }),
    ).not.toBeInTheDocument();
  });

  it("keeps an above-target count visible and caps the bar", () => {
    render(<CommunityPanel community={communityFixtures.reached} />);

    expect(screen.getByText("24")).toBeInTheDocument();
    expect(screen.getByText(/milestone achieved/i)).toBeInTheDocument();
    expect(
      screen.getByRole("progressbar", { name: "Community milestone progress" }),
    ).toHaveAttribute("aria-valuenow", "20");
  });

  it("does not invent a percentage for a missing or zero target", () => {
    const { rerender } = render(
      <CommunityPanel community={communityFixtures.unknownTarget} />,
    );

    expect(
      screen.getByText(
        "Milestone target unavailable. No percentage can be calculated.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("progressbar", {
        name: "Community milestone progress",
      }),
    ).not.toBeInTheDocument();

    rerender(
      <CommunityPanel
        community={{
          ...communityFixtures.growing,
          milestoneTarget: 0,
        }}
      />,
    );

    expect(
      screen.getByText(
        "Milestone target unavailable. No percentage can be calculated.",
      ),
    ).toBeInTheDocument();
  });
});