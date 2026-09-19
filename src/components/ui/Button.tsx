import type { ButtonHTMLAttributes } from "react";
import styles from "./ui.module.css";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  readonly tone?: "primary" | "secondary";
};

export function Button({
  className = "",
  tone = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[tone]} ${className}`.trim()}
      type={type}
      {...props}
    />
  );
}
