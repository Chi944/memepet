"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { LandingHero } from "./LandingHero";
import styles from "./landing.module.css";

export function LandingPreview() {
  const [getStartedCount, setGetStartedCount] = useState(0);

  return (
    <main className={styles.previewPage}>
      <header className={styles.previewHeader}>
        <p className={styles.previewBadge}>UI preview — fictional data</p>
        <h1>Landing component preview</h1>
        <p>
          The action below only increments a local callback counter. It does
          not connect a wallet or start adoption.
        </p>
      </header>

      <LandingHero
        onGetStarted={() => setGetStartedCount((count) => count + 1)}
      />

      <Card className={styles.counter} aria-label="Callback counter">
        <h2>Local callback counter</h2>
        <p>
          onGetStarted: <strong>{getStartedCount}</strong>
        </p>
      </Card>
    </main>
  );
}
