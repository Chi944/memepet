import type { ButtonHTMLAttributes } from "react";
import styles from "./ui.module.css";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  readonly tone?: "primary" | "secondary" | "quiet";
  readonly size?: "md" | "lg";
};

export function Button({
  className = "",
  tone = "primary",
  size = "md",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[tone]} ${styles[`size-${size}`]} ${className}`.trim()}
      type={type}
      {...props}
    />
  );
}
