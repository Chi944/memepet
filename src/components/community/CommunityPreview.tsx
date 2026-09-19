"use client";

import { useState } from "react";
import { communityFixtures } from "@/fixtures/ui-fixtures";
import { Card } from "@/components/ui/Card";
import { CommunityPanel } from "./CommunityPanel";
import styles from "./community.module.css";

type CommunityFixtureKey = keyof typeof communityFixtures;

const fixtureLabels: Record<CommunityFixtureKey, string> = {
  loading: "Loading",
  empty: "Zero activity",
  growing: "Growing",
  reached: "Achieved",
  error: "Unavailable",
  unknownTarget: "Unknown target",
};

export function CommunityPreview() {
  const [fixtureKey, setFixtureKey] =
    useState<CommunityFixtureKey>("loading");

  return (
    <main className={styles.previewPage}>
      <header className={styles.previewHeader}>
        <p className={styles.previewBadge}>UI preview — fictional data</p>
        <h1>Community component preview</h1>
        <p>
          Select a centralized fixture to inspect loading, zero, progress,
          achieved, unavailable, and unknown-target meanings.
        </p>
      </header>

      <Card className={styles.controls} aria-label="Community preview controls">
        <label>
          Community state fixture
          <select
            value={fixtureKey}
            onChange={(event) =>
              setFixtureKey(event.target.value as CommunityFixtureKey)
            }
          >
            {(Object.keys(communityFixtures) as CommunityFixtureKey[]).map(
              (key) => (
                <option key={key} value={key}>
                  {fixtureLabels[key]}
                </option>
              ),
            )}
          </select>
        </label>
      </Card>

      <CommunityPanel community={communityFixtures[fixtureKey]} />
    </main>
  );
}
