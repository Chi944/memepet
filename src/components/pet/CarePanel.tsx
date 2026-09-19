"use client";

import type { CarePanelProps } from "@/types/view-models";
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

export function CarePanel({
  pet,
  action,
  onCare,
  onConnect,
  onSwitchNetwork,
}: CarePanelProps) {
  let content: React.ReactNode;

  switch (action.kind) {
    case "ready":
      content = <Button onClick={onCare}>Care for {pet.displayName}</Button>;
      break;
    case "needs-wallet":
      content = <Button onClick={onConnect}>Connect wallet</Button>;
      break;
    case "wrong-network":
      content = <Button onClick={onSwitchNetwork}>Switch network</Button>;
      break;
    case "cooldown":
      content = (
        <>
          <p>Care is available again at {formatAvailability(action.availableAtIso)}.</p>
          <Button disabled>Care unavailable</Button>
        </>
      );
      break;
    case "awaiting-signature":
      content = (
        <>
          <p>Waiting for wallet approval. No progress has been awarded.</p>
          <Button disabled>Awaiting signature</Button>
        </>
      );
      break;
    case "submitting":
      content = (
        <>
          <p>Submitting the care action. Progress is not confirmed yet.</p>
          <Button disabled>Submitting</Button>
        </>
      );
      break;
    case "pending":
      content = (
        <>
          <p>Transaction pending. No progress has been awarded yet.</p>
          <code className={styles.hash}>{action.transactionHash}</code>
          <Button disabled>Pending confirmation</Button>
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
          <Button onClick={onCare}>Try care again</Button>
        </>
      );
      break;
    case "unavailable":
      content = <p className={styles.error}>{action.message}</p>;
      break;
  }

  return (
    <Card aria-labelledby="care-heading" className={styles.carePanel}>
      <p className={styles.kicker}>Daily care presentation</p>
      <h2 id="care-heading">Care for your pet</h2>
      <div className={styles.actionContent}>{content}</div>
    </Card>
  );
}
