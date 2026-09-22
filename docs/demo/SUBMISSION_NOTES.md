# Submission notes — draft

Updated **22 September 2026**. Facts here come from `docs/STATUS.md`,
`docs/qa/evidence/OBSERVATIONS.md` and `src/lib/deployment.ts`. Every ⏳ item
is still unverified and must be filled with a real value — never a placeholder
left in — before this is submitted.

## Team and track

| | |
|---|---|
| Event | OKX Dev Day 2026 |
| Track | Build a Market — meme applications |
| Team | Lead (integration + contract), Teammate A (pet experience), Teammate B (community UI, QA, demo) |
| Repository | https://github.com/Chi944/memepet (public) |

## Project summary (draft — reuse or trim from README)

MemePet is a meme-community companion app on X Layer. A wallet adopts a
shared community's mascot, performs one non-financial "care" action per UTC
day, and watches its pet evolve through three stages while contributing to a
shared community counter. There is no token, no staking, no marketplace —
progression is earned by participation, not purchase.

## Submission checklist (from `docs/STATUS.md` hackathon requirements)

| Item | Status | Source |
|---|---|---|
| Team info and track | Ready — see above | this doc |
| Project summary | Draft ready — see above | this doc |
| Public repository with clear README | Done | `README.md` |
| 2–4 minute demo video | ⏳ Not recorded. No longer blocked on the deploy — now gated only on running the wallet walkthrough | `docs/demo/DEMO_SCRIPT.md` |
| Live product / test-environment link | ✅ https://memepet.vercel.app | `docs/STATUS.md` |
| Deployed contract | ✅ `0xe844152262D243a7B90F6e07FF7A67F1d7FeD216`, X Layer testnet (chain 1952) | `src/lib/deployment.ts` |
| Guideline declaration | ⏳ Not drafted here — organizer-specific, lead to source the exact required wording | — |

## What is actually confirmed working (and how)

Grounded in `docs/qa/evidence/OBSERVATIONS.md` (automated, non-signature
Playwright checks against a **local Anvil** deployment, 20 September 2026) and
merged PRs. The rendering behaviour below was observed on Anvil, not on
X Layer — the contract being live does not retroactively make these X Layer
observations.

- Landing page, how-it-works, and a **live** (not fixture) community
  "Care actions" counter render correctly at desktop and mobile, light and
  dark, against local Anvil.
- `/pet` correctly shows a "Connect wallet / Not installed" state with no
  wallet present.
- A simulated wrong-chain wallet correctly shows a "Switch network" state,
  and the community counter correctly shows **Unknown** (not `0`) when the
  chain is wrong.
- An `InvalidCommunity` revert from `communityStats` correctly renders as
  **Unknown**, not a fabricated zero.
- 39 automated tests, typecheck, lint and build pass (`docs/STATUS.md`).
- The `PetRegistry` contract has 13/13 passing Foundry tests, Anvil-verified.

## What is explicitly NOT yet confirmed

- **No real wallet-signature flow has been exercised.** Every row in
  `docs/qa/BROWSER_WALKTHROUGH.md` (connect, adopt, reject, refresh, care,
  cooldown, day-advance, account switch, counter increment) is blank.
- **Nothing has been exercised against the live X Layer contract.** The
  deployment and the public site both exist, but every claim in the section
  above was observed on local Anvil. No one has confirmed the live site
  performs an adoption or a care.
- **No demo video exists yet.**
- The 390px "text clipping" bug originally logged as B1 was investigated and
  withdrawn as a capture artefact, not a real defect — see
  `docs/qa/evidence/OBSERVATIONS.md` for the reproduction of the false
  positive, so it should not be re-reported without new evidence.

## Prepared wallet / fixture disclosure

Any transaction, address or screenshot used in the final submission must
state whether it came from:

1. A real signed transaction on X Layer testnet (chain 1952, registry
   `0xe844152262D243a7B90F6e07FF7A67F1d7FeD216`) — state the transaction hash
   and link it to the OKX explorer, or
2. The local Anvil verification session recorded in
   `docs/qa/evidence/OBSERVATIONS.md` (address
   `0x0165878A594ca255338adfa4d48449f69242Eb8F`, never broadcast, not a
   deployed address, do not present it as one), or
3. A `/dev/*` fixture preview (explicitly label as fictional preview data).

Do not present (2) or (3) as evidence of (1).

## Limitations to disclose, not omit

- Single community and mascot only for this submission; no multi-community,
  marketplace, breeding, trading, or social feed
  (`docs/PROJECT_BRIEF.md` — out of scope).
- No missed-day penalty by design.
- AI-assisted code review in this repository is not a security audit and
  does not guarantee mainnet safety (`docs/prompt-packs/LEAD.md`, L1
  acceptance note).
- `communityStats` reverts for any id outside the approved, fixed community
  configuration; this is mapped to "unknown" in the UI rather than fixed at
  the contract level for this submission.

## Facts the lead must verify before this is submitted

- [ ] Exact organizer requirements: submission form fields, required video
      length, and guideline-declaration wording — none of this was sourced
      here and none should be guessed.
- [ ] The specific X Layer network (mainnet vs. the correct testnet) the
      "Build a Market" track requires, and that the deployed address and
      `src/lib/deployment.ts` agree with official X Layer documentation.
- [x] That the deployed `PetRegistry` bytecode matches the reviewed source —
      the lead recorded `cast code` matching `forge inspect PetRegistry
      deployedBytecode` byte for byte, including CBOR metadata.
- [ ] That https://memepet.vercel.app passes the clean-browser link-check in
      `docs/demo/DEMO_SCRIPT.md`.
- [ ] That no team member's personal wallet address or an unfunded/test-only
      key is presented as a "real user" in the video or notes.

## Open items blocking a real submission (see `docs/STATUS.md` for owners)

1. ~~X Layer testnet deployment~~ — **done 21 September**, registry
   `0xe844152262D243a7B90F6e07FF7A67F1d7FeD216` on chain 1952.
2. ~~Public deployment of the app~~ — **done**, https://memepet.vercel.app.
3. **A completed, real run of `docs/qa/BROWSER_WALKTHROUGH.md` against the
   live contract — Teammate B. This is now the critical path.** All nine rows
   are still blank, so nobody has confirmed an adoption or a care works
   outside local Anvil. Use a throwaway wallet funded from the X Layer testnet
   faucet, never one holding real funds.
4. Recording of `docs/demo/DEMO_SCRIPT.md` against the live deployment —
   Teammate B, after (3).
5. Sourcing the organizer's exact submission requirements — lead.