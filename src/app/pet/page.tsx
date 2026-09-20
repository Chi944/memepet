import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { AppShell } from "@/components/ui/AppShell";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { getActiveDeployment, isRegistryConfigured } from "@/lib/deployment";
import {
  BUDDY_AT,
  GROWTH_POINTS_PER_CARE,
  GUARDIAN_AT,
} from "@/lib/pet-progress";
import { PetLiveClient } from "./pet-live-client";

export const metadata: Metadata = {
  title: "Pet home",
};

export default function PetHomePage() {
  const isDevelopment = process.env.NODE_ENV === "development";
  const deployment = getActiveDeployment();
  const configured = isRegistryConfigured(deployment);

  if (configured) {
    return (
      <AppShell>
        <PetLiveClient />
      </AppShell>
    );
  }

  return (
    <AppShell>
      <Card className="pet-gate">
        <div className="pet-gate-head">
          <p className="eyebrow">Pet home</p>
          <Badge tone="unknown">Not live</Badge>
        </div>

        <h1>No pet can be adopted here yet.</h1>
        <p className="lede">
          Adoption, daily care, and confirmed progress all read from a deployed
          registry contract, and none is connected in this build. Rather than
          show a placeholder pet, this page shows nothing — a fictional pet
          here would be indistinguishable from a real one.
        </p>

        <div className="pet-gate-rules">
          <h2>The rules this page will enforce</h2>
          <ul>
            <li>One pet per wallet, starting at Hatchling with 0 points.</li>
            <li>
              One care action per UTC calendar day, adding{" "}
              {GROWTH_POINTS_PER_CARE} growth points.
            </li>
            <li>
              Buddy at {BUDDY_AT} points, Guardian at {GUARDIAN_AT} points. No
              penalty for a missed day.
            </li>
            <li>
              Progress appears only after a transaction is confirmed. A rejected
              or failed transaction awards nothing.
            </li>
          </ul>
        </div>

        <div className="pet-gate-stages">
          <p className="pet-gate-stages-label">What you will grow</p>
          <ol className="pet-gate-stage-list">
            <li>
              <Image src="/pets/hatchling.png" alt="" width={160} height={160} sizes="96px" />
              <strong>Hatchling</strong>
              <span>0 points</span>
            </li>
            <li>
              <Image src="/pets/buddy.png" alt="" width={160} height={160} sizes="96px" />
              <strong>Buddy</strong>
              <span>{BUDDY_AT} points</span>
            </li>
            <li>
              <Image src="/pets/guardian.png" alt="" width={160} height={160} sizes="96px" />
              <strong>Guardian</strong>
              <span>{GUARDIAN_AT} points</span>
            </li>
          </ol>
          <p className="pet-gate-stages-note">
            Illustration of the three stages. This is not a pet and carries no
            live state.
          </p>
        </div>

        <div className="pet-gate-actions">
          <Link className="link-button" href="/">
            Back to the overview
          </Link>
          {isDevelopment ? (
            <Link className="link-button link-button-quiet" href="/dev/pet">
              Open the fictional pet UI preview
            </Link>
          ) : null}
        </div>
      </Card>
    </AppShell>
  );
}
