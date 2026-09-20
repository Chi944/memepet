import { describe, expect, it } from "vitest";
import {
  SECONDS_PER_UTC_DAY,
  careCooldownAvailableAtIso,
  nextUtcDayStartIso,
  utcDayFromMs,
} from "./care-cooldown";

describe("careCooldownAvailableAtIso", () => {
  const day = BigInt(20_000);
  const midDayMs =
    Number(day) * SECONDS_PER_UTC_DAY * 1000 + 12 * 60 * 60 * 1000;

  it("is available when the pet has never been cared for", () => {
    expect(
      careCooldownAvailableAtIso({
        careCount: 0,
        lastCareDay: BigInt(0),
        nowMs: midDayMs,
      }),
    ).toBeNull();
  });

  it("is available when last care was on an earlier UTC day", () => {
    expect(
      careCooldownAvailableAtIso({
        careCount: 3,
        lastCareDay: day - BigInt(1),
        nowMs: midDayMs,
      }),
    ).toBeNull();
  });

  it("predicts cooldown until the next UTC midnight when already cared today", () => {
    const availableAt = careCooldownAvailableAtIso({
      careCount: 1,
      lastCareDay: day,
      nowMs: midDayMs,
    });

    expect(availableAt).toBe(nextUtcDayStartIso(day));
    expect(availableAt).toMatch(/T00:00:00.000Z$/);
    expect(utcDayFromMs(Date.parse(availableAt!))).toBe(day + BigInt(1));
  });

  it("stays in cooldown if the clock is still on lastCareDay", () => {
    const lastSecondOfDay =
      Number(day) * SECONDS_PER_UTC_DAY * 1000 +
      (SECONDS_PER_UTC_DAY - 1) * 1000;

    expect(
      careCooldownAvailableAtIso({
        careCount: 2,
        lastCareDay: day,
        nowMs: lastSecondOfDay,
      }),
    ).toBe(nextUtcDayStartIso(day));
  });

  it("clears cooldown one second into the next UTC day", () => {
    const firstSecondNextDay =
      Number(day + BigInt(1)) * SECONDS_PER_UTC_DAY * 1000;

    expect(
      careCooldownAvailableAtIso({
        careCount: 2,
        lastCareDay: day,
        nowMs: firstSecondNextDay,
      }),
    ).toBeNull();
  });
});
