# Counter check — proving the +1 is ours

For **S06 · A shared total**, and the Larm task in `docs/demo/TEAM_READINESS.md`:
*"Record/check the shared counter before and after care … Keep exact
observations rather than assuming a global +1 proves only our action."*

A total going from `n` to `n+1` does not prove *our* care caused it — another
wallet could care in the same window. This checks the chain directly, so the
evidence does not depend on the app it is testing.

**Read-only.** No wallet, no keys, no signing, no writes. Anyone can run it,
including while someone else operates the wallet.

## Requirements

Node 18 or newer. Nothing to install.

```bash
node --version
```

## The procedure

### 1. Before — immediately before the care is signed

```bash
node docs/qa/counter-check.mjs
```

Prints the chain, the block number, the block's UTC time and
`communityStats(1)`. Record the **block** as `B0`.

Take this as close to the signature as possible. A reading taken an hour
earlier leaves an hour in which someone else could have cared.

### 2. The care

The wallet operator signs and waits for the receipt. Ask them for the
**transaction hash**.

### 3. After — once the receipt is confirmed

```bash
node docs/qa/counter-check.mjs
```

Record the block as `B1` and the new total.

### 4. Verify which care moved the counter

```bash
node docs/qa/counter-check.mjs B0 B1
```

Lists every `Cared` event between the two readings, with its owner, care
count, UTC day and transaction hash.

| What it prints | What it means |
|---|---|
| Exactly one event, owner is our wallet, tx matches the receipt | The +1 is ours. This is the evidence S06 needs. |
| More than one event | Another wallet cared in the same window. The total moved by more than our action. Record every row as-is. |
| Zero events | The care did not land in that range. Recheck the receipt and the block numbers. |

The owner prints in lowercase; wallets and receipts show a mixed-case
checksum. They are the same address — compare ignoring case.

The script also prints `careCount` and `utcDay`, which is how to confirm a
second care landed on a **different** UTC day for the Buddy evolution.

## Record it here

Fill in only from a real run. Leave blank until then.

| | Before | After |
|---|---|---|
| Block | | |
| Block time (UTC) | | |
| `communityStats(1)` | | |

| Check | Result |
|---|---|
| Transaction hash (from the wallet operator) | |
| `Cared` events between B0 and B1 | |
| Owner matches our wallet | |
| Tx hash matches the receipt | |
| `careCount` / `utcDay` | |
| Any other wallet in range? | |
| Run by | |

## Limits

- The public RPC rejects log queries spanning more than 100 blocks. At one
  block per second that is about 100 seconds, so the script splits longer
  ranges into 100-block chunks itself — a gap of a few minutes is fine.
- It reads `communityStats(1)` only: community 1 is the only approved
  community.
- It checks the chain, not the app. That is deliberate — the point is an
  independent reading to compare the app's displayed total against.

## Reference reading

For orientation only — **not** the "before" reading, which must be retaken
immediately before the care:

| Block | Block time (UTC) | `communityStats(1)` |
|---|---|---|
| 41,673,798 | 2026-09-23 03:03:55 | 0 |

At that point no care had ever been recorded on the live registry.

## Verified

- Reading mode returns chain 1952, block, UTC time and the total.
- A 250-block range is split into 100-block chunks without an RPC error.
- A reversed range is rejected with a usage message and exit code 1.
- The `Cared` topic hash and the field decoding were checked against viem's
  canonical ABI encoding and `decodeEventLog`: owner, community, care count
  and UTC day all match.
- Not yet exercised against a real `Cared` event, because none exists yet.