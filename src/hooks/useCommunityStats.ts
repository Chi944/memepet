"use client";

import { useCallback, useEffect, useState } from "react";
import { type Address, createPublicClient, http } from "viem";
import { chainFromDeployment } from "@/lib/chains";
import type { Deployment } from "@/lib/deployment";
import {
  mapCommunityStatsFailureToViewModel,
  mapCommunityStatsToViewModel,
  unknownCommunityViewModel,
} from "@/lib/map-community";
import { APPROVED_COMMUNITY_ID } from "@/lib/pet-progress";
import { petRegistryAbi } from "@/lib/pet-registry-abi";
import type { CommunityViewModel } from "@/types/view-models";

type UseCommunityStatsArgs = {
  readonly deployment: Deployment;
  /** Included in the cache key so account switches drop stale community reads. */
  readonly address: Address | null;
  readonly wrongChain: boolean;
};

export function useCommunityStats({
  deployment,
  address,
  wrongChain,
}: UseCommunityStatsArgs) {
  const cacheKey = `${address ?? "none"}:${deployment.chainId ?? "none"}:${deployment.registryAddress ?? "none"}:${wrongChain ? "wrong" : "ok"}`;
  const [activeKey, setActiveKey] = useState(cacheKey);
  const [community, setCommunity] = useState<CommunityViewModel>(() =>
    unknownCommunityViewModel({ isLoading: true }),
  );
  const [refreshToken, setRefreshToken] = useState(0);

  if (activeKey !== cacheKey) {
    setActiveKey(cacheKey);
    setCommunity(
      unknownCommunityViewModel({
        isLoading: Boolean(deployment.registryAddress) && !wrongChain,
        errorMessage: wrongChain
          ? "Community total is unavailable on this network."
          : null,
      }),
    );
  }

  const chain = chainFromDeployment(deployment);
  const registryAddress = deployment.registryAddress as Address | null;
  const canRead = Boolean(registryAddress && chain && !wrongChain);

  useEffect(() => {
    if (!canRead || !registryAddress || !chain) {
      return;
    }

    let cancelled = false;

    void (async () => {
      try {
        const publicClient = createPublicClient({
          chain,
          transport: http(deployment.rpcUrl ?? undefined),
        });

        const total = await publicClient.readContract({
          address: registryAddress,
          abi: petRegistryAbi,
          functionName: "communityStats",
          args: [APPROVED_COMMUNITY_ID],
        });

        if (!cancelled) {
          setCommunity(mapCommunityStatsToViewModel(total));
        }
      } catch (error) {
        if (!cancelled) {
          setCommunity(mapCommunityStatsFailureToViewModel(error));
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [
    canRead,
    chain,
    deployment.rpcUrl,
    refreshToken,
    registryAddress,
  ]);

  const refresh = useCallback(() => {
    setRefreshToken((value) => value + 1);
  }, []);

  return { community, refresh };
}
