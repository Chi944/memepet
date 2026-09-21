import { access, readFile } from "node:fs/promises";
import path from "node:path";
import type { PetStage } from "@/types/view-models";

const STAGES: readonly PetStage[] = ["hatchling", "buddy", "guardian"];

export function isPetStage(value: string): value is PetStage {
  return (STAGES as readonly string[]).includes(value);
}

/**
 * Prefer Teammate A's share plate when it exists.
 * Until then, the stage illustration is drawn on the app's lilac field.
 */
export async function readStageArt(stage: PetStage): Promise<Buffer | null> {
  const sharePath = path.join(process.cwd(), "public", "pets", "share", `${stage}.png`);
  const stagePath = path.join(process.cwd(), "public", "pets", `${stage}.png`);

  try {
    await access(sharePath);
    return await readFile(sharePath);
  } catch {
    try {
      return await readFile(stagePath);
    } catch {
      return null;
    }
  }
}

export async function readHatchlingArt(): Promise<Buffer | null> {
  return readStageArt("hatchling");
}

export function artDataUrl(bytes: Buffer): string {
  return `data:image/png;base64,${bytes.toString("base64")}`;
}
