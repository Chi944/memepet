import type { PetStage } from "@/types/view-models";

/** Confirmed-care mapping. Do not store these values on-chain. */
export const GROWTH_POINTS_PER_CARE = 10;
export const BUDDY_AT = 20;
export const GUARDIAN_AT = 50;
export const APPROVED_COMMUNITY_ID = 1;

export function growthPointsFromCareCount(careCount: number): number {
  if (!Number.isInteger(careCount) || careCount < 0) {
    throw new Error("careCount must be a non-negative integer");
  }

  return careCount * GROWTH_POINTS_PER_CARE;
}

export function stageFromGrowthPoints(growthPoints: number): PetStage {
  if (growthPoints >= GUARDIAN_AT) {
    return "guardian";
  }

  if (growthPoints >= BUDDY_AT) {
    return "buddy";
  }

  return "hatchling";
}

export function nextStageAtFromGrowthPoints(growthPoints: number): number | null {
  if (growthPoints >= GUARDIAN_AT) {
    return null;
  }

  if (growthPoints >= BUDDY_AT) {
    return GUARDIAN_AT;
  }

  return BUDDY_AT;
}

export function mapConfirmedPetProgress(careCount: number): {
  readonly growthPoints: number;
  readonly stage: PetStage;
  readonly nextStageAt: number | null;
} {
  const growthPoints = growthPointsFromCareCount(careCount);

  return {
    growthPoints,
    stage: stageFromGrowthPoints(growthPoints),
    nextStageAt: nextStageAtFromGrowthPoints(growthPoints),
  };
}
