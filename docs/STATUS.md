# Shared status

Updated: 22 September 2026.

## Hackathon deadline

OKX Dev Day builder kit, read 20 September 2026:

| Milestone | Date |
|---|---|
| Online build period ends | 25 September 2026 |
| **Project submission** | **25 September 2026, 23:59 UTC** |
| Validation / finalist notification | by 30 September 2026 |
| Singapore finale | 7 October 2026 |

Intended track: **Build a Market** (meme applications). That track requires X Layer
integration; acceptance of this precise testnet implementation remains **unverified**.
Required submission items: team info and track, project summary,
public repository with a clear README, a 2–4 minute demo video of the working
product, a live product or test-environment link, and the guideline
declaration.

**The X Layer deployment is done (21 September).** The critical path is now
the genuine browser wallet walkthrough, then the demo video. The latest real
Chrome connection attempt found no injected wallet; no wallet action passed.
The three-person script pack is ready, with success lines kept conditional.

## Current state

| Item | Status |
|---|---|
| Hosted GitHub repository | `Chi944/memepet` |
| Stable default branch | `main` |
| Application | Next.js app: landing, pet home, read-only `/pet/[address]`; `/dev/*` previews are unavailable in production |
| Design system | Tokens, dark mode, provenance badges, app shell |
| Pet artwork | Hatchling, Buddy, Guardian in `public/pets/` |
| Pet registry contract | **Live on X Layer testnet** `0xe844152262D243a7B90F6e07FF7A67F1d7FeD216`, block 41543244; full bytecode matches historical source `587ceb0`, current executable runtime matches excluding compiler metadata. [Evidence](deploy/XLAYER_TESTNET.md#source-comparison--22-september-2026) |
| Wallet / adopt (L2 slice 1) | Merged on `main` (env-gated) |
| Care + community read (L2 slice 2) | Merged on `main` (PR #9) |
| X Layer deployment | ✅ Testnet, committed in `deployment.ts` |
| Live product link | ✅ https://memepet.vercel.app |
| Truthfulness / read-loop fixes | PR #22 merged into `main`; real wallet journey still unverified |
| Security headers / event tests | PR #26 merged into `main`; public `/pet` returned HTTP 200 with all four configured security headers on 22 September |
| Recording pack | Combined script plus individual scripts for **Deston, Kym and Larm**; checklist and Codex editing handoff ready in `docs/demo/` |
| Demo video | **None** |
| Automated checks | Combined integration: **typecheck, lint, build and 73/73 app tests (15 files) passed** on 22 September |
| Contract tests | Combined integration: **15/15 passed** on 22 September, including both new `Cared` event assertions |
| Real browser wallet QA | **Blocked — no injected wallet.** No genuine connection approval, adoption or care performed. [Record](qa/evidence/OKX_PREP_2026-09-22.md) |

Production deployment of `35186b5` completed successfully at **05:10:54 UTC**
on 22 September (deployment ID `6583861938`). Chrome showed **Your pet**, no
fabricated growth and community care total **0** at capture; clicking Connect
again reported **No injected wallet was found**, with no captured error logs.
HTTP checks returned 200 for `/` and `/pet`, and 404 for `/dev/pet`,
`/dev/landing`, `/dev/community` and `/pet/not-an-address`. Read-only rendering
and HTTP checks do not pass any wallet action.

## Team access

Checked against the GitHub API on 22 September 2026:

| Person | Repository access |
|---|---|
| Deston / Lead (`Chi944`) | admin |
| Larm / Teammate B (`larmyh`) | write |
| Kym / Teammate A (`kloo007`) | write |

Kym's invitation is accepted and write access is active. The display names
Deston, Kym and Larm are confirmed; exact full names for the submission form
remain unverified. Team preparation references remain in
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

Current position: **the contract is deployed and the hosted app reads it.**
The complete browser wallet journey is unverified. Historical local Anvil
transaction checks do not establish a live browser-wallet pass. The Testing
and Release gates remain open until genuine wallet evidence, a final video and
the remaining submission details are ready.

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
- Read-only public pet page and share link (PR #21, with badge correction #27)
- Truthful empty/error pet states, stable reads and wallet-state fixes (PR #22)
- Framing, MIME-sniffing and referrer response headers; `Cared` event tests (PR #26)
- Combined and individual recording scripts, recording checklist, editor handoff
  and submission notes with unverified fields preserved

## Next

See `docs/AUDIT_2026-09-20.md` and `docs/AUDIT_2026-09-22.md` for dated findings,
and `docs/qa/evidence/OKX_PREP_2026-09-22.md` for current preparation evidence.

**Lead** — owns the critical path:
1. Done: `PetRegistry` deployed to X Layer testnet and recorded in
   `src/lib/deployment.ts`; exact historical source match pinned to `587ceb0`,
   with current executable runtime verified excluding compiler metadata. See
   `docs/deploy/XLAYER_TESTNET.md` → Source comparison.
2. Done: hosted at https://memepet.vercel.app.
3. Prepare an injected throwaway wallet and execute `docs/qa/BROWSER_WALKTHROUGH.md`
   against the recording deployment. An address alone cannot sign. Keep every
   failed or unrun step explicit; do not replace it with automated-test evidence.
4. Record the 2–4 minute demo with Deston, Kym and Larm using
   `docs/demo/DEMO_SCRIPT.md` and each speaker's script. Share original recordings
   in Codex for editing per `docs/demo/EDITOR_HANDOFF.md`; no final video exists yet.
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
3. **B3 worksheets are ready:** execute the browser walkthrough covering adoption,
   care, refresh, rejection, wrong network, duplicate care, wallet switching and
   mobile. Preserve the recorded no-provider blocker and leave unrun steps unpassed.
4. **B4 scripts are ready** in `docs/demo/`, including combined and individual
   scripts for all three speakers. Replace conditional success lines only when
   matched by genuine wallet evidence. Keep transaction references, video URL and
   unverified submission fields as explicit placeholders until available.
5. Do not write any tester count, partnership or metric that was not observed.

## Run

```bash
npm ci
npm run dev
```

Then open `http://localhost:3000`.
