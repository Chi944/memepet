# Live X Layer observations — non-signature checks

Captured **22 September 2026** against the deployed site
https://memepet.vercel.app and the live registry
`0xe844152262D243a7B90F6e07FF7A67F1d7FeD216` on X Layer testnet.

**Scope.** Browser-driven checks that need **no wallet**. Nothing here was
signed, adopted or cared. Every row of `BROWSER_WALKTHROUGH.md` is still blank
and still needs a human at a funded testnet wallet — see
[Not covered](#not-covered).

Until now every piece of evidence in `docs/qa/` came from **local Anvil**.
This is the first recorded evidence about the live deployment.

---

## Environment verified

| Fact | Value | How |
|---|---|---|
| Chain id | `0x7a0` = **1952** (X Layer testnet) | `eth_chainId` against `testrpc.xlayer.tech/terigon` |
| Registry | `0xe844152262D243a7B90F6e07FF7A67F1d7FeD216` | `src/lib/deployment.ts` |
| `communityStats(1)` on chain | `0` | direct `eth_call`, selector `0x4f26bd5c` |
| Site shell | `X-Nextjs-Prerender: 1`, `X-Vercel-Cache: HIT` | response headers |

---

## Passed

### The community total is a real live read, not a baked number

The served HTML contains **no** "Care actions" text — `curl` of the page shows
the shell only. The value appears after hydration, and the page's own
`performance` resource timings record exactly one `fetch` to
`https://testrpc.xlayer.tech/terigon` (542 ms). The rendered value,
**`Care actions: 0`**, matches the on-chain `communityStats(1) = 0` exactly.

This matters because the shell is a cached prerender (`Age` ~9 h at capture).
The shell is static; the number is not.

`0` here is a **confirmed zero**, not an unknown rendered as zero — nobody has
cared on the live contract yet. The milestone target correctly reads
"Milestone target unavailable. No percentage can be calculated."

### The read loop does not fire in production

One `fetch` to the RPC per page load, on both `/` and `/pet`. The unbounded
re-read documented in `docs/AUDIT_2026-09-22.md` (measured at 7,157 reads in
400 ms on Anvil) does **not** occur here, because chain id 1952 is one of the
two ids `chainFromDeployment` returns a stable object for. Production was
never affected; local development was.

### `/dev/*` returns 404 on the real deployment

`https://memepet.vercel.app/dev/pet` → **404, "This page could not be
found."** Previously this was only verified against a local production build.
It now holds on the deployed site. (QA checklist **I12**.)

### No horizontal overflow at mobile width

At 375×812: `documentElement.scrollWidth === clientWidth === 375`, and a sweep
of every element for `getBoundingClientRect().right > clientWidth` returned
**zero** offenders. The hero headline wraps cleanly across three lines with no
truncation.

This closes out finding **B1**, withdrawn in `evidence/OBSERVATIONS.md` as a
screenshot artefact. It stays withdrawn — confirmed against the live site, not
a local capture.

### No console errors

Error-level console messages on `/` and `/pet`: **none**.

---

## Failed

### `/pet` shows growth points for a pet that does not exist

**This is live in production right now.**

With no wallet connected, `https://memepet.vercel.app/pet` renders:

```
PET            None yet
...
DAILY CARE     NOT CONNECTED
Care for your pet
0 growth points. Next stage at 20.
Connect a wallet to adopt and care for a pet.
```

The status row correctly says **"None yet"**, and the panel directly beneath
it states **"0 growth points. Next stage at 20."** for that non-existent pet.
The numbers come from `PLACEHOLDER_PET`, a hand-written view model carrying
`dataMode: "live"`.

A first-time visitor — which is every judge opening the link — sees fabricated
progress for a pet they have not adopted.

Fix is in **PR #22**, which deletes `PLACEHOLDER_PET` and makes the panel omit
growth numbers when no pet is known. Not yet merged.

### `/pet` has no `<h1>`

`document.querySelectorAll('h1').length` → **0**. The only heading on the page
is `H2: "Care for your pet"`. The page has no top-level heading, so the
document outline starts at level 2.

Also fixed in **PR #22**, unmerged.

---

## Not covered

Everything requiring a wallet signature. Specifically untested, and still
blank in `BROWSER_WALKTHROUGH.md`:

- connect and approve
- adopt with the signature **rejected** — no pet may be created
- adopt approved — pet appears only after the receipt confirms
- hard refresh — the same pet returns
- care approved — growth only after confirmation
- care again the same UTC day — cooldown, UTC label, button disabled
- next-day care
- switching accounts mid-session
- the community total incrementing by exactly one per confirmed care

No claim in this file should be read as evidence that adoption or care works
on X Layer. Nobody has performed either. The community total being `0` is
consistent with that: the live contract has never recorded a care action.

## Method notes

Driven through a headless browser against the public URL — no dev server, no
local build, no fixtures. Values were read from the page's own DOM and
`performance` entries, and cross-checked against the chain with direct
`eth_call` / `eth_chainId` requests. No wallet extension was present, which is
why the wallet row reads "Not installed".