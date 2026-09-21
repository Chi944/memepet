"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  type Address,
  createPublicClient,
  http,
  type Hash,
  type WalletClient,
} from "viem";
import { careCooldownAvailableAtIso } from "@/lib/care-cooldown";
import { APPROVED_COMMUNITY_ID } from "@/lib/pet-progress";
import { mapPetOfToViewModel } from "@/lib/map-pet";
import { petRegistryAbi, type PetOfResult } from "@/lib/pet-registry-abi";
import type { Deployment } from "@/lib/deployment";
import { chainFromDeployment } from "@/lib/chains";
import type { PetStage, PetViewModel } from "@/types/view-models";

export type PetReadStatus = "idle" | "loading" | "ready" | "error";

export type TxPhase =
  | "idle"
  | "awaiting-signature"
  | "submitting"
  | "pending"
  | "success"
  | "error"
  | "rejected";

type UsePetRegistryArgs = {
  readonly deployment: Deployment;
  readonly address: Address | null;
  readonly wrongChain: boolean;
  readonly createWalletClient: () => WalletClient | null;
};

type PetSnapshot = {
  readonly readStatus: PetReadStatus;
  readonly readErrorMessage: string | null;
  readonly pet: PetViewModel | null;
  readonly hasPet: boolean;
  readonly rawPet: PetOfResult | null;
};

const emptySnapshot: PetSnapshot = {
  readStatus: "idle",
  readErrorMessage: null,
  pet: null,
  hasPet: false,
  rawPet: null,
};

function isUserRejection(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return (
    /user rejected|denied|rejected the request/i.test(message) ||
    (typeof error === "object" &&
      error !== null &&
      "code" in error &&
      Number((error as { code: number }).code) === 4001)
  );
}

