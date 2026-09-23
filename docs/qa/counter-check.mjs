#!/usr/bin/env node
// Read-only check of the live MemePet community counter, independent of the app.
// No wallet, no keys, no writes. Needs Node 18+ (built-in fetch).
//
//   node docs/qa/counter-check.mjs                 -> one reading: block, UTC, total
//   node docs/qa/counter-check.mjs <from> <to>     -> every Cared event in that block range

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
  const body = await response.json();
  if (body.error) throw new Error(`${method}: ${body.error.message}`);
  return body.result;
}

const hex = (n) => `0x${n.toString(16)}`;
const word = (data, i) => BigInt(`0x${data.slice(2 + i * 64, 2 + (i + 1) * 64)}`);

async function reading() {
  const chainId = Number(await rpc("eth_chainId", []));
  const block = Number(await rpc("eth_blockNumber", []));
  const total = BigInt(
    await rpc("eth_call", [{ to: REGISTRY, data: COMMUNITY_STATS_1 }], hex(block)),
  );
  const head = await rpc("eth_getBlockByNumber", [hex(block), false]);
  const utc = new Date(Number(head.timestamp) * 1000).toISOString();

  if (chainId !== 1952) {
    throw new Error(`Expected X Layer testnet (1952), got chain ${chainId}`);
  }
  console.log(`chain       1952 (X Layer testnet)`);
  console.log(`block       ${block}`);
  console.log(`block time  ${utc}`);
  console.log(`communityStats(1) = ${total}`);
}

async function caredEvents(from, to) {
  if (!(Number.isInteger(from) && Number.isInteger(to) && from <= to)) {
    throw new Error("Usage: node counter-check.mjs <fromBlock> <toBlock>");
  }

  const found = [];
  for (let start = from; start <= to; start += MAX_SPAN) {
    const end = Math.min(start + MAX_SPAN - 1, to);
    const logs = await rpc("eth_getLogs", [
      { address: REGISTRY, topics: [CARED_TOPIC], fromBlock: hex(start), toBlock: hex(end) },
    ]);
    found.push(...logs);
  }

  console.log(`Cared events in blocks ${from}-${to}: ${found.length}`);
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
    console.log("Exactly one care in range. Confirm the owner and tx match your receipt.");
  } else if (found.length > 1) {
    console.log("MORE THAN ONE care in range: the counter change is not ours alone. Record every row.");
  }
}

const [fromArg, toArg] = process.argv.slice(2);
(fromArg === undefined ? reading() : caredEvents(Number(fromArg), Number(toArg))).catch(
  (error) => {
    console.error(error.message);
    process.exit(1);
  },
);