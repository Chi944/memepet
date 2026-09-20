"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  type Address,
  createPublicClient,
  http,
  type Hash,
  type WalletClient,
} from "viem";
import { APPROVED_COMMUNITY_ID } from "@/lib/pet-progress";
import { mapPetOfToViewModel } from "@/lib/map-pet";
import { petRegistryAbi, type PetOfResult } from "@/lib/pet-registry-abi";
import type { Deployment } from "@/lib/deployment";
import { chainFromDeployment } from "@/lib/chains";
import type { PetViewModel } from "@/types/view-models";

export type PetReadStatus = "idle" | "loading" | "ready" | "error";

export type AdoptPhase =
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

export function usePetRegistry({
  deployment,
  address,
  wrongChain,
  createWalletClient,
}: UsePetRegistryArgs) {
  const cacheKey = `${address ?? "none"}:${deployment.chainId ?? "none"}:${deployment.registryAddress ?? "none"}:${wrongChain ? "wrong" : "ok"}`;
  const [activeKey, setActiveKey] = useState(cacheKey);
  const [snapshot, setSnapshot] = useState<PetSnapshot>(emptySnapshot);
  const [adoptPhase, setAdoptPhase] = useState<AdoptPhase>("idle");
  const [transactionHash, setTransactionHash] = useState<string | undefined>();
  const [txErrorMessage, setTxErrorMessage] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState(0);
  const submitLock = useRef(false);

  if (activeKey !== cacheKey) {
    setActiveKey(cacheKey);
    setSnapshot(emptySnapshot);
    setAdoptPhase("idle");
    setTransactionHash(undefined);
    setTxErrorMessage(null);
  }

  const chain = chainFromDeployment(deployment);
  const registryAddress = deployment.registryAddress as Address | null;

  useEffect(() => {
    submitLock.current = false;
  }, [cacheKey]);

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

  const readPet = useCallback(async () => {
    setRefreshToken((value) => value + 1);
  }, []);

  const adopt = useCallback(async () => {
    if (submitLock.current) {
      return;
    }

    if (!address || !registryAddress || !chain || wrongChain) {
      return;
    }

    const walletClient = createWalletClient();
    if (!walletClient) {
      setAdoptPhase("error");
      setTxErrorMessage("Wallet client is unavailable.");
      return;
    }

    submitLock.current = true;
    setTxErrorMessage(null);
    setTransactionHash(undefined);
    setAdoptPhase("awaiting-signature");

    try {
      const publicClient = createPublicClient({
        chain,
        transport: http(deployment.rpcUrl ?? undefined),
      });

      const hash = (await walletClient.writeContract({
        address: registryAddress,
        abi: petRegistryAbi,
        functionName: "adopt",
        args: [APPROVED_COMMUNITY_ID],
        account: address,
        chain,
      })) as Hash;

      setTransactionHash(hash);
      setAdoptPhase("pending");

      const receipt = await publicClient.waitForTransactionReceipt({ hash });

      if (receipt.status !== "success") {
        setAdoptPhase("error");
        setTxErrorMessage(
          "The adoption transaction reverted. No pet was created.",
        );
        submitLock.current = false;
        return;
      }

      setRefreshToken((value) => value + 1);
      setAdoptPhase("success");
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      const rejected =
        /user rejected|denied|rejected the request/i.test(message) ||
        (typeof error === "object" &&
          error !== null &&
          "code" in error &&
          Number((error as { code: number }).code) === 4001);

      if (rejected) {
        setAdoptPhase("rejected");
        setTxErrorMessage(
          "You declined the wallet request. No progress was awarded.",
        );
      } else {
        setAdoptPhase("error");
        setTxErrorMessage(
          message || "Adoption failed. No progress was awarded.",
        );
      }
    } finally {
      submitLock.current = false;
    }
  }, [
    address,
    chain,
    createWalletClient,
    deployment.rpcUrl,
    registryAddress,
    wrongChain,
  ]);

  const readStatusForUi: PetReadStatus =
    address && registryAddress && chain && !wrongChain && snapshot.readStatus === "idle"
      ? "loading"
      : snapshot.readStatus;

  return {
    readStatus: readStatusForUi,
    readErrorMessage: snapshot.readErrorMessage,
    pet: snapshot.pet,
    hasPet: snapshot.hasPet,
    rawPet: snapshot.rawPet,
    adoptPhase,
    transactionHash,
    txErrorMessage,
    adopt,
    refreshPet: readPet,
    isSubmitting:
      adoptPhase === "awaiting-signature" ||
      adoptPhase === "submitting" ||
      adoptPhase === "pending",
  };
}
