"use client";

import type { CarePanelProps, CareActionState } from "@/types/view-models";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import styles from "./pet.module.css";

function formatAvailability(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Availability time unavailable";
  }

  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "UTC",
    timeZoneName: "short",
  }).format(date);
}

/** One short status word per state, so the panel always says what it is doing. */
function statusChip(action: CareActionState) {
  switch (action.kind) {
    case "ready":
      return { tone: "live" as const, label: "Ready" };
    case "needs-wallet":
      return { tone: "unknown" as const, label: "Not connected" };
    case "wrong-network":
      return { tone: "preview" as const, label: "Wrong network" };
    case "cooldown":
      return { tone: "neutral" as const, label: "Done today" };
    case "awaiting-signature":
      return { tone: "neutral" as const, label: "In your wallet" };
    case "submitting":
      return { tone: "neutral" as const, label: "Submitting" };
    case "pending":
      return { tone: "neutral" as const, label: "Pending" };
    case "success":
      return { tone: "live" as const, label: "Confirmed" };
    case "error":
      return { tone: "preview" as const, label: "Not awarded" };
    case "unavailable":
      return { tone: "unknown" as const, label: "Unavailable" };
  }
}

export function CarePanel({
  pet,
  action,
  onCare,
  onConnect,
  onSwitchNetwork,
}: CarePanelProps) {
  const status = statusChip(action);
  let content: React.ReactNode;

  switch (action.kind) {
    case "ready":
      content = (
        <Button size="lg" onClick={onCare}>
          Care for {pet.displayName}
        </Button>
      );
      break;
    case "needs-wallet":
      content = (
        <>
          <p>Connect a wallet to adopt and care for a pet.</p>
          <Button size="lg" onClick={onConnect}>
            Connect wallet
          </Button>
        </>
      );
      break;
    case "wrong-network":
      content = (
        <>
          <p>Your wallet is on a different network than the registry.</p>
          <Button size="lg" onClick={onSwitchNetwork}>
            Switch network
          </Button>
        </>
      );
      break;
    case "cooldown":
      content = (
        <>
          <p>Care is available again at {formatAvailability(action.availableAtIso)}.</p>
          <Button size="lg" disabled>
            Care unavailable
          </Button>
        </>
      );
      break;
    case "awaiting-signature":
      content = (
        <>
          <p>Waiting for wallet approval. No progress has been awarded.</p>
          <Button size="lg" disabled>
            Awaiting signature
          </Button>
        </>
      );
      break;
    case "submitting":
      content = (
        <>
          <p>Submitting the care action. Progress is not confirmed yet.</p>
          <Button size="lg" disabled>
            Submitting
          </Button>
        </>
      );
      break;
    case "pending":
      content = (
        <>
          <p>Transaction pending. No progress has been awarded yet.</p>
          <code className={styles.hash}>{action.transactionHash}</code>
          <Button size="lg" disabled>
            Pending confirmation
          </Button>
        </>
      );
      break;
    case "success":
      content = (
        <p className={styles.confirmed}>
          Care is confirmed. Displayed progress comes from the parent state.
        </p>
      );
      break;
    case "error":
      content = (
        <>
          <p className={styles.error}>{action.message}</p>
          <Button size="lg" onClick={onCare}>
            Try care again
          </Button>
        </>
      );
      break;
    case "unavailable":
      content = <p className={styles.error}>{action.message}</p>;
      break;
  }

  return (
    <Card
      surface="warm"
      aria-labelledby="care-heading"
      className={styles.carePanel}
    >
      <div className={styles.careHead}>
        <p className={styles.kicker}>Daily care</p>
        <Badge tone={status.tone}>{status.label}</Badge>
      </div>
      <h2 id="care-heading">Care for your pet</h2>
      <p className={styles.careSummary}>
        {pet.nextStageAt === null
          ? `Final stage. Displayed growth is ${pet.growthPoints} points from the parent.`
          : `${pet.growthPoints} growth points. Next stage at ${pet.nextStageAt}.`}
      </p>
      <div className={styles.actionContent} aria-live="polite">
        {content}
      </div>
    </Card>
  );
}
