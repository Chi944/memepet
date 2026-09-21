# Submission notes — draft

Drafted 21 September 2026, from `docs/STATUS.md` and `docs/qa/evidence/OBSERVATIONS.md`
with deployment references updated 22 September 2026 from the recorded result
in `docs/deploy/XLAYER_TESTNET.md`. Every ⏳ item below is unverified and must be filled with a real value —
never a placeholder left in — before this is submitted.

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
| 2–4 minute demo video | ⏳ Not recorded — awaiting real wallet QA and recording | `docs/demo/DEMO_SCRIPT.md` |
| Live product / test-environment link | https://memepet.vercel.app — final clean-browser check pending | `docs/STATUS.md` |
| Guideline declaration | ⏳ Not drafted here — organizer-specific, lead to source the exact required wording | — |

## What is actually confirmed working (and how)

Grounded only in `docs/qa/evidence/OBSERVATIONS.md` (automated, non-signature
Playwright checks against a **local Anvil** deployment, 20 September 2026)
and merged PRs. The checks in this section are historical local evidence, separate from the
recorded X Layer deployment below.

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
- The 21 September status records 39 automated tests plus passing typecheck,
  lint and build; these are historical results, not a new run by this document.
- The `PetRegistry` contract has 13/13 passing Foundry tests, Anvil-verified.

## Recorded X Layer deployment

`docs/deploy/XLAYER_TESTNET.md` records the 21 September deployment:

- Network: X Layer testnet, chain ID `1952`.
- Contract: `0xe844152262D243a7B90F6e07FF7A67F1d7FeD216`.
- Deploy transaction: `0x2ff191a789d48bc58f19e018dfee82aad4cba2ad50212d942e8e1e002fd593f9`.
- Block: `41543244`; successful receipt; runtime bytecode matched `main`.
- Public app: https://memepet.vercel.app.
- Explorer source verification was not performed. Bytecode comparison and
  explorer verification are different checks.

This documentation update did not repeat those checks. The deployment
transaction is not evidence of a successful user adoption or care transaction.

## What is explicitly NOT yet confirmed

- **No real wallet-signature flow has been exercised.** Every row in
  `docs/qa/BROWSER_WALKTHROUGH.md` (connect, adopt, reject, refresh, care,
  cooldown, day-advance, account switch, counter increment) is blank.
- **No demo video is recorded in the project status.** The public link exists;
  the final clean-browser link-check remains pending.
- The 390px "text clipping" bug originally logged as B1 was investigated and
  withdrawn as a capture artefact, not a real defect — see
  `docs/qa/evidence/OBSERVATIONS.md` for the reproduction of the false
  positive, so it should not be re-reported without new evidence.

## Prepared wallet / fixture disclosure

Any transaction, address or screenshot used in the final submission must
state whether it came from:

1. A real signed transaction on the declared X Layer test environment
   (state the network name and address), or
2. The local Anvil verification session recorded in
   `docs/qa/evidence/OBSERVATIONS.md` (address
   `0x0165878A594ca255338adfa4d48449f69242Eb8F`, local Anvil deployment only; never present it as a
   public X Layer deployment), or
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
- [x] The recorded deployment bytecode matches the reviewed source, per
      `docs/deploy/XLAYER_TESTNET.md`. Recheck if the submitted source changes.
- [ ] That the public URL, once live, passes the clean-browser link-check in
      `docs/demo/DEMO_SCRIPT.md`.
- [ ] That no team member's personal wallet address or an unfunded/test-only
      key is presented as a "real user" in the video or notes.

## Open items blocking a real submission (see `docs/STATUS.md` for owners)

1. A completed, real run of `docs/qa/BROWSER_WALKTHROUGH.md` against the
   deployed X Layer testnet contract — Teammate B / lead.
2. Recording of `docs/demo/DEMO_SCRIPT.md` against the live deployment —
   Teammate B, after wallet QA passes.
3. Final clean-browser verification of the live product and video links — lead.
4. Verification of the organizer's exact submission requirements — lead.
