# Current delivery status

Reviewed 23 September 2026 (Singapore), starting from `main` at **`a8c14cb`**.

## Implemented

- Wallet-linked registry, one pet per wallet and one care per UTC day.
- Receipt-confirmed adoption/care and fresh chain reads before displaying progress.
- Landing, pet home, community progress and public pet/share-image routes.
- Three stage assets, evolution presentation, responsive and reduced-motion styles.
- Account-access revocation and wallet/chain change handling.
- Three-speaker recording scripts, production plan and editing handoff.

The old onboarding/prompt packs described work already delivered and have been
removed from the active tree. Their [pre-cleanup revision](https://github.com/Chi944/memepet/tree/a8c14cb8a54181487d41ab752212407fab3c1c64/docs)
remains in Git history. No mandatory new feature prompt is waiting to be run.

## Remaining acceptance and submission work

| Work | Evidence required | Owner |
|---|---|---|
| Real wallet flow | Rejection, adoption, care, receipts/read-back, cooldown, refresh, account switching and public/community consistency | Deston operates; Kym/Larm verify |
| Final release visuals | Desktop/mobile, keyboard, reduced motion, current stage art/evolution and public/share pages | Kym + Larm |
| Voice recordings | One MP3 each from the matching speaker script | All three |
| Final demo edit | Genuine screen footage, balanced voices, captions and reviewed 2–4 minute export | Codex after inputs; team reviews |
| Entry completion | Eligibility, rights, roster/route, declarations, checked links and submission receipt | Deston; all members confirm details |

Capture the timestamped community baseline **before** care. Use the
[browser walkthrough](qa/BROWSER_WALKTHROUGH.md),
[component worksheet](qa/COMPONENT_QA_WORKSHEET.md) and
[acceptance checklist](QA_CHECKLIST.md). Record only observed results.

The [speaker scripts](demo/DEMO_SCRIPT.md), [recording checklist](demo/RECORDING_CHECKLIST.md),
[editing handoff](demo/EDITOR_HANDOFF.md), [team responsibilities](demo/TEAM_READINESS.md)
and [submission notes](demo/SUBMISSION_NOTES.md) remain available for the team.
Real later-day Buddy footage is optional because the script includes a labelled
artwork/rules alternate. The core adoption/care demonstration is still required.
External [usability sessions](qa/USER_TESTS.md) remain optional and unrecorded.
Multiple communities, accessories and a holder indicator remain future scope.

## Evidence boundary

[CI at `18da038`](https://github.com/Chi944/memepet/actions/runs/35788305760)
passed **111 app tests / 20 files**, **15 contract tests**, typecheck, lint,
build and production-route gates. Lint retained one existing image warning.
These results describe that revision, not an unrun current check.

Hosted connection was observed, and real Disconnect/reload verified account-access
revocation in the [release audit](qa/evidence/RELEASE_AUDIT_2026-09-23.md).
Browser adoption, care, rejection and earned evolution remain unverified.
A fresh warning-free connection prompt is also unverified. Homepage screenshots
show presentation; they do not complete a transaction or acceptance gate.
