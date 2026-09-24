# Current delivery status

Reviewed 25 September 2026 (Singapore), against `main` at **`3d0428e`**.
Team **The four musketeers**: **Deston, Kym, Larm and YeeWei**. Deston, Kym
and Larm narrate; YeeWei appears in the opening team introduction without lines.

## Implemented

- Wallet-linked registry, one pet per wallet and one care per UTC day.
- Receipt-confirmed adoption/care and fresh chain reads before displaying progress.
- Landing, pet home, community progress and public pet/share-image routes.
- Three stage assets, evolution presentation, responsive and reduced-motion styles.
- Account-access revocation and wallet/chain change handling.
- Three-speaker recording scripts and received MP3s, with a four-member video introduction planned.

The old onboarding/prompt packs described work already delivered and have been
removed from the active tree. Their [pre-cleanup revision](https://github.com/Chi944/memepet/tree/a8c14cb8a54181487d41ab752212407fab3c1c64/docs)
remains in Git history. No mandatory new feature prompt is waiting to be run.

## Remaining acceptance and submission work

| Work | Evidence required | Owner |
|---|---|---|
| Remaining wallet QA | Account-switch regression and real care on the follow-up fix; the recorded Account 2 rejection/adoption/care/refresh/public-view results remain documented separately | Deston operates; Kym/Larm verify |
| Remaining release visuals | Reduced-motion playback and foreground animation checks were unrun in Larm's audit; four viewport layouts and keyboard checks passed | Kym + Larm |
| Team video review | Complete MP4/SRT passed technical QC; all four watch/listen before upload and confirm names, portraits and claims | All four |
| Entry completion | Eligibility, rights, roster/route, declarations, checked links and submission receipt | Deston; all members confirm details |

Capture the timestamped community baseline **before** care. Use the
[browser walkthrough](qa/BROWSER_WALKTHROUGH.md),
[component worksheet](qa/COMPONENT_QA_WORKSHEET.md) and
[acceptance checklist](QA_CHECKLIST.md). Record only observed results.

The [speaker scripts](demo/DEMO_SCRIPT.md), [recording checklist](demo/RECORDING_CHECKLIST.md),
[editing handoff](demo/EDITOR_HANDOFF.md), [team responsibilities](demo/TEAM_READINESS.md)
and [submission notes](demo/SUBMISSION_NOTES.md) remain available for the team.
Kym's **S08B** labelled artwork/rules alternate is selected. This edit makes no
earned-evolution claim. The completed video pairs genuine footage with explicitly
labelled original care/refresh result stills.
External [usability sessions](qa/USER_TESTS.md) remain optional and unrecorded.
Multiple communities, accessories and a holder indicator remain future scope.

## Evidence boundary

[CI at `3d0428e`](https://github.com/Chi944/memepet/actions/runs/36030104889)
passed App and Contracts, including typecheck, lint, **122 app tests / 21 files**,
counter-helper regressions, build and production-route gates. Lint retained one
existing Satori image warning. These are automated results, not wallet passes.

| Reviewed release | Merge | What changed / evidence boundary |
|---|---|---|
| [PR #46](https://github.com/Chi944/memepet/pull/46) | `c828d1b` | Larm's [browser evidence](qa/evidence/LARM_FINAL_BROWSER_QA.md) tested `3294618`; no source changes. Reduced-motion playback, foreground animation/image observation and the new genuine care remained unverified in that run. |
| [PR #47](https://github.com/Chi944/memepet/pull/47) | `9e1580e` | Added missing-art/unknown-total preview choices and wallet-specific sharing metadata. Local tests/build and HTTP production gates passed; this does not upgrade browser playback rows. |
| [PR #48](https://github.com/Chi944/memepet/pull/48) | `0cd895d` | Added up to two delayed retries for unavailable receipt reads at the same block. No transaction retry or invented progress. Controlled recovery, exhaustion and wallet-session cancellation tests passed. The original live RPC exception was not captured. |
| [PR #49](https://github.com/Chi944/memepet/pull/49) | `3d0428e` | Reuses the bounded receipt-read helper for community refreshes after Account 2's live header became Unknown. Transient recovery, exhaustion and session cancellation tests passed. No genuine care after this fix is claimed. |

Production deployment **6643249022**, revision `3d0428e`, succeeded at
**24 September 16:50:38 UTC**. The public `/pet` bundles were checked and contained
the shared receipt-read helper. Account 2's recorded run used the earlier
`0cd895d` release, so its failure/recovery is not a later-fix pass. The final
submission revision remains unverified. The completed 185-second export passed
decode, audio, caption and bounded visual checks; human playback/upload remain.

The [current Account 2 capture record](qa/evidence/FINAL_CAPTURE_2026-09-24.md)
adds genuine rejection/no-pet observations, a fixed-block nonce-0 read, and
approved adoption, genuine first care/receipt, 10-point read-back and cooldown.
The post-care header became **Unknown**; the verified chain delta was **1 → 2**.
Human-reported hard refresh recovered the same pet/total, then disconnect and
the disconnected public view passed. The first recording missed Cancel. Take 3
contains a pet-read error/0-point frame around 293 seconds and solid green at
393–524 seconds; it cannot establish a continuous successful care/refresh shot.
The cause of its difference from the saved 10-point screenshot is unproven.
Community retry follow-up #49 has no live care rerun yet; automated tests do
not close that row.

The [24 September real browser run](qa/evidence/FINAL_ACCEPTANCE_2026-09-24.md)
verified first care with a successful receipt and pet read-back, same-day
cooldown, normal reload, public pet consistency and independent community
0 → 1 attribution. Adoption has a verified receipt and user report, but its
browser transition sequence was not captured. Rejection, account switching,
earned evolution and continuous video remain incomplete. The human reports
a warning-free new prompt; automation did not inspect the extension popup.
The post-care header stayed stale until reload; this observed failure and
separate follow-up fix must not be hidden by the successful chain result.

Larm completed the [final browser QA assignment](qa/evidence/LARM_FINAL_BROWSER_QA.md).
The user has not reported organizer confirmation. No explicit acceptance-letter
upload or separate written testnet-approval requirement was found in the checked
kit/form page; organizer clarification is an open question, not an invented
submission gate. Team contribution
consent and ChatGPT mascot authorship are user-confirmed; original input rights
and applicable generation terms remain unresolved in [team readiness](demo/TEAM_READINESS.md).
