import type { HTMLAttributes } from "react";
import type { DataMode } from "@/types/view-models";
import styles from "./ui.module.css";

export type BadgeTone = "live" | "preview" | "unknown" | "neutral";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  readonly tone?: BadgeTone;
};

/** Small provenance chip. Every number in MemePet says where it came from. */
export function Badge({
  className = "",
  tone = "neutral",
  ...props
}: BadgeProps) {
  return (
    <span
      className={`${styles.badge} ${styles[`badge-${tone}`]} ${className}`.trim()}
      {...props}
    />
  );
}

type DataModeBadgeProps = {
  /** "live" reads from chain, "fixture" is labelled preview data. */
  readonly mode: DataMode;
  /** Set when a live surface has no value to show yet. */
  readonly isKnown?: boolean;
};

/**
 * Renders the `dataMode` already carried by every view model so a viewer can
 * always tell confirmed chain state from preview data.
 */
export function DataModeBadge({ mode, isKnown = true }: DataModeBadgeProps) {
  if (mode === "fixture") {
    return (
      <Badge tone="preview" title="Fictional data used for development previews">
        Preview data
      </Badge>
    );
  }

  if (!isKnown) {
    return (
      <Badge tone="unknown" title="No confirmed value has been read yet">
        Unknown
      </Badge>
    );
  }

  return (
    <Badge tone="live" title="Read from the declared deployment">
      Live
    </Badge>
  );
}
