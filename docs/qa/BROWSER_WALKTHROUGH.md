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

Fill **Actual result** only after you run the step. Leave blank until then.
Do not mark Pass/Fail in advance.

### 1. Connect wallet, approve

| | |
|---|---|
| **Steps** | On `/pet`, click **Connect wallet**. Approve the connection in the wallet. |
| **Expected** | Wallet address appears; chain shows `31337` (or Anvil); care/adopt UI leaves the “needs wallet” state. |
| **Actual result** | |
| **Pass / Fail** | |
| **Notes / tx** | |

### 2. Adopt — reject the signature → no pet is created

| | |
|---|---|
| **Steps** | Connected wallet with **no** pet. Click **Adopt pet**. **Reject** / cancel the signature in the wallet. |
| **Expected** | Error / declined message. Pet stays “None yet”. No growth. Refresh still shows no pet for that wallet. |
| **Actual result** | |
| **Pass / Fail** | |
| **Notes / tx** | |

### 3. Adopt — approve → pet appears only after the receipt confirms

| | |
|---|---|
| **Steps** | Click **Adopt pet**. Approve the signature. Watch status through awaiting → pending → confirmed. |
| **Expected** | A transaction hash alone does **not** show a live pet. Pet / hatchling state appears only after receipt success **and** a successful `petOf` re-read. |
| **Actual result** | |
| **Pass / Fail** | |
| **Notes / tx** | |

### 4. Hard refresh → same pet

| | |
|---|---|
| **Steps** | After a confirmed adopt, hard-refresh `/pet` (Ctrl+Shift+R). |
| **Expected** | Same wallet still connected (or reconnect); same pet recovered from the registry — not a fixture. |
| **Actual result** | |
| **Pass / Fail** | |
| **Notes / tx** | |

### 5. Care — approve → growth appears only after confirmation

| | |
|---|---|
| **Steps** | With an adopted pet that can care today, click care. Approve the signature. |
| **Expected** | Pending shows no awarded growth. After receipt success + re-read, growth points increase by 10. Celebration only if the stage threshold was crossed. |
| **Actual result** | |
| **Pass / Fail** | |
| **Notes / tx** | |

### 6. Care again same day → cooldown with UTC time, button disabled

| | |
|---|---|
| **Steps** | Immediately try to care again the same UTC day. |
| **Expected** | UI shows **cooldown** with an availability time labelled in **UTC**. Care button disabled. No second transaction required to discover the rule. |
| **Actual result** | |
| **Pass / Fail** | |
| **Notes / tx** | |

### 7. Advance Anvil one day → care available again

| | |
|---|---|
| **Steps** | In a terminal (Anvil still running): `cast rpc evm_increaseTime 86400 --rpc-url http://127.0.0.1:8545` then `cast rpc evm_mine --rpc-url http://127.0.0.1:8545`. Refresh `/pet`. Care again and approve. |
| **Expected** | Cooldown clears. Second care confirms; growth +10 again. |
| **Actual result** | |
| **Pass / Fail** | |
| **Notes / tx** | |

### 8. Switch accounts mid-session → previous wallet’s pet must NOT still be displayed

| | |
|---|---|
| **Steps** | While viewing wallet A’s pet, switch the injected wallet to account B (no pet). Do not rely on a full reload unless the app requires it — note what you did. |
| **Expected** | Wallet A’s pet disappears. UI shows B’s state (none / B’s pet). No stale A pet left on screen. |
| **Actual result** | |
| **Pass / Fail** | |
| **Notes / tx** | |

### 9. Community total increments by exactly one per confirmed care

| | |
|---|---|
| **Steps** | Note home `Care actions` before care. Complete one confirmed care. Refresh home. |
| **Expected** | Community total increases by **exactly 1**. Failed/rejected care does not change the total. |
| **Actual result** | |
| **Pass / Fail** | |
| **Notes / before → after** | |

---

## Out of scope for this sheet

- X Layer broadcast / testnet deploy (see `docs/deploy/XLAYER_TESTNET.md`).
- Editing `src/components/pet|landing|community/**` — Teammate A/B.
