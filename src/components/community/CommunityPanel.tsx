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

  const canShowTotal =
    knownTotal && !community.isLoading && !community.errorMessage;
  const total = canShowTotal ? (community.totalCareActions as number) : null;
  const target = validTarget ? (community.milestoneTarget as number) : null;
  const percentage =
    target === null || total === null
      ? null
      : Math.min(100, Math.max(0, (total / target) * 100));
  const progressStyle =
    percentage === null
      ? undefined
      : ({ "--community-progress": `${percentage}%` } as CSSProperties);
  const achieved = target !== null && total !== null && total >= target;

  return (
    <Card
      className={styles.panel}
      aria-live="polite"
      aria-busy={community.isLoading}
    >
      <header className={styles.head}>
        <p className={styles.kicker}>Community habitat</p>
        <DataModeBadge mode={community.dataMode} isKnown={Boolean(canShowTotal)} />
      </header>
      <div className={styles.body}>
        <div className={styles.intro}>
          <h2>{community.name}</h2>
          <p className={styles.note}>
            Every confirmed care contributes to our shared progress.
          </p>
        </div>

        {total !== null ? (
          <>
            <p className={styles.total}>
              Care actions: <strong>{total}</strong>
            </p>
            <div className={styles.milestone}>
              <p className={styles.milestoneLabel}>
                {achieved ? "Growing together" : "Our next milestone"}
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
            </div>
          </>
        ) : (
          <div className={styles.state}>
            {community.isLoading ? (
              <>
                <p className={styles.stateLabel}>Loading community progress…</p>
                <div className={styles.trackPending} aria-hidden="true" />
              </>
            ) : community.errorMessage ? (
              <>
                <p className={styles.error}>{community.errorMessage}</p>
                <div className={styles.trackUnknown} aria-hidden="true" />
                <p className={styles.note}>
                  Live progress is unavailable; no fictional total is shown.
                </p>
              </>
            ) : (
              <>
                <p className={styles.unknown}>Care actions: Unknown</p>
                {/* Hatched, never an empty fill: unknown must not look like zero. */}
                <div className={styles.trackUnknown} aria-hidden="true" />
                <p className={styles.note}>
                  A count appears here once a registry read succeeds.
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
