# Submission notes — verified facts and open items

Updated **23 September 2026 (Singapore)**. Working draft, not a submitted entry. Keep every **UNVERIFIED** field visible until actual evidence replaces it. Never turn a planned action into a result.

## Organizer requirements

The [official OKX Dev Day builder kit](https://www.okx.com/en-sg/learn/okx-dev-day-builder-kit), updated 18 September and rechecked on 23 September Singapore time, specifies **25 September 2026, 23:59 UTC** as the deadline (**26 September, 07:59 Singapore**) and a **2–4 minute video** showing a working integration. Contract addresses and technical links are among the requested materials.

Build a Market requires X Layer integration and a meme or another listed ecosystem component. Our intended route is a meme application; acceptance of this precise implementation is **UNVERIFIED**. The accessible kit does **not specify mainnet versus testnet** for this case. Testnet eligibility remains **UNVERIFIED**, not implicitly accepted.

The kit lists the Singapore finale as **7 October**, while the linked [terms](https://www.okx.com/learn/okx-dev-day-terms) list **6 October** and contain a precedence clause. The team must obtain organizer clarification before making finale/travel claims. Accepted-team status, individual eligibility, rights and final declarations are not established by this repository or by a polished video. See [team readiness](TEAM_READINESS.md) for the prepared organizer question; no message has been sent on the team's behalf.

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
| Live app | [memepet.vercel.app](https://memepet.vercel.app); historical read-only checks recorded; complete browser transaction journey **UNVERIFIED** |
| Network | X Layer testnet, chain **1952**, configured gas currency **OKB** |
| Registry | **`0xe844152262D243a7B90F6e07FF7A67F1d7FeD216`** |
| Historical application deployment | Revision **`35186b5`**, production rollout confirmed 22 September in the linked preparation evidence; this is not the final recording revision |
| Deployment transaction | **`0x2ff191a789d48bc58f19e018dfee82aad4cba2ad50212d942e8e1e002fd593f9`**, block **41543244**; receipt success/bytecode match recorded in `src/lib/deployment.ts` |
| Final submission commit / deployed revision | **UNVERIFIED — FINAL_COMMIT_AND_DEPLOYMENT** |
| Testnet acceptance | **UNVERIFIED — ORGANIZER_TESTNET_ELIGIBILITY** |
| Guideline declaration | **UNVERIFIED — EXACT_FORM_DECLARATION** |
| Demo video | **UNVERIFIED — VIDEO_URL**; not recorded/exported yet |
| Source voices | **UNVERIFIED — THREE_MP3_RECORDINGS**; planned 130 selected words per person, actual speaking balance pending |
| Final render / captions / poster / media rights | **UNVERIFIED — FINAL_MEDIA_AND_RIGHTS**; storyboard and editing plan exist, media export does not |

Deployment transaction evidence is not adoption/care evidence. Bytecode comparison is distinct from explorer source verification.

## Project summary — factual draft

MemePet is a meme-community companion prototype on X Layer testnet. Its registry stores one pet per wallet and permits one care action per UTC day. The interface derives ten growth points per recorded care, with Hatchling, Buddy and Guardian stages, and reads a shared community care counter. The prototype supports one community and one mascot. There is no MemePet token, token purchase, staking, marketplace or financial reward. Transactions still require network gas. The complete browser wallet journey remains unverified.

After genuine wallet verification, replace the final sentence with the specific observed journey and evidence references, not a blanket production-readiness claim.

## Evidence by environment

| Source | What it establishes | What it does not establish |
|---|---|---|
| [Live X Layer observations, 22 Sep](../qa/evidence/LIVE_XLAYER_OBSERVATIONS.md) | Public site reads chain 1952; community cares were 0 at capture; one RPC read per page load; `/dev/pet` returned 404; mobile/console checks recorded | Any signed transaction or adopted-pet persistence |
| [Earlier preparation evidence, 22 Sep](../qa/evidence/OKX_PREP_2026-09-22.md) | Real Chrome Connect attempt reported no injected wallet; supplied address has no pet and a readable testnet balance; form page 1 inspected | Successful wallet connection, signing authority, adoption, care or form submission |
| [Later wallet warning review, 22 Sep](../qa/evidence/METAMASK_WARNING_2026-09-22.md) | Hosted warning observed; public review issue submitted; reviewer later said the domain did not appear flagged anymore and closed the issue | Warning removal in the current wallet prompt, an independent security audit, or successful adoption/care |
| [Separate local wallet session, 22 Sep](../qa/evidence/LOCAL_ANVIL_2026-09-22.md) | Real local connection and chain 31337 displayed after human approvals; adoption request reached the pending state | Confirmed rejection, adoption, care, or any X Layer browser transaction; local runtime later stopped |
| [Release audit and hosted disconnect, 23 Sep Singapore](../qa/evidence/RELEASE_AUDIT_2026-09-23.md) | PR #38 deployed; 111 app/15 contract tests passed; real hosted Disconnect revoked account access and reload rechecked the disconnected state | Adoption/care, a new warning-free connection prompt, or a guarantee of zero security risk |
| [Local Anvil observations, 20 Sep](../qa/evidence/OBSERVATIONS.md) | Local rendering, read-only states, mocked wrong-chain and controlled failed-read states | X Layer transactions or genuine wallet rejection/account switching |
| [Development setup history](../DEV_SETUP.md) | Historical automated and unlocked local-node checks, with dates | Current prep-branch checks or browser-wallet success |

A zero community **care** count is not a count of adopted pets, users or wallets. It cannot establish zero adopters. Historical reports describe their capture, not current merge/deployment status.

## Integration and dated checks

The public-pet branch reached `main` through **PR #21**, with a badge follow-up in **PR #27**. **PR #22** merged as `0f32601`, retaining the public share feature and integration safeguards from `13298d9`. **PR #26** merged as `35186b5`, adding security headers and two event tests. Its production deployment succeeded and was checked on 22 September. **[PR #28](https://github.com/Chi944/memepet/pull/28)** contains the recording pack and updated evidence. The earlier [preview for `8a88f4b`](https://memepet-21qy9t1rs-chi944s-projects.vercel.app) remains historical evidence.

The later demo revision **[PR #33](https://github.com/Chi944/memepet/pull/33)** and
teammate artwork, evolution and share-image changes **[PR #34](https://github.com/Chi944/memepet/pull/34)**,
**[PR #35](https://github.com/Chi944/memepet/pull/35)**,
**[PR #36](https://github.com/Chi944/memepet/pull/36)** and
**[PR #37](https://github.com/Chi944/memepet/pull/37)** are merged in `origin/main`
at **`2394853`**, inspected during this audit. Saved documentation branch commit
`66362b6` is already retained through merge `c041ea2`; its `docs/demo` content had
no difference from that main revision. Merged code is not proof that a particular
browser recording used it. The final recording deployment remains a placeholder.

Real Chrome inspection of the earlier `8a88f4b` preview confirmed the heading, no fabricated growth, a read-only community total of 0, no captured `/pet` error logs, and 404 pages for `/dev/pet`, `/dev/landing` and `/dev/community`. Clicking Connect wallet then returned **No injected wallet was found**. This is a historical preview rendering check, not the current wallet state or a wallet pass. Logged-out preview access is unverified.

| Historical preparation command / check | Actual result at that revision |
|---|---|
| `npm run typecheck` | **PASS**, exit 0 |
| `npm run lint` | **PASS**, exit 0 |
| `npm test` | **PASS**, 73/73 tests across 15 files |
| `npm run build` | **PASS**, exit 0 |
| `npm run test:contracts` | **PASS**, 15/15 tests after PR #26 (previously 13) |
| Local final production HTTP smoke | **NOT RUN** — automatic approval review rejected starting the production server on `127.0.0.1:3300` (“blocked by policy”) |
| GitHub CI at `8a88f4b` | **PASS** — [run 35688426933](https://github.com/Chi944/memepet/actions/runs/35688426933), including app/contract jobs, clean install and the production `/dev/*` smoke step |
| Real browser wallet walkthrough at that capture | **BLOCKED — no injected wallet; no wallet action passed in that capture** |

These historical results were executed and reported by the lead in the earlier
preparation task. See the [dated evidence](../qa/evidence/OKX_PREP_2026-09-22.md)
for the command record. They do not establish checks for the later main or this
audit branch. Automated checks and browser checks are separate; final-release
checks must refer to their actual revision and results.

After PRs #22/#26 merged, production `/` and `/pet` returned 200, and `/dev/pet`, `/dev/landing`, `/dev/community` and `/pet/not-an-address` returned 404. All four configured security headers were present. Real Chrome showed the corrected heading, no fabricated growth and a community count of 0; captured `/pet` error logs were empty. Connect then returned **No injected wallet was found**. These are historical rendering checks; no wallet action passed in that capture.

Contract verification now distinguishes code from metadata: deployed bytes match historical contract source `587ceb054d35dd4b7c04a8dd580dcab3b743b30b` exactly. PR #26's SPDX comment changes the compiler metadata, so current full compiled bytecode is **not identical** to deployed bytecode. The 1,344-byte executable runtime, ABI and storage layout are unchanged and were verified to match. No contract was redeployed. See [release evidence](../qa/evidence/OKX_PREP_2026-09-22.md#merge-completion-and-production-follow-up).

## Wallet and transaction evidence

The user supplied public address **`0x2ec8471290793FeB64792861Ce3102d291ce1CA1`**. A read-only X Layer testnet query returned `petOf.exists = false` and balance **199985802959290148 wei**, approximately **0.1999858 OKB**, on 22 September. Its public page rendered no pet. These reads do not connect a wallet, prove control of it or authorize a signature by themselves.

The user subsequently reported importing that same account, connecting it and
switching networks. On 23 September Singapore time, the user explicitly reported
**only connection/network switching**, with no approved transaction or signature.
The separate local Anvil page independently displayed the address and chain 31337.
An adoption request reached a pending wallet state, but no rejection or successful
transaction was observed before the local runtime stopped. This does not complete
the X Layer walkthrough.

A later read-only Chrome inspection independently showed the intended full
address on the hosted `/pet` page, chain **1952**, **None yet**, community cares
**0**, and the **Adopt pet** button. This establishes an existing authorized
connection in that browser. No new Connect click or wallet prompt was inspected,
and no transaction was requested during that check.

The hosted site previously showed MetaMask's malicious-site warning. The
[public review issue #296216](https://github.com/MetaMask/eth-phishing-detect/issues/296216)
was closed after a reviewer said on **22 September, 19:31 UTC** that it did not
appear flagged anymore. [Reviewer response](https://github.com/MetaMask/eth-phishing-detect/issues/296216#issuecomment-5782692269).
Whether the warning has disappeared in the current wallet prompt is
**UNVERIFIED**. No independent security audit or blanket safety assurance is claimed.

| Required value / check | Status |
|---|---|
| Demo-wallet provenance, preparation and recording disclosure | **UNVERIFIED — PREPARED_DEMO_WALLET_DISCLOSURE** |
| Gas budget sufficient for the actual requested transactions | Balance read above is verified; transaction gas budget **UNVERIFIED** |
| Real connection approval | Hosted full address/chain 1952 **OBSERVED**, following the user's reported approval; local Anvil address/chain 31337 also **OBSERVED**. Neither is a transaction pass |
| Hosted wallet warning removed in current prompt | **UNVERIFIED**; reviewer closure alone is not a browser check |
| Wallet dapp permission disconnected after testing | **PASS for hosted origin**: real Chrome Disconnect and reload verified account-access revocation on PR #38's production build. Local-origin permission unchanged. See release evidence |
| Rejected adoption, no pet/growth created | **NOT RUN on X Layer**; local request reached pending, but rejection not observed |
| Adoption hash + successful receipt + pet read-back | **UNVERIFIED — ADOPT_TX_AND_RECEIPT** |
| Care hash + successful receipt + before/after values | **UNVERIFIED — CARE_TX_AND_RECEIPT** |
| Refresh restores same pet | **NOT RUN** |
| Same-day cooldown / UTC label | **NOT RUN** |
| Account switch removes old pet | **NOT RUN** |
| Community before → after for confirmed care | **UNVERIFIED — COMMUNITY_BEFORE_AFTER** |
| Public pet route for the supplied address | `/pet/0x2ec8471290793FeB64792861Ce3102d291ce1CA1` read-only **no-pet** state observed; pet-bearing state **UNVERIFIED** |
| Real next-UTC-day care on X Layer | **NOT RUN**; local time travel cannot establish it |

Use a human-prepared throwaway wallet for capture. When verified, disclose it as a team-prepared demo wallet, not an organic user. Never request or record seed phrases/private keys. For real transactions, retain network, registry, public address, full hash, successful receipt, UTC time and before/after values. Verify explorer links before publishing them. Keep Anvil and fictional preview evidence separately labelled.

## Current recording package

Script **MP-EQ-20260923-v1** replaces the earlier camera-led version. The combined script has **390 selected spoken words**, exactly **130 each** for Deston, Kym and Larm across three interleaved turns. The **3:25** timeline is a plan, not a measured export. Kym's two S08 options each contain 42 words; exactly one enters the final. No current evidence establishes browser adoption, care or earned evolution.

Each person records one MP3 using the matching [speaker script](DEMO_SCRIPT.md#three-mp3-files). No face camera is required. The editor removes scene slates and excess pauses, measures retained speech, and balances the three voices after upload. Every result line remains conditional on matching genuine screen evidence. An artwork-only S08 can replace missing later-day evolution, but cannot replace the core adoption/care demonstration.

The [production plan](PRODUCTION_PLAN.md) records the playful, polished direction, researched finalist examples and adaptations from the pinned `latent-spaces/brag` workflow. No competitor media, bundled music, synthetic narration or recreated success UI has been used. No paid generation or render has been performed. The [editor handoff](EDITOR_HANDOFF.md) keeps source timings, transaction references and final export fields unverified until actual media arrives.

The [repository audit](REPOSITORY_AUDIT.md) records two unused decorative screenshot removals and ignores for raw recordings/exports. Dated QA evidence and production assets remain. This documentation-only revision does not establish additional wallet passes or erase prior observations.

## Recording and submission gates

1. Publish and verify the reviewed app revision; finish the real [wallet walkthrough](../qa/BROWSER_WALKTHROUGH.md). Preserve failures/unrun rows honestly.
2. Confirm form roster, team name, participation route, attendance, project-origin answer, eligibility and exact declaration. No submission has occurred.
3. Record one MP3 per person from the [combined script and individual scripts](DEMO_SCRIPT.md). Preserve separate continuous genuine screen footage for the core journey.
4. Share the three MP3s and screen sources in Codex for editing using [EDITOR_HANDOFF.md](EDITOR_HANDOFF.md). The final video does not yet exist.
5. Review the 2–4 minute render and [recording checklist](RECORDING_CHECKLIST.md), upload it, then check playback while logged out.
6. Recheck public app/repo/video/technical links and complete the form before the UTC deadline.

Keep these limitations visible: one community/mascot, **testnet**, no independent security audit, no verified organic usage metrics, and remaining failed/unrun browser steps. The historical mobile-clipping finding was withdrawn as a capture artefact; it is not an outstanding verified defect.
