import type { CSSProperties } from "react";
import type { CommunityPanelProps } from "@/types/view-models";
import { Card } from "@/components/ui/Card";
import { DataModeBadge } from "@/components/ui/Badge";
import styles from "./community.module.css";

export function CommunityPanel({ community }: CommunityPanelProps) {
  const validTarget =
    community.milestoneTarget !== null &&
    Number.isFinite(community.milestoneTarget) &&
    community.milestoneTarget > 0;
  const knownTotal =
    community.totalCareActions !== null &&
    Number.isFinite(community.totalCareActions) &&
    community.totalCareActions >= 0;

  if (community.isLoading) {
    return (
      <Card className={styles.panel} aria-live="polite" aria-busy="true">
        <header className={styles.head}>
          <p className={styles.kicker}>Community habitat</p>
          <DataModeBadge mode={community.dataMode} isKnown={false} />
        </header>
        <h2>{community.name}</h2>
        <p>Loading community progress…</p>
        <div className={styles.trackPending} aria-hidden="true" />
      </Card>
    );
  }

  if (community.errorMessage) {
    return (
      <Card className={styles.panel} role="status">
        <header className={styles.head}>
          <p className={styles.kicker}>Community habitat</p>
          <DataModeBadge mode={community.dataMode} isKnown={false} />
        </header>
        <h2>{community.name}</h2>
        <p className={styles.error}>{community.errorMessage}</p>
        <p>Live progress is unavailable; no fictional total is shown.</p>
        <div className={styles.trackUnknown} aria-hidden="true" />
      </Card>
    );
  }

  if (!knownTotal) {
    return (
      <Card className={styles.panel}>
        <header className={styles.head}>
          <p className={styles.kicker}>Community habitat</p>
          <DataModeBadge mode={community.dataMode} isKnown={false} />
        </header>
        <h2>{community.name}</h2>
        <p className={styles.unknown}>Care actions: Unknown</p>
        {/* Hatched, never an empty fill: unknown must not look like zero. */}
        <div className={styles.trackUnknown} aria-hidden="true" />
        <p className={styles.note}>
          A count appears here once a registry read succeeds.
        </p>
      </Card>
    );
  }

  const total = community.totalCareActions as number;
  const target = validTarget ? (community.milestoneTarget as number) : null;
  const percentage =
    target === null ? null : Math.min(100, Math.max(0, (total / target) * 100));
  const progressStyle =
    percentage === null
      ? undefined
      : ({ "--community-progress": `${percentage}%` } as CSSProperties);
  const achieved = target !== null && total >= target;

  return (
    <Card className={styles.panel}>
      <header className={styles.head}>
        <p className={styles.kicker}>Community habitat</p>
        <DataModeBadge mode={community.dataMode} />
      </header>
      <h2>{community.name}</h2>
      <p className={styles.total}>
        Care actions: <strong>{total}</strong>
      </p>

      {target === null ? (
        <>
          <div className={styles.trackUnknown} aria-hidden="true" />
          <p className={styles.unknown}>
            Milestone target unavailable. No percentage can be calculated.
          </p>
        </>
      ) : (
        <>
          <div
            className={`${styles.progressTrack} ${achieved ? styles.progressAchieved : ""}`.trim()}
            role="progressbar"
            aria-label="Community milestone progress"
            aria-valuemin={0}
            aria-valuemax={target}
            aria-valuenow={Math.min(total, target)}
            aria-valuetext={`${total} care actions toward a target of ${target}`}
          >
            <span className={styles.progressFill} style={progressStyle} />
          </div>
          <p className={styles.target}>
            Target: {target} care actions
            {achieved ? " — milestone achieved" : ""}
          </p>
        </>
      )}
    </Card>
  );
}
