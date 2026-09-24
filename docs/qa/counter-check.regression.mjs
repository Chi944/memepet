import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

const script = await readFile(new URL("./counter-check.mjs", import.meta.url), "utf8");

async function run(args = [], respond) {
  const calls = [];
  const output = [];
  const errors = [];
  let exitCode = 0;
  await vm.runInNewContext(script, {
    fetch: async (_url, options) => {
      const call = JSON.parse(options.body);
      calls.push(call);
      const defaults = {
        eth_chainId: "0x7a0",
        eth_blockNumber: "0xc8",
        eth_call: "0xa",
        eth_getBlockByNumber: { timestamp: "0x65000000" },
        eth_getLogs: [],
      };
      assert.ok(Object.hasOwn(defaults, call.method), `Unexpected RPC method: ${call.method}`);
      const result = respond ? await respond(call, defaults[call.method]) : defaults[call.method];
      return { ok: true, json: async () => ({ result }) };
    },
    console: {
      log: (...values) => output.push(values.join(" ")),
      error: (...values) => errors.push(values.join(" ")),
    },
    process: {
      argv: ["node", "counter-check.mjs", ...args],
      exit: (code) => { exitCode = code; },
    },
  }, { filename: "counter-check.mjs" });
  return { calls, output: output.join("\n"), errors: errors.join("\n"), exitCode };
}

test("counter reading pins eth_call and block timestamp to the recorded head", async () => {
  const result = await run([], ({ method, params }, fallback) => {
    if (method === "eth_call") return params[1] === "0xc8" ? "0xa" : "0xb";
    return fallback;
  });
  assert.equal(result.exitCode, 0);
  assert.deepEqual(result.calls.map(({ method }) => method), [
    "eth_chainId", "eth_blockNumber", "eth_call", "eth_getBlockByNumber",
  ]);
  const call = result.calls.find(({ method }) => method === "eth_call");
  assert.equal(call.params.length, 2);
  assert.equal(call.params[1], "0xc8");
  assert.deepEqual(result.calls.at(-1).params, ["0xc8", false]);
  assert.match(result.output, /block       200/);
  assert.match(result.output, /communityStats\(1\) = 10/);
});

test("event interval excludes the before block and includes the after block", async () => {
  const result = await run(["100", "101"]);
  assert.equal(result.exitCode, 0);
  const filter = result.calls.find(({ method }) => method === "eth_getLogs").params[0];
  assert.equal(filter.fromBlock, "0x65");
  assert.equal(filter.toBlock, "0x65");
  assert.match(result.output, /after block 100 through block 101: 0/);
});

test("250 interval blocks are queried in chunks of at most 100", async () => {
  const result = await run(["100", "350"]);
  assert.equal(result.exitCode, 0);
  const ranges = result.calls.filter(({ method }) => method === "eth_getLogs")
    .map(({ params: [filter] }) => [Number(filter.fromBlock), Number(filter.toBlock)]);
  assert.deepEqual(ranges, [[101, 200], [201, 300], [301, 350]]);
});

test("equal before/after blocks yield an empty interval without a log query", async () => {
  const result = await run(["100", "100"]);
  assert.equal(result.exitCode, 0);
  assert.deepEqual(result.calls.map(({ method }) => method), ["eth_chainId"]);
  assert.match(result.output, /after block 100 through block 100: 0/);
});

test("invalid block ranges and argument counts fail before using the RPC", async () => {
  for (const args of [
    ["101", "100"], ["-1", "100"], ["0", "-1"], ["0.5", "100"],
    ["0", "9007199254740992"], ["NaN", "100"], ["0", "Infinity"],
    ["100"], ["100", "101", "102"], ["", "100"],
  ]) {
    const result = await run(args);
    assert.equal(result.exitCode, 1, JSON.stringify(args));
    assert.equal(result.calls.length, 0);
    assert.ok(result.errors.length > 0);
  }
});

test("both modes reject the wrong network before reading registry data", async () => {
  for (const args of [[], ["100", "101"]]) {
    const result = await run(args, ({ method }, fallback) => method === "eth_chainId" ? "0x1" : fallback);
    assert.equal(result.exitCode, 1);
    assert.match(result.errors, /Expected X Layer testnet \(1952\), got chain 1/);
    assert.deepEqual(result.calls.map(({ method }) => method), ["eth_chainId"]);
  }
});

test("an unsafe RPC head is rejected instead of labeled as a valid reading", async () => {
  const result = await run([], ({ method }, fallback) => method === "eth_blockNumber" ? "0x20000000000000" : fallback);
  assert.equal(result.exitCode, 1);
  assert.match(result.errors, /invalid block number/);
  assert.equal(result.calls.some(({ method }) => method === "eth_call"), false);
});

test("multiple events from one wallet are not attributed to another wallet", async () => {
  const owner = "1111111111111111111111111111111111111111";
  const word = (value) => BigInt(value).toString(16).padStart(64, "0");
  const logs = [1, 2].map((count) => ({
    blockNumber: `0x${(100 + count).toString(16)}`,
    topics: [
      "0xb87008f14648090eddc989c984aec958e57f24a5b7b88831dc95b4653e89b649",
      `0x${owner.padStart(64, "0")}`, `0x${word(1)}`,
    ],
    data: `0x${word(count)}${word(21088 + count)}`,
    transactionHash: `0x${word(count)}`,
  }));
  const result = await run(["100", "102"], ({ method }, fallback) => method === "eth_getLogs" ? logs : fallback);
  assert.equal(result.exitCode, 0);
  assert.match(result.output, /same or different wallets/);
  assert.doesNotMatch(result.output, /not ours alone|Another wallet cared/);
  assert.equal(result.output.split(`owner 0x${owner}`).length - 1, 2);
  assert.match(result.output, /careCount 2  utcDay 21090/);
});
