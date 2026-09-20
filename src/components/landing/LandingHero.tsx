"use client";

import Image from "next/image";
import type { LandingHeroProps } from "@/types/view-models";
import { Button } from "@/components/ui/Button";
import styles from "./landing.module.css";

/** The three stages, named on the hero so the goal is visible immediately. */
const STAGES = ["Hatchling", "Buddy", "Guardian"] as const;

export function LandingHero({ onGetStarted }: LandingHeroProps) {
  return (
    <section className={styles.hero} aria-labelledby="landing-title">
      <div className={styles.copy}>
        <p className={styles.kicker}>A companion for meme communities</p>
        <h1 id="landing-title">Adopt the meme. Grow the community.</h1>
        <p className={styles.blurb}>
          Adopt a meme-community mascot, care for it each day, and add to
          shared habitat progress. Growth comes from participation, not from
          spending a token.
        </p>
        <div className={styles.actions}>
          <Button size="lg" onClick={onGetStarted}>
            Meet your pet
          </Button>
          <p className={styles.actionNote}>
            No token approvals. No transfers. One care action a day.
          </p>
        </div>
      </div>

      <div className={styles.artColumn}>
        <div className={styles.artFrame}>
          <Image
            className={styles.art}
            src="/pets/hatchling.png"
            alt="Mochi, the MemePet hatchling mascot"
            width={1024}
            height={1024}
            sizes="(max-width: 760px) 78vw, 26rem"
            priority
          />
        </div>
        <ol className={styles.stageRail} aria-label="Growth stages">
          {STAGES.map((stage, index) => (
            <li
              key={stage}
              className={index === 0 ? styles.stageNow : styles.stageNext}
            >
              {stage}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
