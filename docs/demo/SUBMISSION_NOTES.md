# Submission notes — verified facts and open items

Updated **22 September 2026**. Working draft, not a submitted entry. Keep every **UNVERIFIED** field visible until actual evidence replaces it. Never turn a planned action into a result.

## Organizer requirements

The [official OKX Dev Day builder kit](https://www.okx.com/en-sg/learn/okx-dev-day-builder-kit), updated 18 September and checked on 22 September, specifies **25 September 2026, 23:59 UTC** as the deadline (**26 September, 07:59 Singapore**) and a **2–4 minute video** showing a working integration. Contract addresses and technical links are among the requested materials.

Build a Market requires X Layer integration and a meme or another listed ecosystem component. Our intended route is a meme application; acceptance of this precise implementation is **UNVERIFIED**. The accessible kit does **not specify mainnet versus testnet** for this case. Testnet eligibility remains **UNVERIFIED**, not implicitly accepted.

The [actual submission form](https://docs.google.com/forms/d/e/1FAIpQLScoFQsVBvoatzVyi0XqdLwP_rfhrhUqiMP4O1jkjJgIFp3mFA/viewform) was inspected in the existing Chrome session without entering data. **Page 1 of 3** verifies these required fields:

- Team name; team size (1–4); members' exact full names matching IDs.
- Track (Build a Market / Build a Company); participation route (In-Person on 7 October 2026 / Remote); number attending the finale (0–4).
- Project name; summary covering product, intended user and core integration.
- Repository link (public or access granted, with README); public demo-video link (2–4 minutes); product link (live/deploy/test environment, or explanation plus video section).
- New project versus pre-existing codebase choice.

An optional 1:1 team display picture accepts an image up to 10 MB. **Pages 2–3, the exact declaration and any additional constraints remain UNVERIFIED** because advancing requires answers not yet supplied. No form was filled or submitted. Do not invent declaration wording.

## Entry details

| Field | Verified value or explicit placeholder |
|---|---|
| Event / product | OKX Dev Day 2026 / MemePet |
| Track | Intended: Build a Market, meme application; precise eligibility **UNVERIFIED** |
| Team size / display names | Three people; user confirmed **Deston, Kym, Larm** |
| Team name | **UNVERIFIED — TEAM_NAME** |
| Exact full names matching IDs / final roles | **UNVERIFIED — FORM_ROSTER**; display names are not assumed to be ID names |
| Participation route / finale attendance count | **UNVERIFIED — IN_PERSON_OR_REMOTE / ATTENDEE_COUNT** |
| New project / pre-existing codebase selection | **UNVERIFIED — PROJECT_ORIGIN_FORM_SELECTION** |
| Repository | [Chi944/memepet](https://github.com/Chi944/memepet), visibility **PUBLIC** verified; repeat logged-out access check at submission |
| Live app | [memepet.vercel.app](https://memepet.vercel.app); read-only checks recorded, wallet journey blocked |
| Network | X Layer testnet, chain **1952**, configured gas currency **OKB** |
| Registry | **`0xe844152262D243a7B90F6e07FF7A67F1d7FeD216`** |
| Verified application deployment | Main application revision **`35186b5`**, production rollout confirmed 22 September; recheck the exact recording revision |
| Deployment transaction | **`0x2ff191a789d48bc58f19e018dfee82aad4cba2ad50212d942e8e1e002fd593f9`**, block **41543244**; receipt success/bytecode match recorded in `src/lib/deployment.ts` |
| Final submission commit / deployed revision | **UNVERIFIED — FINAL_COMMIT_AND_DEPLOYMENT** |
| Testnet acceptance | **UNVERIFIED — ORGANIZER_TESTNET_ELIGIBILITY** |
| Guideline declaration | **UNVERIFIED — EXACT_FORM_DECLARATION** |
| Demo video | **UNVERIFIED — VIDEO_URL**; not recorded/exported yet |

Deployment transaction evidence is not adoption/care evidence. Bytecode comparison is distinct from explorer source verification.

## Project summary — factual draft

MemePet is a meme-community companion prototype on X Layer testnet. Its registry stores one pet per wallet and permits one care action per UTC day. The interface derives ten growth points per recorded care, with Hatchling, Buddy and Guardian stages, and reads a shared community care counter. The prototype supports one community and one mascot. There is no MemePet token, token purchase, staking, marketplace or financial reward. Transactions still require network gas. The complete browser wallet journey remains unverified.

After genuine wallet verification, replace the final sentence with the specific observed journey and evidence references, not a blanket production-readiness claim.

## Evidence by environment

| Source | What it establishes | What it does not establish |
|---|---|---|
| [Live X Layer observations, 22 Sep](../qa/evidence/LIVE_XLAYER_OBSERVATIONS.md) | Public site reads chain 1952; community cares were 0 at capture; one RPC read per page load; `/dev/pet` returned 404; mobile/console checks recorded | Any signed transaction or adopted-pet persistence |
| [Current preparation evidence, 22 Sep](../qa/evidence/OKX_PREP_2026-09-22.md) | Real Chrome Connect attempt reported no injected wallet; supplied address has no pet and a readable testnet balance; form page 1 inspected | Successful wallet connection, signing authority, adoption, care or form submission |
| [Local Anvil observations, 20 Sep](../qa/evidence/OBSERVATIONS.md) | Local rendering, read-only states, mocked wrong-chain and controlled failed-read states | X Layer transactions or genuine wallet rejection/account switching |
| [Development setup history](../DEV_SETUP.md) | Historical automated and unlocked local-node checks, with dates | Current prep-branch checks or browser-wallet success |

A zero community **care** count is not a count of adopted pets, users or wallets. It cannot establish zero adopters. Historical reports describe their capture, not current merge/deployment status.

## Integration and current checks

The public-pet branch reached `main` through **PR #21**, with a badge follow-up in **PR #27**. **PR #22** is now merged as `0f32601`, retaining the public share feature and integration safeguards from `13298d9`. **PR #26** is merged as `35186b5`, adding security headers and two event tests. Its production deployment succeeded and was checked on 22 September. **[PR #28](https://github.com/Chi944/memepet/pull/28)** contains the recording pack and updated evidence. The earlier [preview for `8a88f4b`](https://memepet-21qy9t1rs-chi944s-projects.vercel.app) remains historical evidence.

Real Chrome inspection of this final-code preview confirmed the heading, no fabricated growth, a read-only community total of 0, no captured `/pet` error logs, and 404 pages for `/dev/pet`, `/dev/landing` and `/dev/community`. Clicking Connect wallet again returned **No injected wallet was found**. This is a preview rendering check, not a wallet pass. Logged-out preview access is unverified.

| Current prep-branch command | Actual result |
|---|---|
| `npm run typecheck` | **PASS**, exit 0 |
| `npm run lint` | **PASS**, exit 0 |
| `npm test` | **PASS**, 73/73 tests across 15 files |
| `npm run build` | **PASS**, exit 0 |
| `npm run test:contracts` | **PASS**, 15/15 tests after PR #26 (previously 13) |
| Local final production HTTP smoke | **NOT RUN** — automatic approval review rejected starting the production server on `127.0.0.1:3300` (“blocked by policy”) |
| GitHub CI at `8a88f4b` | **PASS** — [run 35688426933](https://github.com/Chi944/memepet/actions/runs/35688426933), including app/contract jobs, clean install and the production `/dev/*` smoke step |
| Real browser wallet walkthrough | **BLOCKED — no injected wallet; no wallet action passed** |

These current results were executed and reported by the lead in this preparation task. See [current evidence](../qa/evidence/OKX_PREP_2026-09-22.md) for the command record. Automated checks and browser checks are separate.

After PRs #22/#26 merged, production `/` and `/pet` returned 200, and `/dev/pet`, `/dev/landing`, `/dev/community` and `/pet/not-an-address` returned 404. All four configured security headers were present. Real Chrome showed the corrected heading, no fabricated growth and a community count of 0; captured `/pet` error logs were empty. Connect still returned **No injected wallet was found**. These are final application rendering checks; no wallet action passed.

Contract verification now distinguishes code from metadata: deployed bytes match historical contract source `587ceb054d35dd4b7c04a8dd580dcab3b743b30b` exactly. PR #26's SPDX comment changes the compiler metadata, so current full compiled bytecode is **not identical** to deployed bytecode. The 1,344-byte executable runtime, ABI and storage layout are unchanged and were verified to match. No contract was redeployed. See [release evidence](../qa/evidence/OKX_PREP_2026-09-22.md#merge-completion-and-production-follow-up).

## Wallet and transaction evidence

The user supplied public address **`0x2ec8471290793FeB64792861Ce3102d291ce1CA1`**. A read-only X Layer testnet query returned `petOf.exists = false` and balance **199985802959290148 wei**, approximately **0.1999858 OKB**, on 22 September. Its public page rendered no pet. These reads do not connect a wallet, prove control of it or authorize a signature by themselves.

| Required value / check | Status |
|---|---|
| Demo-wallet provenance, preparation and recording disclosure | **UNVERIFIED — PREPARED_DEMO_WALLET_DISCLOSURE** |
| Gas budget sufficient for the actual requested transactions | Balance read above is verified; transaction gas budget **UNVERIFIED** |
| Real connection approval | **BLOCKED — no injected wallet** |
| Rejected adoption, no pet/growth created | **NOT RUN** |
| Adoption hash + successful receipt + pet read-back | **UNVERIFIED — ADOPT_TX_AND_RECEIPT** |
| Care hash + successful receipt + before/after values | **UNVERIFIED — CARE_TX_AND_RECEIPT** |
| Refresh restores same pet | **NOT RUN** |
| Same-day cooldown / UTC label | **NOT RUN** |
| Account switch removes old pet | **NOT RUN** |
| Community before → after for confirmed care | **UNVERIFIED — COMMUNITY_BEFORE_AFTER** |
| Public pet route for the supplied address | `/pet/0x2ec8471290793FeB64792861Ce3102d291ce1CA1` read-only **no-pet** state observed; pet-bearing state **UNVERIFIED** |
| Real next-UTC-day care on X Layer | **NOT RUN**; local time travel cannot establish it |

Use a human-prepared throwaway wallet for capture. When verified, disclose it as a team-prepared demo wallet, not an organic user. Never request or record seed phrases/private keys. For real transactions, retain network, registry, public address, full hash, successful receipt, UTC time and before/after values. Verify explorer links before publishing them. Keep Anvil and fictional preview evidence separately labelled.

## Recording and submission gates

1. Publish and verify the reviewed app revision; finish the real [wallet walkthrough](../qa/BROWSER_WALKTHROUGH.md). Preserve failures/unrun rows honestly.
2. Confirm form roster, team name, participation route, attendance, project-origin answer, eligibility and exact declaration. No submission has occurred.
3. Record the [combined script](DEMO_SCRIPT.md) and individual scripts. Preserve continuous genuine screen footage for the core journey.
4. Share source recordings in Codex for editing using [EDITOR_HANDOFF.md](EDITOR_HANDOFF.md). The final video does not yet exist.
5. Review the 2–4 minute render and [recording checklist](RECORDING_CHECKLIST.md), upload it, then check playback while logged out.
6. Recheck public app/repo/video/technical links and complete the form before the UTC deadline.

Keep these limitations visible: one community/mascot, **testnet**, no security audit, no verified organic usage metrics, and remaining failed/unrun browser steps. The historical mobile-clipping finding was withdrawn as a capture artefact; it is not an outstanding verified defect.
