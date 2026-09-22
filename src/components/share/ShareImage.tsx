type ShareImageProps = {
  artSrc: string | null;
  heading: string;
  detail: string;
  ownerLabel?: string;
};

/** Satori canvas: the A5 artwork reserves x=0..660 for live text. */
export function ShareImage({ artSrc, heading, detail, ownerLabel }: ShareImageProps) {
  return (
    <div style={{
      width: "100%", height: "100%", display: "flex", position: "relative",
      alignItems: "center", background: "#efe7ff", color: "#221b36",
      fontFamily: "sans-serif",
    }}>
      {artSrc ? (
        // ImageResponse renders through Satori, which requires a native img.
        <img src={artSrc} width={1200} height={630} alt=""
          style={{ position: "absolute", left: 0, top: 0 }} />
      ) : null}
      <div style={{
        display: "flex", flexDirection: "column", position: "relative",
        marginLeft: 64, width: artSrc ? 540 : 1072, gap: 24,
      }}>
        <div style={{ display: "flex", fontSize: 28, letterSpacing: "0.08em", color: "#594478", fontWeight: 700 }}>
          MEMEPET
        </div>
        <div style={{ display: "flex", fontSize: 64, fontWeight: 800, lineHeight: 1.08, overflowWrap: "break-word" }}>
          {heading}
        </div>
        <div style={{ display: "flex", fontSize: 32, lineHeight: 1.25, color: "#51465f" }}>
          {detail}
        </div>
        {ownerLabel ? (
          <div style={{ display: "flex", fontSize: 26, color: "#51465f" }}>{ownerLabel}</div>
        ) : null}
      </div>
    </div>
  );
}
