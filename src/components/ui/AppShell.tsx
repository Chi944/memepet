import Link from "next/link";
import type { ReactNode } from "react";
import {
  deploymentLabel,
  getActiveDeployment,
  isRegistryConfigured,
} from "@/lib/deployment";
import { Badge } from "./Badge";

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
      <header className="app-bar">
        <Link className="wordmark" href="/">
          <span className="wordmark-glyph" aria-hidden="true">
            ✿
          </span>
          MemePet
        </Link>
        <div className="app-bar-meta">
          <Badge tone={configured ? "live" : "unknown"}>
            {deploymentLabel(deployment)}
          </Badge>
          {actions}
        </div>
      </header>

      <main className="app-main">{children}</main>

      <footer className="app-footer">
        <p>
          Progression comes from participation. MemePet has no token, no
          transfers, and no rewards with financial value.
        </p>
        <p>
          {deployment.status === "not-deployed"
            ? "Contract not deployed in this build."
            : `Registry on ${deployment.networkName}.`}
        </p>
      </footer>
    </div>
  );
}
