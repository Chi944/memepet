"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { CommunityPanel } from "@/components/community/CommunityPanel";
import { LandingHero } from "@/components/landing/LandingHero";
import type { CommunityViewModel } from "@/types/view-models";

const unpublishedCommunity: CommunityViewModel = {
  name: "MemePet community",
  totalCareActions: null,
  milestoneTarget: null,
  isLoading: false,
  errorMessage: null,
  dataMode: "live",
};

export function HomeScreen() {
  const router = useRouter();
  const isDevelopment = process.env.NODE_ENV === "development";

  return (
    <main className="home-screen">
      <LandingHero onGetStarted={() => router.push("/pet")} />
      <CommunityPanel community={unpublishedCommunity} />
      {isDevelopment ? (
        <nav className="preview-links" aria-label="Developer previews">
          <Link href="/dev/pet">Pet UI preview</Link>
          <Link href="/dev/landing">Landing UI preview</Link>
          <Link href="/dev/community">Community UI preview</Link>
        </nav>
      ) : (
        <p className="status-note">
          Live care totals are unknown until a contract is connected. Developer
          previews are unavailable in production.
        </p>
      )}
    </main>
  );
}
