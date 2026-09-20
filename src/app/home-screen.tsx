"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { CommunityPanel } from "@/components/community/CommunityPanel";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { LandingHero } from "@/components/landing/LandingHero";
import { AppShell } from "@/components/ui/AppShell";
import { useCommunityStats } from "@/hooks/useCommunityStats";
import { useWallet } from "@/hooks/useWallet";
import {
  getActiveDeployment,
  isRegistryConfigured,
} from "@/lib/deployment";
import { unknownCommunityViewModel } from "@/lib/map-community";
import type { CommunityViewModel } from "@/types/view-models";

/**
 * No registry is connected, so the live total is genuinely unknown. This is a
 * live view model with an unknown value, never a fixture standing in for one.
 */
const unpublishedCommunity: CommunityViewModel = unknownCommunityViewModel({
  isLoading: false,
});

function LiveHomeCommunity() {
  const wallet = useWallet();
  const { community } = useCommunityStats({
    deployment: wallet.deployment,
    address: wallet.address,
    wrongChain: wallet.wrongChain,
  });

  return <CommunityPanel community={community} />;
}

export function HomeScreen() {
  const router = useRouter();
  const isDevelopment = process.env.NODE_ENV === "development";
  const configured = isRegistryConfigured(getActiveDeployment());

  return (
    <AppShell>
      <LandingHero onGetStarted={() => router.push("/pet")} />
      <HowItWorks connected={configured} />
      {configured ? (
        <LiveHomeCommunity />
      ) : (
        <CommunityPanel community={unpublishedCommunity} />
      )}

      {/* Shown in every environment: the reason a live total is unknown is
          part of the product, not a development-only aside. */}
      <p className="status-note">
        {configured
          ? "Community totals come from communityStats on the configured registry. A failed or reverting read stays unknown — never zero, never a fixture."
          : "Care totals stay unknown until a registry contract is connected and read. This build never substitutes preview numbers for a live read."}
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
