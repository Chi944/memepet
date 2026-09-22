// @vitest-environment node
import { it, expect } from "vitest";
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { ShareImage } from "./ShareImage";
it("renders valid 1200×630 PNGs for the site, stages and error state", async () => {
  for (const stage of ["site", "hatchling", "buddy", "guardian", "error"]) {
    const art = stage === "error" ? null : await readFile(`public/pets/share/${stage === "site" ? "hatchling" : stage}.png`);
    const response = new ImageResponse(<ShareImage
      artSrc={art ? `data:image/png;base64,${art.toString("base64")}` : null}
      heading={stage === "site" ? "Adopt the meme. Grow the community." : stage === "error" ? "Read failed" : "Mochi"}
      detail={stage === "site" ? "One care a day. Progress from participation, not from spending." : stage === "error" ? "The registry read failed. No pet is shown." : `${stage[0].toUpperCase()+stage.slice(1)} · ${stage === "guardian" ? 50 : stage === "buddy" ? 20 : 10} growth points`}
      ownerLabel={stage === "site" ? undefined : "0x1234…5678"}
    />, { width:1200, height:630 });
    const bytes=Buffer.from(await response.arrayBuffer());
    expect(bytes.readUInt32BE(16)).toBe(1200);
    expect(bytes.readUInt32BE(20)).toBe(630);
  }
}, 60000);
