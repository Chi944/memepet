"use client";

import { useEffect, useMemo } from "react";
import { CarePanel } from "@/components/pet/CarePanel";
import { PetScene } from "@/components/pet/PetScene";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useCommunityStats } from "@/hooks/useCommunityStats";
import { usePetRegistry } from "@/hooks/usePetRegistry";
import { useWallet } from "@/hooks/useWallet";
import { resolveCareActionState } from "@/lib/care-action-machine";

export function PetLiveClient() {
  const wallet = useWallet();
  const registry = usePetRegistry({
    deployment: wallet.deployment,
    address: wallet.address,
    wrongChain: wallet.wrongChain,
    createWalletClient: wallet.createBrowserWalletClient,
  });
  const community = useCommunityStats({
    deployment: wallet.deployment,
    address: wallet.address,
    wrongChain: wallet.wrongChain,
  });

  const dismissTx = registry.dismissTx;
  const refreshCommunity = community.refresh;
  const txKind = registry.txKind;
  const txPhase = registry.txPhase;

  useEffect(() => {
    if (txPhase !== "success") {
      return;
    }

    const timer = window.setTimeout(() => {
      dismissTx();
      if (txKind === "care") {
        refreshCommunity();
      }
    }, 1600);

    return () => window.clearTimeout(timer);
  }, [dismissTx, refreshCommunity, txKind, txPhase]);

  const action = useMemo(
    () =>
      resolveCareActionState({
        walletInstalled: wallet.installed,
        connected: wallet.address !== null,
        wrongChain: wallet.wrongChain,
        readStatus:
          registry.readStatus === "ready"
            ? "idle"
            : registry.readStatus === "loading"
              ? "loading"
              : registry.readStatus === "error"
                ? "error"
                : "idle",
        readErrorMessage: registry.readErrorMessage ?? undefined,
        hasPet: registry.hasPet,
        txPhase: registry.txPhase,
        txKind: registry.txKind,
        transactionHash: registry.transactionHash,
        txErrorMessage: registry.txErrorMessage ?? undefined,
        careEnabled: true,
        cooldownAvailableAtIso: registry.cooldownAvailableAtIso,
      }),
    [
      registry.cooldownAvailableAtIso,
      registry.hasPet,
      registry.readErrorMessage,
      registry.readStatus,
      registry.transactionHash,
      registry.txErrorMessage,
      registry.txKind,
      registry.txPhase,
      wallet.address,
      wallet.installed,
      wallet.wrongChain,
    ],
  );

  const celebrate = registry.celebrateStageUp;

  return (
    <div className="pet-live">
      <Card className="pet-live-status">
        <div className="pet-gate-head">
          <p className="eyebrow">Live pet home</p>
          <Badge tone="live">
            {wallet.deployment.networkName ?? "Configured network"}
          </Badge>
        </div>
        <h1>Your pet</h1>
        <p className="lede">
          Wallet reads, adoption, and daily care talk to the configured
          registry. Growth and community totals update only after a confirmed
          receipt and a successful re-read.
        </p>
        <dl className="pet-live-meta">
          <div>
            <dt>Wallet</dt>
            <dd>
              {!wallet.installed
                ? "Not installed"
                : wallet.address
                  ? wallet.address
                  : "Not connected"}
            </dd>
          </div>
          <div>
            <dt>Chain</dt>
            <dd>
              {wallet.chainId === null
                ? "Unknown"
                : wallet.wrongChain
                  ? `${wallet.chainId} (switch required)`
                  : String(wallet.chainId)}
            </dd>
          </div>
          <div>
            <dt>Pet</dt>
            <dd>
              {registry.readStatus === "loading"
                ? "Reading…"
                : registry.readStatus === "error"
                  ? "Read failed"
                  : registry.hasPet
                    ? "Adopted"
                    : "None yet"}
            </dd>
          </div>
          <div>
            <dt>Community cares</dt>
            <dd>
              {community.community.isLoading
                ? "Reading…"
                : community.community.totalCareActions === null
                  ? "Unknown"
                  : String(community.community.totalCareActions)}
            </dd>
          </div>
        </dl>
        <div className="pet-gate-actions">
          {wallet.address ? (
            <Button tone="secondary" onClick={wallet.disconnect}>
              Disconnect
            </Button>
          ) : (
            <Button onClick={() => void wallet.connect()}>Connect wallet</Button>
          )}
          {wallet.wrongChain ? (
            <Button onClick={() => void wallet.switchNetwork()}>
              Switch network
            </Button>
          ) : null}
          {wallet.address &&
          !wallet.wrongChain &&
          registry.readStatus === "ready" &&
          !registry.hasPet ? (
            <Button
              onClick={() => void registry.adopt()}
              disabled={registry.isSubmitting}
            >
              Adopt pet
            </Button>
          ) : null}
        </div>
        {wallet.errorMessage ? (
          <p className="pet-live-error">{wallet.errorMessage}</p>
        ) : null}
      </Card>

      {registry.hasPet && registry.pet ? (
        <div className="pet-live-grid">
          <PetScene pet={registry.pet} celebrate={celebrate} />
          <CarePanel
            pet={registry.pet}
            action={action}
            onCare={() => void registry.care()}
            onConnect={() => void wallet.connect()}
            onSwitchNetwork={() => void wallet.switchNetwork()}
          />
        </div>
      ) : (
        <div className="pet-live-grid">
          <CarePanel
            pet={null}
            action={action}
            onCare={() => void registry.care()}
            onConnect={() => void wallet.connect()}
            onSwitchNetwork={() => void wallet.switchNetwork()}
          />
        </div>
      )}
    </div>
  );
}