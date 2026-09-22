/** Proposed UI contract v1. The lead reviews/adapts it before delegation.
 * Display values only: this file is not a contract ABI or persistence model.
 */
export type PetStage = "hatchling" | "buddy" | "guardian";
export type DataMode = "fixture" | "live";

export interface PetViewModel {
  readonly displayName: string;
  readonly communityName: string;
  readonly stage: PetStage;
  readonly growthPoints: number;
  readonly nextStageAt: number | null; // null means final stage, not a loading error
  readonly artSrc: string | null; // null => intentional, accessible placeholder
  readonly dataMode: DataMode;
}

export type CareActionState =
  | { readonly kind: "ready" }
  | { readonly kind: "needs-wallet" }
  | { readonly kind: "wrong-network" }
  | { readonly kind: "cooldown"; readonly availableAtIso: string }
  | { readonly kind: "awaiting-signature" }
  | { readonly kind: "submitting" }
  | { readonly kind: "pending"; readonly transactionHash: string }
  | { readonly kind: "success" }
  | { readonly kind: "error"; readonly message: string }
  | { readonly kind: "unavailable"; readonly message: string };

export interface PetSceneProps {
  readonly pet: PetViewModel;
  readonly celebrate: boolean; // lead toggles only after confirmed success in live mode
}

export interface CarePanelProps {
  /** null when no pet is known: never substitute a fabricated pet. */
  readonly pet: PetViewModel | null;
  readonly action: CareActionState;
  readonly onCare: () => void;
  readonly onConnect: () => void;
  readonly onSwitchNetwork: () => void;
}

export interface CommunityViewModel {
  readonly name: string;
  readonly totalCareActions: number | null; // null is unknown, never display as zero
  readonly milestoneTarget: number | null;
  readonly isLoading: boolean;
  readonly errorMessage: string | null;
  readonly dataMode: DataMode;
}

export interface CommunityPanelProps {
  readonly community: CommunityViewModel;
}

export interface LandingHeroProps {
  readonly onGetStarted: () => void;
}
