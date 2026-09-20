"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { CommunityPanel } from "@/components/community/CommunityPanel";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { LandingHero } from "@/components/landing/LandingHero";
import { AppShell } from "@/components/ui/AppShell";
import { isRegistryConfigured } from "@/lib/deployment";
import type { CommunityViewModel } from "@/types/view-models";

/**
 * No registry is connected, so the live total is genuinely unknown. This is a
 * live view model with an unknown value, never a fixture standing in for one.
 */
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
    <AppShell>
      <LandingHero onGetStarted={() => router.push("/pet")} />
      <HowItWorks connected={isRegistryConfigured()} />
      <CommunityPanel community={unpublishedCommunity} />

      {/* Shown in every environment: the reason a live total is unknown is
          part of the product, not a development-only aside. */}
      <p className="status-note">
        Care totals stay unknown until a registry contract is connected and
        read. This build never substitutes preview numbers for a live read.
      </p>

      {isDevelopment ? (
        <nav aria-label="Developer previews">
          <p className="status-note">
            Development only — these previews use fictional data and are
            excluded from production builds.
          </p>
          <ul className="preview-links">
            <li>
              <Link href="/dev/pet">Pet UI preview</Link>
            </li>
            <li>
              <Link href="/dev/landing">Landing UI preview</Link>
            </li>
            <li>
              <Link href="/dev/community">Community UI preview</Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </AppShell>
  );
}
