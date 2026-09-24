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
- Account switching cleared the previous account's pet without a reload. Earlier Account 1 care confirmed with 10 points/cooldown but left the community header **Unknown**; this failure remains in the evidence.
- A separate unconnected browser displayed Account 3's public page with the correct address, Read only, Live Hatchling, 10 points and no care action: PASS.
- On release **af886a75**, Account 3 genuinely rejected adoption, then adopted and cared. The pet automatically reached **10 points / cooldown**. The community header became **Unknown**, then **Retry community total** recovered **4** without reloading or another transaction. Manual read-only recovery passed; automatic community refresh failed. A normal reload retained Account 3, 10 points, cooldown and total 4.

The tested product revision is **af886a75** (PR #51), separate from later
documentation-only revisions. Production deployment **6644949897** succeeded at
**24 September, 18:17:39 UTC**; the public app served the new recovery control.
[Post-merge CI](https://github.com/Chi944/memepet/actions/runs/36040157500)
passed **123 app tests / 21 files, 15 contract tests, 8 counter checks,
typecheck, lint and production build**. Lint has one existing image-element
warning and no errors. Production-route checks passed: `/` returned 200 and
all three development routes returned 404. Automated checks do not erase the
observed automatic counter-refresh failure.

## Remaining

| Work | Owner / evidence needed |
|---|---|
| Latest-release browser follow-up | Network away/back and disconnect persistence are in progress; public viewing in a separate unconnected browser passed; genuine Account 3 adoption/care, read-only counter recovery and normal reload have passed |
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
