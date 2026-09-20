import Link from "next/link";
import type { Metadata } from "next";
import { AppShell } from "@/components/ui/AppShell";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { isRegistryConfigured } from "@/lib/deployment";
import {
  BUDDY_AT,
  GROWTH_POINTS_PER_CARE,
  GUARDIAN_AT,
} from "@/lib/pet-progress";

export const metadata: Metadata = {
  title: "Pet home",
};

export default function PetHomePage() {
  const isDevelopment = process.env.NODE_ENV === "development";
  const configured = isRegistryConfigured();

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
          registry contract. {configured
            ? "That contract is configured but wallet connection is not wired up in this build."
            : "No registry is connected in this build."}{" "}
          Rather than show a placeholder pet, this page shows nothing — a
          fictional pet here would be indistinguishable from a real one.
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
