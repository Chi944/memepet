import { readFile } from "node:fs/promises";
import path from "node:path";
import type { PetStage } from "@/types/view-models";

const STAGES: readonly PetStage[] = ["hatchling", "buddy", "guardian"];

export function isPetStage(value: string): value is PetStage {
  return (STAGES as readonly string[]).includes(value);
}

/** Read a 1200×630 share background. Missing art leaves an honest text-only card. */
export async function readStageArt(stage: PetStage): Promise<Buffer | null> {
  const sharePath = path.join(process.cwd(), "public", "pets", "share", `${stage}.png`);
  try {
    return await readFile(sharePath);
  } catch {
    // Square stage stills cannot substitute for a full-canvas share background.
    return null;
  }
}

export async function readHatchlingArt(): Promise<Buffer | null> {
  return readStageArt("hatchling");
}

export function artDataUrl(bytes: Buffer): string {
  return `data:image/png;base64,${bytes.toString("base64")}`;
}
