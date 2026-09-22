// @vitest-environment node
import path from "node:path";
import { beforeEach, describe, expect, it, vi } from "vitest";
const readFile = vi.hoisted(() => vi.fn());
vi.mock("node:fs/promises", () => ({ readFile }));
import { readStageArt } from "./og-art";
beforeEach(() => vi.clearAllMocks());
describe("share background loading", () => {
  it("loads the selected share background", async () => {
    const bytes = Buffer.from("background");
    readFile.mockResolvedValue(bytes);
    expect(await readStageArt("buddy")).toBe(bytes);
    expect(readFile).toHaveBeenCalledWith(path.join(process.cwd(), "public", "pets", "share", "buddy.png"));
  });
  it("returns no artwork when missing instead of stretching a square still", async () => {
    readFile.mockRejectedValue(new Error("missing"));
    expect(await readStageArt("guardian")).toBeNull();
    expect(readFile).toHaveBeenCalledTimes(1);
  });
});
