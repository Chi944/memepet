import Image from "next/image";
import type { CSSProperties } from "react";
import type { PetSceneProps, PetStage } from "@/types/view-models";
import styles from "./pet.module.css";

const STAGE_LABEL: Record<PetStage, string> = {
  hatchling: "Hatchling",
  buddy: "Buddy",
  guardian: "Guardian",
};

function getProgress(growthPoints: number, nextStageAt: number | null) {
  if (nextStageAt === null) {
    return null;
  }

  if (
    !Number.isFinite(growthPoints) ||
    !Number.isFinite(nextStageAt) ||
    nextStageAt <= 0
  ) {
    return undefined;
  }

  return Math.min(100, Math.max(0, (growthPoints / nextStageAt) * 100));
}

export function PetScene({ pet, celebrate }: PetSceneProps) {
  const progress = getProgress(pet.growthPoints, pet.nextStageAt);
  const progressStyle =
    typeof progress === "number"
      ? ({ "--pet-progress": `${progress}%` } as CSSProperties)
      : undefined;

  return (
    <section className={styles.scene} aria-labelledby="pet-name">
      <div
        className={`${styles.artFrame} ${styles.idle} ${celebrate ? styles.celebrating : ""}`}
      >
        {pet.artSrc ? (
          <Image
            className={styles.art}
            src={pet.artSrc}
            alt={`${pet.displayName}, the ${pet.stage} pet`}
            width={480}
            height={480}
            priority
          />
        ) : (
          <div
            className={styles.placeholder}
            role="img"
            aria-label={`${pet.displayName} artwork placeholder`}
          >
            <span aria-hidden="true">✦</span>
            <strong>Pet artwork coming soon</strong>
          </div>
        )}
        {celebrate ? (
          <span className={styles.celebration} aria-label="Celebration active">
            Confirmed celebration
          </span>
        ) : null}
      </div>

      <div className={styles.sceneDetails}>
        <p className={styles.kicker}>{pet.communityName}</p>
        <h2 id="pet-name">{pet.displayName}</h2>
        <p className={styles.stageLabel}>Stage: {STAGE_LABEL[pet.stage]}</p>
        <p>{pet.growthPoints} growth points</p>

        {progress === null ? (
          <p className={styles.finalStage}>
            {STAGE_LABEL[pet.stage]} is the final stage.
          </p>
        ) : typeof progress === "number" ? (
          <div className={styles.progressGroup}>
            <div
              className={styles.progressTrack}
              role="progressbar"
              aria-label="Growth toward next stage"
              aria-valuemin={0}
              aria-valuemax={pet.nextStageAt ?? undefined}
              aria-valuenow={pet.growthPoints}
            >
              <span className={styles.progressFill} style={progressStyle} />
            </div>
            <p>{pet.nextStageAt} points needed for the next stage.</p>
          </div>
        ) : (
          <p className={styles.unavailable}>Next-stage target unavailable.</p>
        )}
      </div>
    </section>
  );
}
