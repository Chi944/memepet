# Counter check — proving the +1 is ours

Use this repeatable read-only check to attribute a community increment to a
specific care receipt. Retain the before/after blocks and matching events in the
[dated evidence](evidence/README.md).

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
`communityStats(1)`. The total is read at that explicit block, not at a later
head. Record the **block** as `B0` and the total.

Take this as close to the signature as possible. A reading taken an hour
earlier leaves an hour in which someone else could have cared.

### 2. The care

The wallet operator signs and waits for a **successful receipt**. Record its
transaction hash and block number. Check the chain is 1952 and the transaction
targets registry `0xe844152262D243a7B90F6e07FF7A67F1d7FeD216`.

### 3. After — once the receipt is confirmed

```bash
node docs/qa/counter-check.mjs
```

Record the block as `B1` and the new total.

### 4. Verify which care moved the counter

```bash
node docs/qa/counter-check.mjs B0 B1
```

Lists every `Cared` event **after B0, through B1 inclusive**, with its owner,
care count, UTC day and transaction hash. Events in B0 are already included in
the before total, so they must not be counted again. If B0 equals B1, the
interval is empty. The receipt block must satisfy `B0 < receipt block <= B1`.

| What it prints | What it means |
|---|---|
| Exactly one event, owner is our wallet, tx matches the successful receipt, and after total minus before total is 1 | These observations attribute the +1 to that transaction. This is the evidence S06 needs. |
| More than one event | Multiple care transactions occurred. They may be from the same wallet across UTC days or from different wallets. Inspect the owner and tx of every row; do not attribute the whole change to one transaction. |
| Zero events | This interval supplies no care event to attribute. Recheck the receipt and block numbers; this does not establish that the transaction failed. |

The owner prints in lowercase; wallets and receipts show a mixed-case
checksum. They are the same address — compare ignoring case.

For community 1, the difference between the block-pinned totals should equal
the number of its `Cared` events in `(B0, B1]`. If it does not, leave attribution
unverified and recheck the network, block range, receipts and RPC results.
Only report another wallet's participation when an event's owner actually
differs from the demo wallet. The script lists evidence; it does not fetch or
validate the supplied receipt, or automatically compare the two totals.

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
| Receipt status / block / target registry | |
| `Cared` events in (B0, B1] | |
| After total minus before total equals event count | |
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
- Both modes check chain 1952. Block inputs must be safe nonnegative integers
  with B0 no greater than B1.
- These are observations from the configured public RPC, not a guarantee
  against chain reorganizations or a faulty RPC. Recheck receipts and readings
  before recording the final attribution.
- It checks the chain, not the app. That is deliberate — the point is an
  independent reading to compare the app's displayed total against.

## Reference reading

The original script reported the following values, but its `eth_call` omitted
the block parameter. Its total was therefore **not verified at the displayed
block**. This historical row is retained for traceability, not as a valid
block-pinned baseline or evidence of the registry's current state:

| Block | Block time (UTC) | `communityStats(1)` |
|---|---|---|
| 41,673,798 | 2026-09-23 03:03:55 | 0 |

Retake the before reading with the corrected script immediately before care.
Do not infer adoption counts from a care counter.

### Corrected read-only reference — 24 September 2026

The corrected script was run against the public RPC and returned:

| Block | Block time (UTC) | `communityStats(1)` at that block |
|---|---|---|
| 41,799,250 | 2026-09-24 13:54:47 | 1 |

This is a block-pinned counter observation only. It does not identify the
owner or transaction responsible, or verify a browser wallet action. It is
not the before reading for a later demonstration; retake that at the time.

The corrected event mode also queried `(41,799,000, 41,799,250]`, in chunks of
at most 100 blocks, and returned this real registry log:

| Field | Observed value |
|---|---|
| Block | 41,799,228 |
| Owner | `0x2ec8471290793feb64792861ce3102d291ce1ca1` |
| Community | 1 |
| Care count / UTC day | 1 / 20720 |
| Transaction hash | `0x71306dc528a4b15c26c60b3e106e3d01f05bc526d40b07cc55cd9559f2cb5cf4` |
| Events returned in that interval | 1 |

This smoke query verified that the script can decode a real `Cared` event.
It did not collect a before total or compare a wallet receipt, so it does not
by itself complete the attribution procedure or the browser walkthrough.

## Verified

- The original author reported a live reading and a 250-block log query. The
  original reading's missing block parameter limits that evidence as above.
- The `Cared` topic hash and the field decoding were checked against viem's
  canonical ABI encoding and `decodeEventLog`: owner, community, care count
  and UTC day all match.
- The corrected script read the live block-pinned total and decoded the real
  registry event recorded above. The procedure's results table remains blank
  because the full before/receipt/after comparison was not performed here.

Run the focused deterministic regressions with:

```bash
node --test docs/qa/counter-check.regression.mjs
```

These use synthetic RPC responses to check block-pinned calls, the exclusive
before boundary, chunking, equal-block intervals, input/network errors and
repeated-owner wording. They do not prove a browser wallet action occurred.
All eight focused regressions passed on 24 September 2026.
