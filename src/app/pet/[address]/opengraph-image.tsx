import { ShareImage } from "@/components/share/ShareImage";
import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { artDataUrl, readStageArt } from "@/lib/og-art";
import { parsePublicWalletAddress, readPublicPet } from "@/lib/public-pet";

export const dynamic = "force-dynamic";
export const alt = "A MemePet read from the registry";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const STAGE_LABEL = {
  hatchling: "Hatchling",
  buddy: "Buddy",
  guardian: "Guardian",
} as const;

type ImageProps = {
  params: Promise<{ address: string }>;
};

export default async function PublicPetOpenGraphImage({ params }: ImageProps) {
  const { address } = await params;
  const owner = parsePublicWalletAddress(address);
  if (!owner) {
    notFound();
  }

  const snapshot = await readPublicPet(owner);
  const art =
    snapshot.kind === "pet" ? await readStageArt(snapshot.pet.stage) : null;
  const artSrc = art ? artDataUrl(art) : null;

  const heading =
    snapshot.kind === "pet"
      ? snapshot.pet.displayName
      : snapshot.kind === "no-pet"
        ? "No pet yet"
        : snapshot.kind === "error"
          ? "Read failed"
          : "Registry unavailable";

  const detail =
    snapshot.kind === "pet"
      ? `${STAGE_LABEL[snapshot.pet.stage]} · ${snapshot.pet.growthPoints} growth points`
      : snapshot.kind === "no-pet"
        ? "This wallet has not adopted a pet."
        : snapshot.kind === "error"
          ? "The registry read failed. No pet is shown."
          : "No registry is connected.";

  return new ImageResponse(
    <ShareImage
      artSrc={artSrc}
      heading={heading}
      detail={detail}
      ownerLabel={snapshot.ownerLabel}
    />,
    { ...size },
  );
}
