import { describe, expect, it } from "vitest";
import { mapPetOfToViewModel } from "./map-pet";

describe("mapPetOfToViewModel", () => {
  it("returns no-pet when exists is false without inventing growth", () => {
    const mapped = mapPetOfToViewModel({
      exists: false,
      communityId: 0,
      careCount: 0,
      lastCareDay: BigInt(0),
    });

    expect(mapped).toEqual({ kind: "no-pet" });
  });

  it("maps a live hatchling with dataMode live", () => {
    const mapped = mapPetOfToViewModel({
      exists: true,
      communityId: 1,
      careCount: 0,
      lastCareDay: BigInt(0),
    });

    expect(mapped.kind).toBe("pet");
    if (mapped.kind !== "pet") {
      return;
    }

    expect(mapped.pet).toMatchObject({
      growthPoints: 0,
      stage: "hatchling",
      nextStageAt: 20,
      dataMode: "live",
      artSrc: "/pets/hatchling.png",
    });
  });

  it("maps care counts through the shared progress thresholds", () => {
    const buddy = mapPetOfToViewModel({
      exists: true,
      communityId: 1,
      careCount: 2,
      lastCareDay: BigInt(1),
    });
    const guardian = mapPetOfToViewModel({
      exists: true,
      communityId: 1,
      careCount: 5,
      lastCareDay: BigInt(1),
    });

    expect(buddy.kind === "pet" && buddy.pet.stage).toBe("buddy");
    expect(guardian.kind === "pet" && guardian.pet).toMatchObject({
      stage: "guardian",
      growthPoints: 50,
      nextStageAt: null,
    });
  });
});
