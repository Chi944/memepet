import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { petFixtures } from "@/fixtures/ui-fixtures";
import { PetScene } from "./PetScene";

const hatchlingWithoutArt = {
  ...petFixtures.hatchling,
  artSrc: null,
};

describe("PetScene", () => {
  it("renders an accessible placeholder when art is missing", () => {
    render(<PetScene pet={hatchlingWithoutArt} celebrate={false} />);

    expect(screen.getByRole("heading", { name: "Mochi" })).toBeInTheDocument();
    expect(screen.getByText("Stage: Hatchling")).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "Mochi artwork placeholder" }),
    ).toBeInTheDocument();
  });

  it("renders supplied hatchling art and details", () => {
    render(<PetScene pet={petFixtures.hatchling} celebrate={false} />);

    expect(
      screen.getByRole("img", { name: "Mochi, the hatchling pet" }),
    ).toBeInTheDocument();
    expect(screen.getByText("10 growth points")).toBeInTheDocument();
  });

  it("shows a final-stage message instead of a progress ratio", () => {
    render(<PetScene pet={petFixtures.guardian} celebrate={false} />);

    expect(screen.getByText("Stage: Guardian")).toBeInTheDocument();
    expect(
      screen.getByText("Guardian is the final stage."),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("progressbar", { name: "Growth toward next stage" }),
    ).not.toBeInTheDocument();
  });

  it("updates visible stage text when props change", () => {
    const { rerender } = render(
      <PetScene pet={petFixtures.hatchling} celebrate={false} />,
    );

    expect(screen.getByText("Stage: Hatchling")).toBeInTheDocument();

    rerender(<PetScene pet={petFixtures.buddy} celebrate={false} />);

    expect(screen.getByText("Stage: Buddy")).toBeInTheDocument();
    expect(screen.getByText("20 growth points")).toBeInTheDocument();
  });
});
