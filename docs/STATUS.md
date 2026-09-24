# Current delivery status

Updated 25 September 2026 (Singapore). Team **The four musketeers**: Deston,
Kym, Larm and YeeWei. The recorded release and current follow-up run remain
separate evidence; see [latest-release QA](qa/evidence/LATEST_RELEASE_QA_2026-09-24.md).

## Delivered

- Wallet-linked adoption, one care per UTC day, confirmed growth and a shared care counter on X Layer testnet.
- Responsive black/lime overview, pet home, stage artwork, read-only public pet and share images; development previews return 404 in production.
- Genuine Account 2 rejection/adoption/care, receipts, later pet read-back, cooldown, manual refresh and disconnected public viewing. [Capture evidence](qa/evidence/FINAL_CAPTURE_2026-09-24.md) retains read failures and capture limitations.
- Completed **185-second 1080p30 video**, four portraits, three 130-word voices and 66-caption SRT. Technical decode/audio/caption and bounded visual checks passed; human full playback is not claimed.
- Reduced-motion preview passed with the effective preference enabled: Buddy, success and celebration states kept visible artwork with computed animation disabled. Missing-art and unknown-total previews passed. Normal-motion foreground playback remains NOT RUN by user preference.
- Latest account-switch observation: Account 2's 10-point pet changed to Account 1's 0-point pet without reloading. The follow-up care confirmed and showed 10 points/cooldown, but the community header still showed **Unknown**; this is not a prompt-refresh pass.

Baseline release **19c3fac** includes PR #49's bounded same-block read retry.
[PR #50 CI](https://github.com/Chi944/memepet/actions/runs/36033467569) passed App,
Contracts and production-route checks, with **122 app tests / 21 files**. This
baseline is not a result for subsequent source changes. The current cleanup/retry
change passed **123 app tests / 21 files, 15 contract tests, 8 counter checks,
typecheck, lint and production build** locally. Lint has one existing image-element
warning and no errors. The local production server returned 200 for `/` and 404
for all three development routes. Deployment and fresh-wallet verification of
this change remain pending; automated tests do not erase the live header failure.

## Remaining

| Work | Owner / evidence needed |
|---|---|
| Latest-release wallet QA | Deston operates; record the community-read investigation/fix and genuine result separately, plus any unrun network-switch/disconnect rows |
| Remaining visual QA | Reduced-motion and missing-art/unknown-total fixtures passed in the follow-up run; normal-motion foreground playback is NOT RUN because the user prefers to keep reduced motion enabled. Four viewport layouts and keyboard checks passed in Larm's audit |
| Team video review and upload | All four watch/listen, confirm names/portraits/claims, then upload FINAL MP4 + corrected SRT and check logged-out playback |
| Submission | Deston completes exact roster/route/origin/declarations and retains receipt; Kym resolves asset-input provenance; Larm verifies public links |

[Submission details and checklist](SUBMISSION.md) contain only current form,
rights and delivery fields. The complete scripts/editing pack is preserved in
private production records and [pinned Git history](https://github.com/Chi944/memepet/blob/19c3fac1f097955f2b6e409ab2f4ab988abc0cee/docs/demo/DEMO_SCRIPT.md).
No new feature prompt, full voice retake or optional evolution capture is
required for this edit. No organic usage metrics or organizer approval is claimed.

Use the [wallet walkthrough](qa/BROWSER_WALKTHROUGH.md), [acceptance checklist](QA_CHECKLIST.md),
[component worksheet](qa/COMPONENT_QA_WORKSHEET.md) and [evidence index](qa/evidence/README.md)
for repeatable verification. Tests, mocks, previews and chain reads are not
substitutes for actual browser-wallet actions.
