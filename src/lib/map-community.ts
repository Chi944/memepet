import { APPROVED_COMMUNITY_ID } from "./pet-progress";
import type { CommunityViewModel } from "@/types/view-models";

export const APPROVED_COMMUNITY_NAME = "MemePet community";

/**
 * Maps a successful communityStats() uint64 into a live CommunityViewModel.
 * milestoneTarget stays null until a verified target exists — never invent one.
 */
export function mapCommunityStatsToViewModel(
  totalCareActions: bigint | number,
  options?: {
    readonly name?: string;
  },
): CommunityViewModel {
  const total =
    typeof totalCareActions === "bigint"
      ? Number(totalCareActions)
      : totalCareActions;

  if (!Number.isFinite(total) || total < 0 || !Number.isInteger(total)) {
    throw new Error("totalCareActions must be a non-negative integer");
  }

  return {
    name: options?.name ?? APPROVED_COMMUNITY_NAME,
    totalCareActions: total,
    milestoneTarget: null,
    isLoading: false,
    errorMessage: null,
    dataMode: "live",
  };
}

/**
 * Live unknown state for communityStats. Null total is not zero.
 */
export function unknownCommunityViewModel(
  options?: {
    readonly name?: string;
    readonly isLoading?: boolean;
    readonly errorMessage?: string | null;
  },
): CommunityViewModel {
  return {
    name: options?.name ?? APPROVED_COMMUNITY_NAME,
    totalCareActions: null,
    milestoneTarget: null,
    isLoading: options?.isLoading ?? false,
    errorMessage: options?.errorMessage ?? null,
    dataMode: "live",
  };
}

/**
 * communityStats() reverts InvalidCommunity for unapproved ids (audit finding 1).
 * That revert maps to unknown (null), never to 0.
 */
export function mapCommunityStatsFailureToViewModel(
  error: unknown,
  options?: {
    readonly name?: string;
    readonly communityId?: number;
  },
): CommunityViewModel {
  const communityId = options?.communityId ?? APPROVED_COMMUNITY_ID;
  const message = error instanceof Error ? error.message : String(error);
  const isInvalidCommunity =
    /InvalidCommunity/i.test(message) ||
    (typeof error === "object" &&
      error !== null &&
      "shortMessage" in error &&
      /InvalidCommunity/i.test(String((error as { shortMessage: unknown }).shortMessage)));

  if (isInvalidCommunity || communityId !== APPROVED_COMMUNITY_ID) {
    return unknownCommunityViewModel({
      name: options?.name,
      errorMessage: null,
    });
  }

  return unknownCommunityViewModel({
    name: options?.name,
    errorMessage:
      "Community care total could not be loaded. No preview data is shown.",
  });
}
