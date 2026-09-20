import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { LandingHero } from "./LandingHero";

describe("LandingHero", () => {
  it("explains the product and forwards the primary action", () => {
    const onGetStarted = vi.fn();

    render(<LandingHero onGetStarted={onGetStarted} />);

    expect(
      screen.getByRole("heading", {
        name: "Adopt the meme. Grow the community.",
      }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Meet your pet" }));

    expect(onGetStarted).toHaveBeenCalledTimes(1);
    expect(
      screen.getByRole("img", { name: "Mochi, the MemePet hatchling mascot" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Adopt a meme-community mascot/i),
    ).toBeInTheDocument();
  });
});
