import type { PetViewModel } from "@/types/view-models";
import {
  APPROVED_COMMUNITY_ID,
  mapConfirmedPetProgress,
} from "./pet-progress";
import type { PetOfResult } from "./pet-registry-abi";

const STAGE_ART: Record<PetViewModel["stage"], string> = {
  hatchling: "/pets/hatchling.png",
  buddy: "/pets/buddy.png",
  guardian: "/pets/guardian.png",
};

export type LivePetMapping =
  | { readonly kind: "no-pet" }
  | { readonly kind: "pet"; readonly pet: PetViewModel };

/**
 * Maps a confirmed petOf read into a live PetViewModel.
 * Does not invent pets when exists is false.
 */
export function mapPetOfToViewModel(
  result: PetOfResult,
  options?: {
    readonly displayName?: string;
    readonly communityName?: string;
  },
): LivePetMapping {
  if (!result.exists) {
    return { kind: "no-pet" };
  }

  const progress = mapConfirmedPetProgress(Number(result.careCount));

  return {
    kind: "pet",
    pet: {
      displayName: options?.displayName ?? "Mochi",
      communityName:
        options?.communityName ??
        (result.communityId === APPROVED_COMMUNITY_ID
          ? "Approved community"
          : `Community ${result.communityId}`),
      stage: progress.stage,
      growthPoints: progress.growthPoints,
      nextStageAt: progress.nextStageAt,
      artSrc: STAGE_ART[progress.stage],
      dataMode: "live",
    },
  };
}
