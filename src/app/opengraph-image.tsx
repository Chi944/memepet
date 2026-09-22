import { ShareImage } from "@/components/share/ShareImage";
import { ImageResponse } from "next/og";
import { artDataUrl, readHatchlingArt } from "@/lib/og-art";

export const alt = "MemePet — adopt the meme, grow the community";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function SiteOpenGraphImage() {
  const art = await readHatchlingArt();
  const artSrc = art ? artDataUrl(art) : null;

  return new ImageResponse(
    <ShareImage
      artSrc={artSrc}
      heading="Adopt the meme. Grow the community."
      detail="One care a day. Progress from participation, not from spending."
    />,
    { ...size },
  );
}
