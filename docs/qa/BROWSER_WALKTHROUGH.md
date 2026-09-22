# Browser walkthrough — wallet signature steps

Worksheet for the connect → adopt → care journey against **local Anvil**.
These steps need a real injected wallet (MetaMask / OKX Wallet). They are
**not** pre-marked as passing.

**Authorship note:** Lead authored this file because Teammate B had not
started `docs/qa/` yet. **Teammate B owns `docs/qa/` from here** — edit,
extend, and fill results as B.

**Setup (before any row):**

1. Anvil running on `http://127.0.0.1:8545` (chain id `31337`).
2. `PetRegistry` deployed with an unlocked Anvil account (no `--private-key`
   on the CLI). See README “Trying the on-chain flow locally”.
3. `.env.local` pointed at that **local-only** address (never commit it;
   never put it in `deployment.ts` or the README).
4. `npm run dev` and open `/pet`.
5. Wallet added for Anvil: chain id `31337`, RPC `http://127.0.0.1:8545`,
   currency symbol `ETH` (Anvil), and an Anvil test account imported into
   the wallet by the human (do not paste keys into chat or docs).

Automated, non-signature checks and screenshots live in
[`evidence/`](./evidence/) and [`evidence/OBSERVATIONS.md`](./evidence/OBSERVATIONS.md).

---

## Worksheet

Fill **Actual result** with observed outcomes, or explicitly mark NOT RUN / BLOCKED. Never infer a pass from automated tests or CLI calls.
Do not mark Pass/Fail in advance.

### Latest attempt — 22 September 2026, OKX-PREP

See [the evidence record](evidence/OKX_PREP_2026-09-22.md) for commands,
screenshots, branch provenance and automated checks. **Zero wallet rows passed.**

Local setup was performed: Anvil chain `31337` at `127.0.0.1:8545`, an
unlocked-account local registry deployment, and the integrated app at
`http://127.0.0.1:3300/pet`. Public environment overrides were supplied to
the dev-server process; the existing `.env.local` was neither read nor edited.
These processes are session-local, not a hosted test environment.

Row 1 was attempted in real Chrome: clicking **Connect wallet** returned
**No injected wallet was found.** No approval prompt was available. This is
a blocked prerequisite, not a successful connection or a proven app defect.
Rows 2–9 were not executed. There were no wallet signatures, rejection clicks,
adoption/care receipts, account switches or browser growth comparisons.

| X Layer live repeat | Actual result | Status |
|---|---|---|
| 1. Connect/approve at `https://memepet.vercel.app/pet` | Clicked Connect wallet; **No injected wallet was found.** | BLOCKED; approval not performed |
| 2. Reject adoption | No wallet approval UI available | NOT RUN |
| 3. Approve adoption | No signature or transaction | NOT RUN |
| 4. Refresh confirmed pet | No browser adoption to refresh | NOT RUN |
| 5. Approve care | No signature or transaction | NOT RUN |
| 6. Same-day cooldown | No confirmed browser care | NOT RUN |
| 7. Advance one day | Anvil-only operation; never run time-travel RPC on X Layer | NOT APPLICABLE; real next-UTC-day care still unverified |
| 8. Switch accounts | No connected wallet accounts | NOT RUN |
| 9. Counter +1 | Read-only baseline was 0; no care or comparison | NOT RUN |

The user supplied `0x2ec8471290793FeB64792861Ce3102d291ce1CA1` for connection
help. A public address is not a signer. Its live `petOf` result was
`exists=false`, and its public page showed no pet. These are read-only
observations, not evidence for any row above. A community counter of zero
proves zero recorded cares, not zero adoptions.

To resume, the human must make an injected MetaMask/OKX wallet available in
Chrome and unlock it privately. Use a dedicated test wallet; do not expose
keys or seed phrases. Recheck chain, registry, account and build before each
environment's run. Local Anvil can fund that wallet's **public address** with
test ETH without importing an Anvil key. Record local and testnet results
separately, including UTC timestamps and genuine receipt hashes. After a
successful deployment of this branch, repeat the X Layer rows on that exact
build before recording success narration. No production rollout is implied
by local integration.

### 1. Connect wallet, approve

| | |
|---|---|
| **Steps** | On `/pet`, click **Connect wallet**. Approve the connection in the wallet. |
| **Expected** | Wallet address appears; chain shows `31337` (or Anvil); care/adopt UI leaves the “needs wallet” state. |
| **Actual result** | ATTEMPTED on local Anvil in real Chrome: clicked Connect wallet; the page returned **No injected wallet was found.** Approval could not be performed. |
| **Pass / Fail** | NOT RUN / BLOCKED (not a pass) |
| **Notes / tx** | No browser wallet transaction; no transaction hash. |

### 2. Adopt — reject the signature → no pet is created