export function usePetRegistry({
  deployment,
  address,
  wrongChain,
  createWalletClient,
}: UsePetRegistryArgs) {
  const cacheKey = `${address ?? "none"}:${deployment.chainId ?? "none"}:${deployment.registryAddress ?? "none"}:${wrongChain ? "wrong" : "ok"}`;
  const [activeKey, setActiveKey] = useState(cacheKey);
  const [snapshot, setSnapshot] = useState<PetSnapshot>(emptySnapshot);
  const [txPhase, setTxPhase] = useState<TxPhase>("idle");
  const [txKind, setTxKind] = useState<"idle" | "adopt" | "care">("idle");
  const [transactionHash, setTransactionHash] = useState<string | undefined>();
  const [txErrorMessage, setTxErrorMessage] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState(0);
  const [celebrateStageUp, setCelebrateStageUp] = useState(false);
  const [nowMs, setNowMs] = useState(() => Date.now());
  const submitLock = useRef(false);
  const stageBeforeCare = useRef<PetStage | null>(null);

  if (activeKey !== cacheKey) {
    setActiveKey(cacheKey);
    setSnapshot(emptySnapshot);
    setTxPhase("idle");
    setTxKind("idle");
    setTransactionHash(undefined);
    setTxErrorMessage(null);
    setCelebrateStageUp(false);
  }

  // chainFromDeployment builds a fresh object for any chain id outside X Layer,
  // and this value is an effect dependency: an unstable identity re-fires the
  // read on every render. getActiveDeployment is now cached, so this is stable.
  const chain = useMemo(() => chainFromDeployment(deployment), [deployment]);
  const registryAddress = deployment.registryAddress as Address | null;

  // Read during async writes to detect a wallet/chain switch mid-flight.
  const cacheKeyRef = useRef(cacheKey);

  useEffect(() => {
    cacheKeyRef.current = cacheKey;
    submitLock.current = false;
    stageBeforeCare.current = null;
  }, [cacheKey]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setNowMs(Date.now());
    }, 30_000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (!address || !registryAddress || !chain || wrongChain) {
      return;
    }

    let cancelled = false;

    void (async () => {
      try {
        const publicClient = createPublicClient({
          chain,
          transport: http(deployment.rpcUrl ?? undefined),
        });

        const result = await publicClient.readContract({
          address: registryAddress,
          abi: petRegistryAbi,
          functionName: "petOf",
          args: [address],
        });

        if (cancelled) {
          return;
        }

        const mappedRaw: PetOfResult = {
          exists: result[0],
          communityId: result[1],
          careCount: result[2],
          lastCareDay: result[3],
        };
        const mapped = mapPetOfToViewModel(mappedRaw);

        setSnapshot({
          readStatus: "ready",
          readErrorMessage: null,
          rawPet: mappedRaw,
          hasPet: mapped.kind === "pet",
          pet: mapped.kind === "pet" ? mapped.pet : null,
        });
      } catch {
        if (cancelled) {
          return;
        }

        setSnapshot({
          readStatus: "error",
          readErrorMessage:
            "Pet data could not be loaded. No preview data is shown.",
          pet: null,
          hasPet: false,
          rawPet: null,
        });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [
    address,
    chain,
    deployment.rpcUrl,
    registryAddress,
    refreshToken,
    wrongChain,
  ]);

  const cooldownAvailableAtIso =
    snapshot.rawPet && snapshot.rawPet.exists
      ? careCooldownAvailableAtIso({
          careCount: Number(snapshot.rawPet.careCount),
          lastCareDay: snapshot.rawPet.lastCareDay,
          nowMs,
        })
      : null;

  const refreshPet = useCallback(async () => {
    setRefreshToken((value) => value + 1);
  }, []);

  const dismissTx = useCallback(() => {
    setTxPhase("idle");
    setTxKind("idle");
    setTransactionHash(undefined);
    setTxErrorMessage(null);
  }, []);

  const runWrite = useCallback(
    async (kind: "adopt" | "care") => {
      if (submitLock.current) {
        return;
      }

      if (!address || !registryAddress || !chain || wrongChain) {
        return;
      }

      if (kind === "care" && cooldownAvailableAtIso) {
        setTxKind("care");
        setTxPhase("error");
        setTxErrorMessage(
          `Care is available again at ${cooldownAvailableAtIso} (UTC). No transaction was sent.`,
        );
        return;
      }

      const walletClient = createWalletClient();
      if (!walletClient) {
        setTxKind(kind);
        setTxPhase("error");
        setTxErrorMessage("Wallet client is unavailable.");
        return;
      }

      const keyAtStart = cacheKeyRef.current;

      submitLock.current = true;
      setCelebrateStageUp(false);
      setTxErrorMessage(null);
      setTransactionHash(undefined);
      setTxKind(kind);
      setTxPhase("awaiting-signature");

      if (kind === "care") {
        stageBeforeCare.current = snapshot.pet?.stage ?? null;
      } else {
        stageBeforeCare.current = null;
      }

      try {
        const publicClient = createPublicClient({
          chain,
          transport: http(deployment.rpcUrl ?? undefined),
        });

        const hash = (await walletClient.writeContract(
          kind === "adopt"
            ? {
                address: registryAddress,
                abi: petRegistryAbi,
                functionName: "adopt",
                args: [APPROVED_COMMUNITY_ID],
                account: address,
                chain,
              }
            : {
                address: registryAddress,
                abi: petRegistryAbi,
                functionName: "care",
                account: address,
                chain,
              },
        )) as Hash;

        setTransactionHash(hash);
        setTxPhase("pending");

        const receipt = await publicClient.waitForTransactionReceipt({ hash });

        if (receipt.status !== "success") {
          setTxPhase("error");
          setTxErrorMessage(
            kind === "adopt"
              ? "The adoption transaction reverted. No pet was created."
              : "The care transaction reverted. No progress was awarded.",
          );
          submitLock.current = false;
          return;
        }

        // The wallet or chain changed while this write was in flight: the
        // result belongs to the previous identity and must not be shown.
        if (cacheKeyRef.current !== keyAtStart) {
          return;
        }

        // Re-read before treating the write as success. A hash alone is not enough.
        let result;
        try {
          result = await publicClient.readContract({
            address: registryAddress,
            abi: petRegistryAbi,
            functionName: "petOf",
            args: [address],
          });
        } catch {
          // The receipt already confirmed success, so the write DID land. Say
          // so, and mark the display as stale rather than claiming failure.
          if (cacheKeyRef.current !== keyAtStart) {
            return;
          }
          setSnapshot((previous) => ({
            ...previous,
            readStatus: "error",
            readErrorMessage:
              kind === "adopt"
                ? "Adoption confirmed on chain, but refreshing the pet failed. The displayed state may be out of date."
                : "Care confirmed on chain, but refreshing the pet failed. The displayed progress may be out of date.",
          }));
          setTxPhase("success");
          return;
        }

        if (cacheKeyRef.current !== keyAtStart) {
          return;
        }

        const mappedRaw: PetOfResult = {
          exists: result[0],
          communityId: result[1],
          careCount: result[2],
          lastCareDay: result[3],
        };
        const mapped = mapPetOfToViewModel(mappedRaw);

        setSnapshot({
          readStatus: "ready",
          readErrorMessage: null,
          rawPet: mappedRaw,
          hasPet: mapped.kind === "pet",
          pet: mapped.kind === "pet" ? mapped.pet : null,
        });
        setNowMs(Date.now());

        if (
          kind === "care" &&
          mapped.kind === "pet" &&
          stageBeforeCare.current !== null &&
          mapped.pet.stage !== stageBeforeCare.current
        ) {
          setCelebrateStageUp(true);
        }

        setTxPhase("success");
        setRefreshToken((value) => value + 1);
      } catch (error) {
        if (cacheKeyRef.current !== keyAtStart) {
          return;
        }

        if (isUserRejection(error)) {
          setTxPhase("rejected");
          setTxErrorMessage(
            "You declined the wallet request. No progress was awarded.",
          );
        } else {
          const message = error instanceof Error ? error.message : String(error);
          setTxPhase("error");
          setTxErrorMessage(
            message ||
              (kind === "adopt"
                ? "Adoption failed. No progress was awarded."
                : "Care failed. No progress was awarded."),
          );
        }
      } finally {
        submitLock.current = false;
      }
    },
    [
      address,
      chain,
      cooldownAvailableAtIso,
      createWalletClient,
      deployment.rpcUrl,
      registryAddress,
      snapshot.pet?.stage,
      wrongChain,
    ],
  );

  const adopt = useCallback(async () => {
    await runWrite("adopt");
  }, [runWrite]);

  const care = useCallback(async () => {
    await runWrite("care");
  }, [runWrite]);

  const readStatusForUi: PetReadStatus =
    address &&
    registryAddress &&
    chain &&
    !wrongChain &&
    snapshot.readStatus === "idle"
      ? "loading"
      : snapshot.readStatus;

  const isSubmitting =
    txPhase === "awaiting-signature" ||
    txPhase === "submitting" ||
    txPhase === "pending";

  return {
    readStatus: readStatusForUi,
    readErrorMessage: snapshot.readErrorMessage,
    pet: snapshot.pet,
    hasPet: snapshot.hasPet,
    rawPet: snapshot.rawPet,
    txPhase,
    txKind,
    transactionHash,
    txErrorMessage,
    cooldownAvailableAtIso,
    celebrateStageUp,
    adopt,
    care,
    dismissTx,
    refreshPet,
    isSubmitting,
    adoptPhase: txPhase,
  };
}