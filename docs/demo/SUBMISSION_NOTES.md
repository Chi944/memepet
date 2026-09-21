# Submission notes — draft

Drafted 21 September 2026, from `docs/STATUS.md` and `docs/qa/evidence/OBSERVATIONS.md`
only. Every ⏳ item below is unverified and must be filled with a real value —
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
| 2–4 minute demo video | ⏳ Not recorded — blocked on X Layer deploy | `docs/demo/DEMO_SCRIPT.md` |
| Live product / test-environment link | ⏳ None yet | `docs/STATUS.md` |
| Guideline declaration | ⏳ Not drafted here — organizer-specific, lead to source the exact required wording | — |

## What is actually confirmed working (and how)

Grounded only in `docs/qa/evidence/OBSERVATIONS.md` (automated, non-signature
Playwright checks against a **local Anvil** deployment, 20 September 2026)
and merged PRs. Nothing below is a claim about X Layer.

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
- **No X Layer deployment exists.** `src/lib/deployment.ts` has no committed
  X Layer address (`docs/STATUS.md`).
- **No public live link and no demo video exist yet.**
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
- [ ] That the deployed `PetRegistry` bytecode matches the reviewed source
      (the contract changed after the care-guard fix; re-diff before
      deploying, per `docs/STATUS.md`).
- [ ] That the public URL, once live, passes the clean-browser link-check in
      `docs/demo/DEMO_SCRIPT.md`.
- [ ] That no team member's personal wallet address or an unfunded/test-only
      key is presented as a "real user" in the video or notes.

## Open items blocking a real submission (see `docs/STATUS.md` for owners)

1. X Layer testnet deployment of `PetRegistry` with a verified, committed
   address — lead, critical path.
2. Public deployment of the app with `NEXT_PUBLIC_SITE_URL` set — lead.
3. A completed, real run of `docs/qa/BROWSER_WALKTHROUGH.md` against that
   deployment — Teammate B, once (1) and (2) land.
4. Recording of `docs/demo/DEMO_SCRIPT.md` against the live deployment —
   Teammate B.
5. Sourcing the organizer's exact submission requirements — lead.