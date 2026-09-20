"use client";

import Image from "next/image";
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
          Adopt a meme-community mascot, care for it each day, and add to
          shared habitat progress. Growth comes from participation, not from
          spending a token.
        </p>
        <Button onClick={onGetStarted}>Meet your pet</Button>
      </div>
      <div className={styles.artFrame}>
        <Image
          className={styles.art}
          src="/pets/hatchling.png"
          alt="Mochi, the MemePet hatchling mascot"
          width={1024}
          height={1024}
          priority
        />
      </div>
    </section>
  );
}
