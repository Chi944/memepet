/**
 * ABI checked against contracts/src/PetRegistry.sol.
 * Keep in sync when the Solidity surface changes.
 */
export const petRegistryAbi = [
  {
    type: "function",
    name: "APPROVED_COMMUNITY_ID",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint32" }],
  },
  {
    type: "function",
    name: "adopt",
    stateMutability: "nonpayable",
    inputs: [{ name: "communityId", type: "uint32" }],
    outputs: [],
  },
  {
    type: "function",
    name: "care",
    stateMutability: "nonpayable",
    inputs: [],
    outputs: [],
  },
  {
    type: "function",
    name: "petOf",
    stateMutability: "view",
    inputs: [{ name: "wallet", type: "address" }],
    outputs: [
      { name: "exists", type: "bool" },
      { name: "communityId", type: "uint32" },
      { name: "careCount", type: "uint32" },
      { name: "lastCareDay", type: "uint64" },
    ],
  },
  {
    type: "function",
    name: "communityStats",
    stateMutability: "view",
    inputs: [{ name: "communityId", type: "uint32" }],
    outputs: [{ name: "totalCareActions", type: "uint64" }],
  },
  {
    type: "event",
    name: "Adopted",
    inputs: [
      { name: "owner", type: "address", indexed: true },
      { name: "communityId", type: "uint32", indexed: true },
    ],
  },
  {
    type: "event",
    name: "Cared",
    inputs: [
      { name: "owner", type: "address", indexed: true },
      { name: "communityId", type: "uint32", indexed: true },
      { name: "careCount", type: "uint32", indexed: false },
      { name: "utcDay", type: "uint64", indexed: false },
    ],
  },
  { type: "error", name: "InvalidCommunity", inputs: [] },
  { type: "error", name: "AlreadyAdopted", inputs: [] },
  { type: "error", name: "NoPet", inputs: [] },
  { type: "error", name: "AlreadyCaredToday", inputs: [] },
] as const;

export type PetOfResult = {
  readonly exists: boolean;
  readonly communityId: number;
  readonly careCount: number;
  readonly lastCareDay: bigint;
};
