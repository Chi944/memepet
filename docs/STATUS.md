# Shared status

Updated: 20 September 2026.

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

**Five days remain and the X Layer deployment has not happened. That is the
critical path; everything else is polish.**

## Current state

| Item | Status |
|---|---|
| Hosted GitHub repository | `Chi944/memepet` |
| Stable default branch | `main` |
| Application | Next.js app: landing, pet home, `/dev/*` previews |
| Design system | Tokens, dark mode, provenance badges, app shell |
| Pet artwork | Hatchling, Buddy, Guardian in `public/pets/` |
| Pet registry contract | Written and unit-tested; Anvil-verified locally; **not on X Layer** |
| Wallet / adopt (L2 slice 1) | Implemented on `feat/l2-wallet-adopt` (env-gated) |
| Live care + community read | **Not implemented** (slice 2) |
| X Layer deployment | **None** — no address committed in `deployment.ts` |
| Live product link | **None** |
| Demo video | **None** |
| Automated checks | typecheck, lint, 29 tests, build — all passing |
| Contract tests | Foundry 1.8.3 installed; 13/13 passing |
## Team access — blocker

Checked against the GitHub API on 20 September 2026:

| Person | Repository access | Contributions so far |
|---|---|---|
| Lead (`Chi944`) | admin | PRs #1, #2, #3 |
| Teammate B (`larmyh`) | write | none |
| Teammate A | **none, and no pending invitation** | none |

**Teammate A cannot push a branch or open a pull request.** Invite them via
Settings → Collaborators → Add people before assigning A1. Every pull request
in this repository so far was authored by the lead; neither teammate has
contributed a commit yet, so no teammate has confirmed they can run the
baseline.

Stale branch `chore/l0-foundation` is still on origin after L0 merged; delete
it once nothing references it.

## Delivery gates

From the agreed plan. A pass is not done until its required result is true.

| Pass | Lead | Teammate A | Teammate B | Required result |
|---|---|---|---|---|
| Foundation | Shared app, interfaces, previews, checks | Art direction and first assets | Product copy and test scenarios | Everyone can run the same app |
| First working slice | Contract tests and adoption integration | Pet scene | Landing hero | Real adoption survives refresh |
| Core loop | Care transaction and live-state mapping | Care states and evolution presentation | Community panel | Confirmed care updates personal and shared progress |
| Testing | Integration failures and edge cases | Assigned visual fixes | Independent testing and bug reports | No unresolved blocker in the core journey |
| Release | Final configuration and deployment | Release-build visual checks | Accurate demo and submission package | Clean-browser demonstration works |

Current position: **L2 slice 1 (wallet connect + adopt + re-read) is built.**
Committed `DEPLOYMENT` remains `not-deployed`. Local Anvil verification uses
`NEXT_PUBLIC_MEMEPET_*` only (see `.env.example`). No X Layer address yet.

## Built

- Shared app shell, types, fixtures, previews
- Landing hero, how-it-works steps, community panel with honest unknown states
- Pet scene, stage trail and care-state panel
- `/pet` gate when no registry; live client when env/config provides one
- `src/lib/deployment.ts` — sole address source; env override for Anvil only
- Wallet + PetRegistry hooks (viem / EIP-1193): connect, switch, adopt with
  receipt + re-read before success; no care loop yet

## Next

See `docs/AUDIT_2026-09-20.md` for the full finding list.

**Lead** — owns the critical path:
1. Get an authorized X Layer testnet deploy of `PetRegistry` and record the
   verified network name, address and explorer URL in `src/lib/deployment.ts`.
   Do not invent an address.
2. L2 slice 2: care plus community reads, all the failure states, no growth
   before a confirmed receipt.
3. Deploy the app somewhere public and put the URL in `NEXT_PUBLIC_SITE_URL`.
4. The two contract findings (unchecked increments, dead sentinel guard) are
   fixed. `care()` costs about 633 more gas; re-read the diff before deploying,
   because the deployed bytecode changed.
5. Foundry 1.8.3 is installed and `npm run test:contracts` passes 13/13.

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
