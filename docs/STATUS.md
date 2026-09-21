# Shared status

Updated: 21 September 2026.

## Hackathon deadline

OKX Dev Day builder kit, read 20 September 2026:

| Milestone | Date |
|---|---|
| Online build period ends | 25 September 2026 |
| **Project submission** | **25 September 2026, 23:59 UTC** |
| Validation / finalist notification | by 30 September 2026 |
| Singapore finale | 7 October 2026 |

Track: **Build a Market** (meme applications). That track requires an X Layer
deployment. Required submission items: team info and track, project summary,
public repository with a clear README, a 2–4 minute demo video of the working
product, a live product or test-environment link, and the guideline
declaration.

**The X Layer deployment is done (21 September).** The critical path is now
manual wallet QA against the live contract, then the demo video.

## Current state

| Item | Status |
|---|---|
| Hosted GitHub repository | `Chi944/memepet` |
| Stable default branch | `main` |
| Application | Next.js app: landing, pet home, `/dev/*` previews |
| Design system | Tokens, dark mode, provenance badges, app shell |
| Pet artwork | Hatchling, Buddy, Guardian in `public/pets/` |
| Pet registry contract | **Live on X Layer testnet** `0xe844152262D243a7B90F6e07FF7A67F1d7FeD216`, block 41543244, bytecode verified against `main` |
| Wallet / adopt (L2 slice 1) | Merged on `main` (env-gated) |
| Care + community read (L2 slice 2) | Merged on `main` (PR #9) |
| X Layer deployment | ✅ Testnet, committed in `deployment.ts` |
| Live product link | ✅ https://memepet.vercel.app |
| Demo video | **None** |
| Automated checks | typecheck, lint, 39 tests, build — all passing |
| Contract tests | Foundry 1.8.3 installed; 13/13 passing |
## Team access

Checked against the GitHub API on 21 September 2026:

| Person | Repository access | Commits on `main` |
|---|---|---|
| Lead (`Chi944`) | admin | 35 |
| Teammate B (`larmyh`) | write | 0 |
| Teammate A (`kloo007`) | **invitation still pending** | 0 |

Teammate A cannot push until the invitation is accepted. Neither teammate has
yet confirmed the baseline runs. Their next steps are in
`docs/prompt-packs/TEAMMATE-A-NEXT.md` and `TEAMMATE-B-NEXT.md`.

## Delivery gates

From the agreed plan. A pass is not done until its required result is true.

| Pass | Lead | Teammate A | Teammate B | Required result |
|---|---|---|---|---|
| Foundation | Shared app, interfaces, previews, checks | Art direction and first assets | Product copy and test scenarios | Everyone can run the same app |
| First working slice | Contract tests and adoption integration | Pet scene | Landing hero | Real adoption survives refresh |
| Core loop | Care transaction and live-state mapping | Care states and evolution presentation | Community panel | Confirmed care updates personal and shared progress |
| Testing | Integration failures and edge cases | Assigned visual fixes | Independent testing and bug reports | No unresolved blocker in the core journey |
| Release | Final configuration and deployment | Release-build visual checks | Accurate demo and submission package | Clean-browser demonstration works |

Current position: **the core loop is deployed and live.** The contract is on
X Layer testnet and the hosted app reads it. What remains is the Testing gate —
exercising the wallet-signature states by hand — and the Release gate: the demo
video and submission.

## Built

- Shared app shell, types, fixtures, previews
- Landing hero, how-it-works steps, community panel with honest unknown states
- Pet scene, stage trail and care-state panel
- `/pet` gate when no registry; live client when env/config provides one
- `src/lib/deployment.ts` — sole address source; env override for Anvil only
- Wallet + PetRegistry hooks: connect, switch, adopt, **care** with receipt +
  re-read; UTC-day cooldown prediction; stage-cross celebration only
- Community `communityStats` read on home (and pet status); InvalidCommunity →
  unknown (`null`), never zero

## Next

See `docs/AUDIT_2026-09-20.md` for the full finding list.

**Lead** — owns the critical path:
1. Done: `PetRegistry` deployed to X Layer testnet and recorded in
   `src/lib/deployment.ts`; bytecode verified against `main`. See
   `docs/deploy/XLAYER_TESTNET.md` → Recorded result.
2. Done: hosted at https://memepet.vercel.app.
3. Run one full wallet journey against the live contract yourself before
   Teammate B does — connect, adopt, refresh, care — so any integration bug
   surfaces now rather than during recording.
4. Record the 2–4 minute demo video once B3 has passed.
5. Open finding: `communityStats` reverts for bad ids — the read layer maps
   that to unknown, which is verified in unit tests and on chain.

**Teammate A** — pet experience, `src/components/pet/**`:
1. Review `/dev/pet` at 390px and desktop against the new tokens. The lead has
   already rebuilt the layout; A3 is now visual correction, not a rebuild.
2. All three PNGs are already 1024x1024. The open problem recorded in
   `docs/pet-assets.md` is edge fringing from knocking a black studio
   background out to alpha. Inspect the three stages against a light and a
   dark card background and clean up any halo.
3. Check the idle bob and the celebration pulse with reduced motion on.
4. Update `docs/pet-assets.md` with final dimensions, source and permission
   notes. Do not claim rights that are not established.

**Teammate B** — landing, community, QA and demo:
1. Review `/dev/landing` and `/dev/community` and own the new `HowItWorks`
   component (see `docs/OWNERSHIP.md`).
2. Copy pass on the three steps and the hero note.
3. **B3 is now urgent:** write `docs/qa/` worksheets covering adoption, care,
   refresh, rejection, wrong network, duplicate care, wallet switching and
   mobile. Leave every result blank until it is actually run.
4. **B4 drafting can start now** in `docs/demo/`: the script, the limitations
   list and the facts the lead must verify. Fill the live link, the transaction
   reference and the video once the lead's deploy lands. The video must fit
   2–4 minutes.
5. Do not write any tester count, partnership or metric that was not observed.

## Run

```bash
npm ci
npm run dev
```

Then open `http://localhost:3000`.
