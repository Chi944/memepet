import { describe, expect, it } from "vitest";
import {
  APPROVED_COMMUNITY_ID,
  BUDDY_AT,
  GUARDIAN_AT,
  GROWTH_POINTS_PER_CARE,
  growthPointsFromCareCount,
  mapConfirmedPetProgress,
  nextStageAtFromGrowthPoints,
  stageFromGrowthPoints,
} from "./pet-progress";

describe("confirmed pet progress mapper", () => {
  it("awards 10 growth points per confirmed care", () => {
    expect(GROWTH_POINTS_PER_CARE).toBe(10);
    expect(growthPointsFromCareCount(0)).toBe(0);
    expect(growthPointsFromCareCount(1)).toBe(10);
    expect(growthPointsFromCareCount(2)).toBe(20);
    expect(growthPointsFromCareCount(5)).toBe(50);
  });

  it("maps hatchling, buddy, and guardian thresholds without inventing extra stages", () => {
    expect(stageFromGrowthPoints(0)).toBe("hatchling");
    expect(stageFromGrowthPoints(19)).toBe("hatchling");
    expect(stageFromGrowthPoints(BUDDY_AT)).toBe("buddy");
    expect(stageFromGrowthPoints(49)).toBe("buddy");
    expect(stageFromGrowthPoints(GUARDIAN_AT)).toBe("guardian");
    expect(stageFromGrowthPoints(80)).toBe("guardian");
  });

  it("uses null nextStageAt only for the final stage", () => {
    expect(nextStageAtFromGrowthPoints(0)).toBe(BUDDY_AT);
    expect(nextStageAtFromGrowthPoints(19)).toBe(BUDDY_AT);
    expect(nextStageAtFromGrowthPoints(20)).toBe(GUARDIAN_AT);
    expect(nextStageAtFromGrowthPoints(49)).toBe(GUARDIAN_AT);
    expect(nextStageAtFromGrowthPoints(50)).toBeNull();
  });

  it("keeps the approved community identifier explicit", () => {
    expect(APPROVED_COMMUNITY_ID).toBe(1);
  });

  it("maps a first care and a guardian care count as complete display values", () => {
    expect(mapConfirmedPetProgress(1)).toEqual({
      growthPoints: 10,
      stage: "hatchling",
      nextStageAt: 20,
    });
    expect(mapConfirmedPetProgress(5)).toEqual({
      growthPoints: 50,
      stage: "guardian",
      nextStageAt: null,
    });
  });
});
