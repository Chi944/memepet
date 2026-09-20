# Automated browser observations (Anvil only)

Captured on **20 September 2026** against a local Anvil `PetRegistry` and
`npm run dev` on `http://127.0.0.1:3010` (port 3000 was already occupied by
an unrelated Docker app).

**Local registry used for this session (do not commit as deployed):**
`0x0165878A594ca255338adfa4d48449f69242Eb8F`  
Deploy tx status `0x1` via `forge create … --unlocked --from <anvil account>`.  
Seeded with unlocked `adopt` + `care` (receipt status `0x1`); `communityStats(1)` → `1`.  
`communityStats(99)` reverts `InvalidCommunity` (cast).

Nothing here was broadcast to X Layer. Signature flows were **not** exercised.

---

## Screenshots

| File | Viewport | Scheme | What was checked |
|---|---|---|---|
| [`home-light-1280.png`](./home-light-1280.png) | ~1280 | light | Hero, how-it-works, community live total |
| [`home-dark-1280.png`](./home-dark-1280.png) | ~1280 | dark | Same structure in dark scheme |
| [`home-light-390.png`](./home-light-390.png) | 390 | light | Mobile stack; community total |
| [`home-dark-390.png`](./home-dark-390.png) | 390 | dark | Mobile + dark |
| [`pet-no-wallet-light-1280.png`](./pet-no-wallet-light-1280.png) | ~1280 | light | Connect / not-installed state |
| [`pet-no-wallet-dark-390.png`](./pet-no-wallet-dark-390.png) | 390 | dark | Connect state mobile |
| [`pet-hard-refresh-no-wallet.png`](./pet-hard-refresh-no-wallet.png) | ~1280 | light | Hard refresh still connect / Anvil |
| [`pet-wrong-chain-light-1280.png`](./pet-wrong-chain-light-1280.png) | ~1280 | light | Mock wallet on chain `1` |
| [`home-community-stats-revert-unknown.png`](./home-community-stats-revert-unknown.png) | ~1280 | light | `communityStats` revert → Unknown |

---

## Observed results

### Home — hero, how-it-works, live community total

- **Observed:** `ANVIL LOCAL` chip; hero “Adopt the meme. Grow the community.”;
  HOW IT WORKS three steps; community panel **Care actions: 1** (live, not
  fixture); milestone target correctly unavailable (null → no percentage).
- **Evidence:** `home-light-1280.png`, `home-dark-1280.png`, `home-light-390.png`,
  `home-dark-390.png`.
- **390 overflow:** at 390px, `scrollWidth === clientWidth` (390) after CDP
  device metrics — no horizontal document overflow measured.

### `/pet` with no wallet — connect state

- **Observed:** Live pet home; Wallet **Not installed**; **Connect wallet**
  on status card and CarePanel; community cares still shows live `1`.
- **Evidence:** `pet-no-wallet-light-1280.png`, `pet-no-wallet-dark-390.png`.

### `/pet` wrong chain — switch-network state

- **Method:** Playwright `addInitScript` mock `window.ethereum` with
  `eth_chainId → 0x1` and a connected Anvil-shaped address.
- **Observed:** Chain `1 (switch required)`; CarePanel **WRONG NETWORK**;
  **Switch network** buttons; community cares **Unknown** while wrong-chain
  (not shown as `0`).
- **Evidence:** `pet-wrong-chain-light-1280.png`.

### Community panel when `communityStats` reverts

- **Method:** Playwright route on `http://127.0.0.1:8545` returning
  `InvalidCommunity` for `eth_call` selector `communityStats(uint32)`
  (`0x4f26bd5c`) — same revert surface as an unapproved community id
  (`cast call … 99` confirmed `InvalidCommunity` on this Anvil deploy).
- **Observed:** **Care actions: Unknown**; badge UNKNOWN; copy says a count
  appears once a read succeeds. **Not** `Care actions: 0`.
- **Evidence:** `home-community-stats-revert-unknown.png`.

### Hard refresh

- **Observed:** After reload of `/pet` with no wallet, still Live pet home,
  Connect wallet, Not installed, Anvil local.
- **Evidence:** `pet-hard-refresh-no-wallet.png`.
- **Not claimed:** persistence of an adopted pet across refresh (needs
  signature walkthrough row 4).

### Console errors

- Fresh navigations to `/` and `/pet` with Playwright `console`/`pageerror`
  listeners: **no error-level messages** recorded in that pass.
- Dev overlay “N” is Next.js tooling, not an app console error.

---

## Bugs found (not silently fixed)

### B1 — Mobile hero / how-it-works text clipping at 390px

- **Where:** Landing surfaces (`src/components/landing/**` — Teammate B).
- **Repro:** Open `/` at width 390 (see `home-light-390.png`).
- **Observed:** Hero headline and supporting copy visually truncate mid-word
  inside the card (e.g. “Adopt the… Grow the…”). How-it-works titles also
  clip.
- **Action:** Reported only. No edit under teammate paths in this PR.

No defects found in `src/lib`, `src/hooks`, or `src/app` that blocked the
non-signature checks above; no lead-owned code fixes in this PR.

---

## Not exercised (needs human wallet)

See [`../BROWSER_WALKTHROUGH.md`](../BROWSER_WALKTHROUGH.md) — all rows blank.
