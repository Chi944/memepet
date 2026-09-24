#!/usr/bin/env node
// Read-only check of the live MemePet community counter, independent of the app.
// No wallet, no keys, no writes. Needs Node 18+ (built-in fetch).
//
//   node docs/qa/counter-check.mjs                 -> one reading: block, UTC, total
//   node docs/qa/counter-check.mjs <before> <after> -> Cared events in (before, after]

const RPC = "https://testrpc.xlayer.tech/terigon";
const REGISTRY = "0xe844152262D243a7B90F6e07FF7A67F1d7FeD216";
const COMMUNITY_STATS_1 =
  "0x4f26bd5c0000000000000000000000000000000000000000000000000000000000000001";
// keccak256("Cared(address,uint32,uint32,uint64)")
const CARED_TOPIC =
  "0xb87008f14648090eddc989c984aec958e57f24a5b7b88831dc95b4653e89b649";
// The public RPC rejects eth_getLogs spans over 100 blocks (~100 s at 1 s/block).
const MAX_SPAN = 100;

async function rpc(method, params) {
  const response = await fetch(RPC, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
  });
  if (!response.ok) throw new Error(`${method}: HTTP ${response.status}`);
  const body = await response.json();
  if (body.error) throw new Error(`${method}: ${body.error.message}`);
  return body.result;
}

const hex = (n) => `0x${n.toString(16)}`;
const word = (data, i) => BigInt(`0x${data.slice(2 + i * 64, 2 + (i + 1) * 64)}`);

async function assertChain() {
  const chainId = Number(await rpc("eth_chainId", []));
  if (chainId !== 1952) {
    throw new Error(`Expected X Layer testnet (1952), got chain ${chainId}`);
  }
}

async function reading() {
  await assertChain();
  const block = Number(await rpc("eth_blockNumber", []));
  if (!Number.isSafeInteger(block) || block < 0) {
    throw new Error("The RPC returned an invalid block number.");
  }
  const total = BigInt(
    await rpc("eth_call", [{ to: REGISTRY, data: COMMUNITY_STATS_1 }, hex(block)]),
  );
  const head = await rpc("eth_getBlockByNumber", [hex(block), false]);
  const utc = new Date(Number(head.timestamp) * 1000).toISOString();

  console.log(`chain       1952 (X Layer testnet)`);
  console.log(`block       ${block}`);
  console.log(`block time  ${utc}`);
  console.log(`communityStats(1) = ${total}`);
}

async function caredEvents(from, to) {
  if (!(Number.isSafeInteger(from) && Number.isSafeInteger(to) && from >= 0 && from <= to)) {
    throw new Error("Before/after blocks must be safe nonnegative integers with before <= after.");
  }
  await assertChain();

  const found = [];
  // The before reading already includes every transaction in its block.
  // Only later blocks can explain the difference between the two totals.
  for (let start = from + 1; start <= to; start += MAX_SPAN) {
    const end = Math.min(start + MAX_SPAN - 1, to);
    const logs = await rpc("eth_getLogs", [
      { address: REGISTRY, topics: [CARED_TOPIC], fromBlock: hex(start), toBlock: hex(end) },
    ]);
    found.push(...logs);
  }

  console.log(`Cared events after block ${from} through block ${to}: ${found.length}`);
  for (const log of found) {
    const owner = `0x${log.topics[1].slice(26)}`;
    const communityId = BigInt(log.topics[2]);
    const careCount = word(log.data, 0);
    const utcDay = word(log.data, 1);
    console.log(
      `  block ${Number(log.blockNumber)}  owner ${owner}  community ${communityId}` +
        `  careCount ${careCount}  utcDay ${utcDay}\n    tx ${log.transactionHash}`,
    );
  }
  if (found.length === 1) {
    console.log("Exactly one care in range. Compare the owner and tx with your successful receipt, and check the two totals differ by 1.");
  } else if (found.length > 1) {
    console.log("Multiple cares in range. They may belong to the same or different wallets. Compare every owner and tx; do not attribute the whole change to one transaction.");
  } else {
    console.log("No Cared events in this interval. Compare the receipt block and the two readings; no care is attributed by this result.");
  }
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) return reading();
  if (args.length !== 2 || args.some((arg) => arg.trim() === "")) {
    throw new Error("Usage: node counter-check.mjs [<beforeBlock> <afterBlock>]");
  }
  return caredEvents(Number(args[0]), Number(args[1]));
}

main().catch(
  (error) => {
    console.error(error.message);
    process.exit(1);
  },
);
