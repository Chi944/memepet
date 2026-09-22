import Link from "next/link";
import type { ReactNode } from "react";
import {
  deploymentLabel,
  getActiveDeployment,
  isRegistryConfigured,
} from "@/lib/deployment";
import { Badge } from "./Badge";
import { AppNavigation } from "./AppNavigation";

type AppShellProps = {
  readonly children: ReactNode;
  /** Rendered at the end of the app bar, after the environment chip. */
  readonly actions?: ReactNode;
};

/** Page frame: wordmark, honest environment chip, content, footer. */
export function AppShell({ children, actions }: AppShellProps) {
  const deployment = getActiveDeployment();
  const configured = isRegistryConfigured(deployment);

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="app-bar">
        <Link className="wordmark" href="/">
          <span className="wordmark-glyph" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none">
              <path d="M6 4h6v6h8V4h6v20h-4v4H10v-4H6V4Z" fill="currentColor" />
              <path d="M11 15h3v4h-3zm7 0h3v4h-3z" fill="var(--ground)" />
            </svg>
          </span>
          MemePet
        </Link>
        <AppNavigation />
        <div className="app-bar-meta">
          <Badge tone={configured ? "live" : "unknown"}>
            {deploymentLabel(deployment)}
          </Badge>
          {actions}
        </div>
      </header>

      <main className="app-main" id="main" tabIndex={-1}>
        {children}
      </main>

      <footer className="app-footer">
        <div className="footer-brand">
          <strong>MemePet</strong>
          <span>A little care. A shared world.</span>
        </div>
        <p>
          Growth through participation. No MemePet token or financial rewards.
        </p>
        <p>
          {deployment.status === "not-deployed"
            ? "Contract not deployed in this build."
            : `Registry on ${deployment.networkName}.`}
        </p>
        <a href="https://github.com/Chi944/memepet" target="_blank" rel="noreferrer">
          View source <span aria-hidden="true">↗</span>
        </a>
      </footer>
    </div>
  );
}
