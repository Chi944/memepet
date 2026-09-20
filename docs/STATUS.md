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
| Pet registry contract | Written and unit-tested locally; **not deployed** |
| Wallet / live care | **Not implemented** |
| X Layer deployment | **None** |
| Live product link | **None** |
| Demo video | **None** |
| Automated checks | typecheck, lint, 20 tests, build — all passing |
| Contract tests | Not run on the lead machine (Foundry not installed) |

## Built

- Shared app shell, types, fixtures, previews
- Landing hero, how-it-works steps, community panel with honest unknown states
- Pet scene, stage trail and care-state panel
- `/pet` route that refuses to show a fictional pet as live state
- `src/lib/deployment.ts` — the single place a verified address will go

## Next

See `docs/AUDIT_2026-09-20.md` for the full finding list.

**Lead** — owns the critical path:
1. Get an authorized X Layer testnet deploy of `PetRegistry` and record the
   verified network name, address and explorer URL in `src/lib/deployment.ts`.
   Do not invent an address.
2. L2 slice 1: wallet connect, adopt, read back the pet, survive refresh.
3. L2 slice 2: care plus community reads, all the failure states, no growth
   before a confirmed receipt.
4. Deploy the app somewhere public and put the URL in `NEXT_PUBLIC_SITE_URL`.
5. Decide the two contract findings (unchecked increments, dead sentinel
   guard) before the deploy, because they are cheaper to fix now than after.
6. Install Foundry or mark `npm run test:contracts` as lead-only.

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
