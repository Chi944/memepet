"use client";

import type { LandingHeroProps } from "@/types/view-models";
import { Button } from "@/components/ui/Button";
import styles from "./landing.module.css";

export function LandingHero({ onGetStarted }: LandingHeroProps) {
  return (
    <section className={styles.hero} aria-labelledby="landing-title">
      <div className={styles.copy}>
        <p className={styles.kicker}>MemePet</p>
        <h1 id="landing-title">Adopt the meme. Grow the community.</h1>
        <p>
          A future community companion experience where people can adopt a
          mascot, care for it, and contribute to shared progress.
        </p>
        <Button onClick={onGetStarted}>Meet your pet</Button>
      </div>
      <div
        className={styles.artPlaceholder}
        role="img"
        aria-label="MemePet mascot artwork placeholder"
      >
        <span aria-hidden="true">✦</span>
        <strong>Approved mascot art will appear here</strong>
      </div>
    </section>
  );
}
