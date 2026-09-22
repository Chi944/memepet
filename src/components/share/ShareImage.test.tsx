import { render, screen } from "@testing-library/react";
import type { ReactElement } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { petFixtures } from "@/fixtures/ui-fixtures";
import { ShareImage } from "./ShareImage";

const mocks = vi.hoisted(() => ({ read: vi.fn(), art: vi.fn(), image: vi.fn() }));
vi.mock("next/og", () => ({
  ImageResponse: class {
    constructor(element: ReactElement) { mocks.image(element); }
  },
}));
vi.mock("@/lib/public-pet", () => ({
  parsePublicWalletAddress: (address: string) => address === "invalid" ? null : address,
  readPublicPet: mocks.read,
}));
vi.mock("@/lib/og-art", () => ({
  readStageArt: mocks.art,
  readHatchlingArt: () => mocks.art("hatchling"),
  artDataUrl: () => "data:image/png;base64,cGV0",
}));
vi.mock("next/navigation", () => ({ notFound: () => { throw new Error("404"); } }));
import PublicImage from "@/app/pet/[address]/opengraph-image";
import SiteImage from "@/app/opengraph-image";

beforeEach(() => { vi.clearAllMocks(); mocks.art.mockResolvedValue(Buffer.from("pet")); });

async function showPublic() {
  await PublicImage({ params: Promise.resolve({ address: "0x123" }) });
  render(mocks.image.mock.calls[0][0]);
}

describe("share image integration", () => {
  it.each(["hatchling", "buddy", "guardian"] as const)("uses the %s background and live details", async (stage) => {
    mocks.read.mockResolvedValue({ kind: "pet", pet: { ...petFixtures[stage], displayName: "Live pet", growthPoints: 123 }, ownerLabel: "0x123…4567" });
    await showPublic();
    expect(mocks.art).toHaveBeenCalledWith(stage);
    expect(screen.getByText("Live pet")).toBeInTheDocument();
    expect(screen.getByText(/123 growth points/)).toBeInTheDocument();
    expect(screen.getByText("0x123…4567")).toBeInTheDocument();
    const background = screen.getByRole("presentation");
    expect(background).toHaveAttribute("width", "1200");
    expect(background).toHaveAttribute("height", "630");
  });

  it.each([
    ["no-pet", "No pet yet"], ["error", "Read failed"], ["unconfigured", "Registry unavailable"],
  ])("does not invent a mascot for %s", async (kind, heading) => {
    mocks.read.mockResolvedValue({ kind, ownerLabel: "0x123…4567" });
    await showPublic();
    expect(screen.getByText(heading)).toBeInTheDocument();
    expect(mocks.art).not.toHaveBeenCalled();
    expect(screen.queryByRole("presentation")).not.toBeInTheDocument();
  });

  it("rejects invalid addresses before reading the registry", async () => {
    await expect(PublicImage({ params: Promise.resolve({ address: "invalid" }) })).rejects.toThrow("404");
    expect(mocks.read).not.toHaveBeenCalled();
  });

  it("uses the hatchling background on the site card", async () => {
    await SiteImage();
    render(mocks.image.mock.calls[0][0]);
    expect(mocks.art).toHaveBeenCalledWith("hatchling");
    expect(screen.getByText("Adopt the meme. Grow the community.")).toBeInTheDocument();
  });

  it("keeps text available without an image", () => {
    render(<ShareImage artSrc={null} heading="Mochi" detail="Buddy · 20 growth points" />);
    expect(screen.getByText("Buddy · 20 growth points")).toBeInTheDocument();
    expect(screen.queryByRole("presentation")).not.toBeInTheDocument();
  });
});
