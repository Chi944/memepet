# Repository cleanup — 23 September 2026

Task **SUBMISSION-CLEANUP**. Baseline: `a8c14cb8a54181487d41ab752212407fab3c1c64`.
This review covers active-file redundancy, unused declarations and documentation
consistency. It does not certify security or complete the browser-wallet walkthrough.

## Removed

**15 obsolete onboarding documents / 82,182 Git-blob bytes:**

- `docs/CHAT_SETUP.md`, `FIRST_CODING_PROMPT.md`, `GITHUB_SETUP.md`,
  `PROJECT_INSTRUCTIONS.md`, `SETUP_SOURCES.md`, `TEAM_CONTEXT.md`.
- Three files under `docs/chat-starters/`.
- Six files under `docs/prompt-packs/`.

These described creating the existing app/repository, completed invitations,
merged tasks and PR rebases, or repeated brief/ownership content. The acceptance
criteria survive in the current brief, QA checklists, status and evidence.
The [pre-cleanup tree](https://github.com/Chi944/memepet/tree/a8c14cb8a54181487d41ab752212407fab3c1c64/docs)
preserves the original documents without keeping them as current instructions.

**44 unused source lines**, following reference/import checks:

- `localAnvil` constant in `src/lib/chains.ts`; generic local-chain mapping remains.
- `STAGES` / `isPetStage` in `src/lib/og-art.ts`; active callers already pass mapped stages.
- Unimplemented `PublicPetCardProps`; public viewing uses the existing route and pet presentation.
- `.page-shell` and six unreferenced global CSS tokens.

No orphan application module or unused runtime dependency was found. No active
function, test, asset, chain guard or production-preview gate was removed.

## Consolidated

- README header now links only the live app. Internal recording-process links
  and word-allocation details no longer occupy the product roadmap.
- `STATUS.md` contains current delivery/acceptance work, without a duplicated
  superseded status snapshot or obsolete prompt queue.
- `DEV_SETUP.md` provides current commands and deployment defaults. Unique old
  local-node verification results remain accessible at the
  [pinned history](https://github.com/Chi944/memepet/blob/a8c14cb8a54181487d41ab752212407fab3c1c64/docs/DEV_SETUP.md#actual-verification);
  the submission evidence link points there explicitly.
- Vercel documentation and `.env.example` now agree with the implemented metadata
  fallback and committed testnet defaults. No hosting configuration was changed.
- Ownership and Claude instructions refer to the implemented components/current work.

## Retained for a reason

All tests, fixtures, three production-gated development previews, CI, lockfile,
contract deployment evidence, dated audit/QA records and asset provenance remain.
All six production pet/share images are referenced. The current README screenshot
is used; raw recordings and renders remain ignored.

The combined/individual scripts, production plan and unverified submission fields
remain under `docs/demo/` for the team's pending recordings and edit. Removing
internal links from the README does not discard those deliverables or erase gaps.

The [earlier cleanup record](https://github.com/Chi944/memepet/blob/a8c14cb8a54181487d41ab752212407fab3c1c64/docs/demo/REPOSITORY_AUDIT.md)
records its narrower baseline and two obsolete PNG removals. PR #41 subsequently
added the current referenced JPEG. This sweep supersedes the earlier decision to
retain completed prompt packs.

## Checks performed before integration

- Strict unused-symbol TypeScript check: passed.
- Four focused wallet-switch/share-image test files: **13 tests passed**.
- Global CSS parsed successfully; removed symbols have no remaining source references.
- No test or assertion was deleted. Whole-project CI remains required on this change.
- Reference checks passed for **35 Markdown files**, **106 distinct relative targets**
  and **13 README contents anchors**.
  Independent review corrected that old setup reference and made the documented
  environment validation limits precise. Whitespace checks passed; CI results
  are recorded in the integrating pull request.

Browser transactions, final visual acceptance, media rights, and organizer eligibility
remain unverified where recorded. The repository still has no project-wide licence;
cleanup does not change contributor rights or supply that missing agreement.
