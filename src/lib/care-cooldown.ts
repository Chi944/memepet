/** Seconds in one UTC calendar day — matches PetRegistry.SECONDS_PER_UTC_DAY. */
export const SECONDS_PER_UTC_DAY = 86_400;

/**
 * UTC day index used by PetRegistry: floor(block.timestamp / 1 days).
 */
export function utcDayFromUnixSeconds(unixSeconds: number | bigint): bigint {
  const seconds =
    typeof unixSeconds === "bigint" ? unixSeconds : BigInt(unixSeconds);
  return seconds / BigInt(SECONDS_PER_UTC_DAY);
}

export function utcDayFromMs(nowMs: number): bigint {
  return utcDayFromUnixSeconds(Math.floor(nowMs / 1000));
}

/**
 * Instant the next UTC day begins, as an ISO-8601 string.
 * Callers display this with an explicit UTC label (CarePanel already does).
 */
export function nextUtcDayStartIso(lastCareDay: bigint): string {
  const nextDayStartUnix = (lastCareDay + BigInt(1)) * BigInt(SECONDS_PER_UTC_DAY);
  return new Date(Number(nextDayStartUnix) * 1000).toISOString();
}

export type CareCooldownInput = {
  /** Confirmed careCount from petOf. */
  readonly careCount: number;
  /** Confirmed lastCareDay from petOf. */
  readonly lastCareDay: bigint;
  /** Wall clock in ms; injectable for tests. Defaults to Date.now(). */
  readonly nowMs?: number;
};

/**
 * Predicts AlreadyCaredToday without submitting.
 * Returns null when care is available now; otherwise the ISO instant care
 * becomes available again (start of the next UTC day after lastCareDay).
 *
 * Mirrors the contract rule:
 *   careCount != 0 && lastCareDay == currentUtcDay  →  AlreadyCaredToday
 */
export function careCooldownAvailableAtIso(
  input: CareCooldownInput,
): string | null {
  if (!Number.isInteger(input.careCount) || input.careCount < 0) {
    throw new Error("careCount must be a non-negative integer");
  }

  if (input.careCount === 0) {
    return null;
  }

  const nowMs = input.nowMs ?? Date.now();
  const today = utcDayFromMs(nowMs);

  if (input.lastCareDay < today) {
    return null;
  }

  return nextUtcDayStartIso(input.lastCareDay);
}
