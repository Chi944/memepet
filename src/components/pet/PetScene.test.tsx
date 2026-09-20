import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { petFixtures } from "@/fixtures/ui-fixtures";
import { PetScene } from "./PetScene";

describe("PetScene", () => {
  it("renders supplied hatchling details and an accessible art placeholder", () => {
    render(<PetScene pet={petFixtures.hatchling} celebrate={false} />);

    expect(screen.getByRole("heading", { name: "Mochi" })).toBeInTheDocument();
    expect(screen.getByText("Stage: Hatchling")).toBeInTheDocument();
    expect(screen.getByText("10 growth points")).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "Mochi artwork placeholder" }),
    ).toBeInTheDocument();
    expect(screen.queryByText("broken")).not.toBeInTheDocument();
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