| | |
|---|---|
| **Steps** | Connected wallet with **no** pet. Click **Adopt pet**. **Reject** / cancel the signature in the wallet. |
| **Expected** | Error / declined message. Pet stays “None yet”. No growth. Refresh still shows no pet for that wallet. |
| **Actual result** | NOT RUN — blocked by the missing injected wallet in the 22 September 2026 session; see the run record above. |
| **Pass / Fail** | NOT RUN / BLOCKED (not a pass) |
| **Notes / tx** | No browser wallet transaction; no transaction hash. |

### 3. Adopt — approve → pet appears only after the receipt confirms

| | |
|---|---|
| **Steps** | Click **Adopt pet**. Approve the signature. Watch status through awaiting → pending → confirmed. |
| **Expected** | A transaction hash alone does **not** show a live pet. Pet / hatchling state appears only after receipt success **and** a successful `petOf` re-read. |
| **Actual result** | NOT RUN — blocked by the missing injected wallet in the 22 September 2026 session; see the run record above. |
| **Pass / Fail** | NOT RUN / BLOCKED (not a pass) |
| **Notes / tx** | No browser wallet transaction; no transaction hash. |

### 4. Hard refresh → same pet

| | |
|---|---|
| **Steps** | After a confirmed adopt, hard-refresh `/pet` (Ctrl+Shift+R). |
| **Expected** | Same wallet still connected (or reconnect); same pet recovered from the registry — not a fixture. |
| **Actual result** | NOT RUN — blocked by the missing injected wallet in the 22 September 2026 session; see the run record above. |
| **Pass / Fail** | NOT RUN / BLOCKED (not a pass) |
| **Notes / tx** | No browser wallet transaction; no transaction hash. |

### 5. Care — approve → growth appears only after confirmation

| | |
|---|---|
| **Steps** | With an adopted pet that can care today, click care. Approve the signature. |
| **Expected** | Pending shows no awarded growth. After receipt success + re-read, growth points increase by 10. Celebration only if the stage threshold was crossed. |
| **Actual result** | NOT RUN — blocked by the missing injected wallet in the 22 September 2026 session; see the run record above. |
| **Pass / Fail** | NOT RUN / BLOCKED (not a pass) |
| **Notes / tx** | No browser wallet transaction; no transaction hash. |

### 6. Care again same day → cooldown with UTC time, button disabled

| | |
|---|---|
| **Steps** | Immediately try to care again the same UTC day. |
| **Expected** | UI shows **cooldown** with an availability time labelled in **UTC**. Care button disabled. No second transaction required to discover the rule. |
| **Actual result** | NOT RUN — blocked by the missing injected wallet in the 22 September 2026 session; see the run record above. |
| **Pass / Fail** | NOT RUN / BLOCKED (not a pass) |
| **Notes / tx** | No browser wallet transaction; no transaction hash. |

### 7. Advance Anvil one day → care available again

| | |
|---|---|
| **Steps** | In a terminal (Anvil still running): `cast rpc evm_increaseTime 86400 --rpc-url http://127.0.0.1:8545` then `cast rpc evm_mine --rpc-url http://127.0.0.1:8545`. Refresh `/pet`. Care again and approve. |
| **Expected** | Cooldown clears. Second care confirms; growth +10 again. |
| **Actual result** | NOT RUN — blocked by the missing injected wallet in the 22 September 2026 session; see the run record above. |
| **Pass / Fail** | NOT RUN / BLOCKED (not a pass) |
| **Notes / tx** | No browser wallet transaction; no transaction hash. |

### 8. Switch accounts mid-session → previous wallet’s pet must NOT still be displayed

| | |
|---|---|
| **Steps** | While viewing wallet A’s pet, switch the injected wallet to account B (no pet). Do not rely on a full reload unless the app requires it — note what you did. |
| **Expected** | Wallet A’s pet disappears. UI shows B’s state (none / B’s pet). No stale A pet left on screen. |
| **Actual result** | NOT RUN — blocked by the missing injected wallet in the 22 September 2026 session; see the run record above. |
| **Pass / Fail** | NOT RUN / BLOCKED (not a pass) |
| **Notes / tx** | No browser wallet transaction; no transaction hash. |

### 9. Community total increments by exactly one per confirmed care

| | |
|---|---|
| **Steps** | Note home `Care actions` before care. Complete one confirmed care. Refresh home. |
| **Expected** | Community total increases by **exactly 1**. Failed/rejected care does not change the total. |
| **Actual result** | NOT RUN — blocked by the missing injected wallet in the 22 September 2026 session; see the run record above. |
| **Pass / Fail** | NOT RUN / BLOCKED (not a pass) |
| **Notes / before → after** | No confirmed browser care; no before/after comparison. |

---

## Out of scope for this sheet

- X Layer broadcast / testnet deploy (see `docs/deploy/XLAYER_TESTNET.md`).
- Editing `src/components/pet|landing|community/**` — Teammate A/B.
