"use client";

import { useEffect, useRef } from "react";
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
  const isWaiting =
    action.kind === "awaiting-signature" ||
    action.kind === "submitting" ||
    action.kind === "pending";
  const actionRef = useRef<HTMLDivElement>(null);
  const hadFocus = useRef(false);
  const lastKind = useRef(action.kind);

  // Each state renders a different subtree, so the button the user just
  // activated is unmounted and focus falls to <body>. Most follow-on states
  // are disabled buttons, which cannot take focus, so there is nothing to tab
  // back to. Put focus on the live region instead, but only when it was
  // genuinely lost: if the user has moved focus elsewhere on the page,
  // activeElement is not <body> and we leave it alone.
  useEffect(() => {
    if (lastKind.current === action.kind) {
      return;
    }
    lastKind.current = action.kind;

    if (hadFocus.current && document.activeElement === document.body) {
      actionRef.current?.focus();
    }
  }, [action.kind]);

  let content: React.ReactNode;

  switch (action.kind) {
    case "ready":
      content = (
        <Button size="lg" onClick={onCare}>
          {pet ? `Care for ${pet.displayName}` : "Care for your pet"}
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
          Care is confirmed. Your pet’s progress is up to date.
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
      data-action={action.kind}
    >
      <div className={styles.careHead}>
        <p className={styles.kicker}>Daily care</p>
        <Badge tone={status.tone}>{status.label}</Badge>
      </div>
      <div className={styles.careIcon} aria-hidden="true">
        {action.kind === "success" || action.kind === "cooldown" ? (
          <svg viewBox="0 0 24 24" fill="none">
            <path d="m5 12 4 4L19 6" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 20s-8-4.8-8-10.1A4.9 4.9 0 0 1 12 6a4.9 4.9 0 0 1 8 3.9C20 15.2 12 20 12 20Z" />
          </svg>
        )}
      </div>
      <h2 id="care-heading">Care for your pet</h2>
      {pet ? (
        <p className={styles.careSummary}>
          {pet.nextStageAt === null
            ? `Final stage. ${pet.growthPoints} growth points.`
            : `${pet.growthPoints} growth points. Next stage at ${pet.nextStageAt}.`}
        </p>
      ) : null}
      <div
        ref={actionRef}
        tabIndex={-1}
        className={styles.actionContent}
        aria-live="polite"
        onFocusCapture={() => {
          hadFocus.current = true;
        }}
      >
        {isWaiting ? (
          <span className={styles.waitingIndicator} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        ) : null}
        {content}
      </div>
    </Card>
  );
}
