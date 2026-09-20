import { describe, expect, it } from "vitest";
import {
  mapCommunityStatsFailureToViewModel,
  mapCommunityStatsToViewModel,
  unknownCommunityViewModel,
} from "./map-community";

describe("mapCommunityStatsToViewModel", () => {
  it("maps a confirmed total and keeps milestoneTarget null", () => {
    expect(mapCommunityStatsToViewModel(BigInt(0))).toEqual({
      name: "MemePet community",
      totalCareActions: 0,
      milestoneTarget: null,
      isLoading: false,
      errorMessage: null,
      dataMode: "live",
    });

    expect(mapCommunityStatsToViewModel(4)).toMatchObject({
      totalCareActions: 4,
      milestoneTarget: null,
      dataMode: "live",
    });
  });
});

describe("mapCommunityStatsFailureToViewModel", () => {
  it("maps InvalidCommunity revert to unknown null, never zero", () => {
    const mapped = mapCommunityStatsFailureToViewModel(
      new Error("The contract function \"communityStats\" reverted with InvalidCommunity"),
      { communityId: 99 },
    );

    expect(mapped.totalCareActions).toBeNull();
    expect(mapped.totalCareActions).not.toBe(0);
    expect(mapped.milestoneTarget).toBeNull();
    expect(mapped.dataMode).toBe("live");
    expect(mapped.errorMessage).toBeNull();
  });

  it("maps other read failures to unknown with an error, not fixtures", () => {
    const mapped = mapCommunityStatsFailureToViewModel(
      new Error("HTTP request failed"),
      { communityId: 1 },
    );

    expect(mapped).toEqual(
      unknownCommunityViewModel({
        errorMessage:
          "Community care total could not be loaded. No preview data is shown.",
      }),
    );
    expect(mapped.totalCareActions).toBeNull();
  });
});
