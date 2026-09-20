/** FICTIONAL UI DATA. Preview/test imports only. Never a live-read fallback. */
import type {
  CareActionState,
  CommunityViewModel,
  PetViewModel,
} from "../types/view-models";

export const petFixtures = {
  hatchling: {
    displayName: "Mochi",
    communityName: "Example Community — UI fixture",
    stage: "hatchling",
    growthPoints: 10,
    nextStageAt: 20,
    artSrc: "/pets/hatchling.png",
    dataMode: "fixture",
  },
  buddy: {
    displayName: "Mochi",
    communityName: "Example Community — UI fixture",
    stage: "buddy",
    growthPoints: 20,
    nextStageAt: 50,
    artSrc: "/pets/buddy.png",
    dataMode: "fixture",
  },
  guardian: {
    displayName: "Mochi",
    communityName: "Example Community — UI fixture",
    stage: "guardian",
    growthPoints: 50,
    nextStageAt: null,
    artSrc: "/pets/guardian.png",
    dataMode: "fixture",
  },
} as const satisfies Record<string, PetViewModel>;

export const careFixtures = {
  ready: { kind: "ready" },
  needsWallet: { kind: "needs-wallet" },
  wrongNetwork: { kind: "wrong-network" },
  cooldown: { kind: "cooldown", availableAtIso: "2030-01-02T00:00:00.000Z" },
  awaitingSignature: { kind: "awaiting-signature" },
  submitting: { kind: "submitting" },
  pending: { kind: "pending", transactionHash: "UI_FIXTURE_NOT_A_REAL_HASH" },
  success: { kind: "success" },
  rejected: { kind: "error", message: "You declined the wallet request. No progress was awarded." },
  unavailable: { kind: "unavailable", message: "Pet data is unavailable. Please try again." },
} as const satisfies Record<string, CareActionState>;

export const communityFixtures = {
  loading: {
    name: "Example Community — UI fixture",
    totalCareActions: null,
    milestoneTarget: 20,
    isLoading: true,
    errorMessage: null,
    dataMode: "fixture",
  },
  empty: {
    name: "Example Community — UI fixture",
    totalCareActions: 0,
    milestoneTarget: 20,
    isLoading: false,
    errorMessage: null,
    dataMode: "fixture",
  },
  growing: {
    name: "Example Community — UI fixture",
    totalCareActions: 7,
    milestoneTarget: 20,
    isLoading: false,
    errorMessage: null,
    dataMode: "fixture",
  },
  reached: {
    name: "Example Community — UI fixture",
    totalCareActions: 24,
    milestoneTarget: 20,
    isLoading: false,
    errorMessage: null,
    dataMode: "fixture",
  },
  error: {
    name: "Example Community — UI fixture",
    totalCareActions: null,
    milestoneTarget: 20,
    isLoading: false,
    errorMessage: "Community progress could not be loaded.",
    dataMode: "fixture",
  },
  unknownTarget: {
    name: "Example Community — UI fixture",
    totalCareActions: 7,
    milestoneTarget: null,
    isLoading: false,
    errorMessage: null,
    dataMode: "fixture",
  },
} as const satisfies Record<string, CommunityViewModel>;
