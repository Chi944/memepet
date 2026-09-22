"use client";

import Image from "next/image";
import { useState } from "react";
import type { LandingHeroProps } from "@/types/view-models";
import { BUDDY_AT, GUARDIAN_AT } from "@/lib/pet-progress";
import { Button } from "@/components/ui/Button";
import styles from "./landing.module.css";

const STAGES = [
  { name: "Hatchling", asset: "hatchling", at: 0, description: "Every friendship starts somewhere." },
  { name: "Buddy", asset: "buddy", at: BUDDY_AT, description: "A little care goes a long way." },
  { name: "Guardian", asset: "guardian", at: GUARDIAN_AT, description: "Small moments. A lasting bond." },
] as const;

export function LandingHero({ onGetStarted }: LandingHeroProps) {
  const [selected, setSelected] = useState(0);
  const stage = STAGES[selected];

  return (
    <section className={styles.hero} aria-labelledby="landing-title">
      <div className={styles.copy}>
        <p className={styles.kicker}><span aria-hidden="true" />A companion for meme communities</p>
        <h1 id="landing-title">Adopt the meme. Grow the community.</h1>
        <p className={styles.blurb}>
          Adopt a meme-community mascot. A little daily care grows your pet
          and brings your community&apos;s shared habitat to life.
        </p>
        <div className={styles.actions}>
          <Button size="lg" onClick={onGetStarted}>Meet your pet <span aria-hidden="true">↗</span></Button>
          <a className={styles.secondaryAction} href="#how-it-works">How it works <span aria-hidden="true">↓</span></a>
        </div>
        <p className={styles.actionNote}>No token to buy. Just show up. Network gas applies.</p>
      </div>

      <div className={styles.showcase}>
        <div className={styles.showcaseHeader}>
          <span>Meet Mochi</span>
          <span className={styles.artLabel}>Stage artwork</span>
        </div>
        <div className={styles.artFrame}>
          <div className={styles.orbit} aria-hidden="true" />
          <div className={styles.artEnter} key={stage.asset}>
            <Image className={styles.art} src={`/pets/${stage.asset}.png`}
              alt={`Mochi, the MemePet ${stage.asset} mascot`}
              width={1024} height={1024} sizes="(max-width: 800px) 85vw, 32rem" priority={selected === 0} />
          </div>
          <span className={styles.artCross} aria-hidden="true">+</span>
          <span className={styles.artCrossBottom} aria-hidden="true">+</span>
        </div>
        <div className={styles.stageDescription} aria-live="polite" aria-atomic="true">
          <h2>{stage.name}</h2>
          <p>{stage.description}</p>
        </div>
        <div className={styles.stageRail} role="group" aria-label="Explore growth stages">
          {STAGES.map((item, index) => (
            <button key={item.asset} type="button" aria-pressed={selected === index}
              className={selected === index ? styles.stageNow : styles.stageNext}
              onClick={() => setSelected(index)}>
              <span>{item.name}</span><small>{item.at} points</small>
            </button>
          ))}
        </div>
        <p className={styles.previewNote}>Explore the stages. Your pet&apos;s progress comes from confirmed care.</p>
      </div>
      <div className={styles.ruleStrip} aria-label="Pet care rules">
        <div><strong>One wallet.</strong><span>One companion of your own.</span></div>
        <div><strong>A daily ritual.</strong><span>Care once per UTC day.</span></div>
        <div><strong>Grow together.</strong><span>Every care helps the community.</span></div>
      </div>
    </section>
  );
}
