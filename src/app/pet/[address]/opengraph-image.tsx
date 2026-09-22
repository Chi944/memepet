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
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#f3edff",
          color: "#241c33",
          padding: "64px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: artSrc ? "620px" : "100%",
            gap: "18px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 28,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#6d3fd0",
              fontWeight: 700,
            }}
          >
            MemePet
          </div>
          <div style={{ display: "flex", fontSize: 72, fontWeight: 800, lineHeight: 1.05 }}>
            {heading}
          </div>
          <div style={{ display: "flex", fontSize: 36, color: "#5f5573" }}>{detail}</div>
          <div style={{ display: "flex", fontSize: 28, color: "#7a7189" }}>
            {snapshot.ownerLabel}
          </div>
        </div>
        {artSrc ? (
          // next/og ImageResponse renders through Satori, which only accepts <img>.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={artSrc}
            width={420}
            height={420}
            alt=""
            style={{ borderRadius: 32 }}
          />
        ) : null}
      </div>
    ),
    { ...size },
  );
}
