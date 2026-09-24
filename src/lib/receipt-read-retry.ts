function isReadTemporarilyUnavailable(error: unknown): boolean {
  const visited = new Set<unknown>();
  let cause = error;
  while (typeof cause === "object" && cause !== null && !visited.has(cause)) {
    visited.add(cause);
    const detail = cause as { name?: string; code?: number; status?: number; cause?: unknown };
    if (detail.name === "ContractFunctionRevertedError") return false;
    if (detail.name === "BlockNotFoundError" || detail.name === "TimeoutError") return true;
    if (detail.name === "HttpRequestError") {
      return detail.status === undefined || [408, 429, 500, 502, 503, 504].includes(detail.status);
    }
    if (typeof detail.code === "number" && [-1, -32000, -32001, -32002, -32005, -32007, -32603, 429].includes(detail.code)) {
      return true;
    }
    cause = detail.cause;
  }
  return false;
}

/** Retry unavailable RPC state at one receipt block; never retry a wallet write. */
export async function readReceiptWithRetry<T>(
  blockNumber: bigint,
  read: (blockNumber: bigint) => Promise<T>,
  isCurrent: () => boolean,
): Promise<T | undefined> {
  for (let attempt = 0; ; attempt += 1) {
    if (!isCurrent()) return undefined;
    try {
      const result = await read(blockNumber);
      return isCurrent() ? result : undefined;
    } catch (error) {
      if (!isCurrent()) return undefined;
      if (attempt >= 2 || !isReadTemporarilyUnavailable(error)) throw error;
      await new Promise<void>((resolve) => setTimeout(resolve, 500 * (attempt + 1)));
    }
  }
}
