import { ImageResponse } from "next/og";
import { artDataUrl, readHatchlingArt } from "@/lib/og-art";

export const alt = "MemePet — adopt the meme, grow the community";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function SiteOpenGraphImage() {
  const art = await readHatchlingArt();
  const artSrc = art ? artDataUrl(art) : null;

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
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "640px" }}>
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
          <div style={{ display: "flex", fontSize: 68, fontWeight: 800, lineHeight: 1.05 }}>
            Adopt the meme. Grow the community.
          </div>
          <div style={{ display: "flex", fontSize: 32, color: "#5f5573" }}>
            One care a day. Progress from participation, not from spending.
          </div>
        </div>
        {artSrc ? (
          // next/og ImageResponse renders through Satori, which only accepts <img>.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={artSrc}
            width={380}
            height={380}
            alt=""
            style={{ borderRadius: 32 }}
          />
        ) : null}
      </div>
    ),
    { ...size },
  );
}
