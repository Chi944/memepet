import type { HTMLAttributes } from "react";
import styles from "./ui.module.css";

type CardProps = HTMLAttributes<HTMLElement> & {
  /** "warm" belongs to the pet, "plain" belongs to data surfaces. */
  readonly surface?: "plain" | "warm" | "sunken";
};

export function Card({
  className = "",
  surface = "plain",
  ...props
}: CardProps) {
  return (
    <section
      className={`${styles.card} ${styles[`card-${surface}`]} ${className}`.trim()}
      {...props}
    />
  );
}
