# Submission repository audit — 23 September 2026

Task: `DEMO-EQUAL-VOICE`. Scope: submission clarity, tracked-file hygiene and recording-media boundaries. This is not a full security audit, legal clearance or a scan of every Git history object.

## Baseline inspected

Repository revision: **`73efb9f56f32ba2b79f760e974b65704846e51ef`**, before this documentation revision. Git records **157 tracked files / 5,690,090 bytes**. Sizes below are Git blob sizes, so Windows checkout line endings do not affect the inventory.

| Area | Files | Bytes | Purpose |
|---|---:|---:|---|
| Root files | 15 | 313,058 | README, instructions, toolchain/configuration and dependency lockfile |
| `.github/` | 2 | 3,567 | CI and pull-request template |
| `contracts/` | 5 | 12,034 | Registry, deploy script, tests and Foundry configuration |
| `src/` | 69 | 232,356 | Application, fixtures and regression tests |
| `public/` | 6 | 1,469,236 | Three stage PNGs and three share backgrounds |
| `docs/` | 60 | 3,659,839 | Product/setup records, demo materials and dated QA evidence |

The worktree began clean. Existing ignored material consisted of `node_modules/`, `.next/`, contract dependency/build/cache directories and TypeScript build information. Their contents were not mistaken for submitted source files.

## Findings and changes

- **README status was stale.** It still presented a missing-wallet attempt as the latest browser result and listed 73 app tests. It also named fonts no longer used by the app. The revised entry point links the real release record: 111 app tests, 15 contract tests, hosted connection/disconnection observed, and adoption/care still unverified.
- **README now separates implementation from evidence.** It shows network/registry, user flow, architecture, setup commands, scripts and the unfinished video field. It removes broad unsubstantiated claims about all meme communities. Artwork examples are explicitly labelled as illustrations, not proof of an earned live stage.
- **Raw production media now has a clear boundary.** `.gitignore` excludes `/media/recordings/`, `/media/exports/` and `/media/cache/`. Recordings, renders and temporary waveforms belong there or outside the repository. Keep reusable storyboard, captions, source composition and attribution files in tracked production documentation; do not put source files in the ignored directories.
- **Local service/test metadata stays local.** `.gitignore` additionally excludes `/.vercel/`, `/playwright-report/` and `/test-results/`.

## Files retained deliberately

- Application and contract tests are required to reproduce the reported behavior. The lockfile, toolchain files and CI are required to reproduce checks.
- Development previews and `src/fixtures/` are useful isolated UI tooling. They are explicitly fictional and production-gated; deleting them would remove test/review coverage rather than improve the submission.
- All **six** `public/pets/` files have source references. Stage PNGs are mapped by `src/lib/map-pet.ts` and used in the pet UI. Share backgrounds are loaded by `src/lib/og-art.ts` and covered by image-render tests.
- Dated `docs/qa/evidence/` captures and reports distinguish local, mocked, read-only and real-wallet observations. They preserve the evidence trail and should not be deleted for appearance.
- `AGENTS.md`, `CLAUDE.md`, ownership, setup history and task/prompt packs support development provenance. Some onboarding material overlaps in purpose, but the documents cross-reference one another and are not byte-identical duplicates. The submission README leads judges to the relevant current documents instead.

## Cleanup performed

No tracked scaffold assets named `next.svg`, `vercel.svg`, `file.svg`, `window.svg` or `globe.svg` were found. No byte-identical tracked file duplicates were found by SHA-256 comparison. There is no second application tree, checked-in package installation, compiled contract output or raw video/audio export in the baseline.

Two historical decorative images had no remaining references after the README update and were removed with the lead's explicit task delegation:

| Removed file | Bytes | Reference check | Reason |
|---|---:|---|---|
| `docs/images/home-desktop.png` | 452,990 | Previously used only by the old README | Outdated decorative screenshot, no longer used by submission materials |
| `docs/images/home-mobile.png` | 282,222 | No repository references found | Unused decorative screenshot |

These were outside the dated QA evidence directory. Removing them saves **735,212 bytes** of unused binary files in the source tree; both remain recoverable from Git history. All dated QA evidence and all six application assets were retained. No other file was removed.

No other deletion is recommended by this bounded audit. Do not remove documentation, test fixtures or screenshots merely because they are not shown in the final video.

## Credentials and licensing

Tracked filenames were checked for private environment files, signing material, keystore directories, logs, local deployment metadata, build products and raw audio/video archives. None was found. `.env.example` is the intended public placeholder file; private `.env*` files and signing material remain ignored. Source/configuration keyword checks found only the Foundry configuration's documented API-key placeholder/reference. No private environment file, keystore, password, key or seed phrase was opened. This check does not prove that all past commits or external services are secret-free.

There is **no project-wide `LICENSE`, `COPYING` or `NOTICE` file** in the baseline. `PetRegistry.sol` carries an MIT SPDX identifier; that does not establish a licence for the entire project or artwork. The team must choose a repository licence if required by the organizer and confirm it can grant the selected rights. [Pet asset provenance](../pet-assets.md) explicitly preserves the remaining source/terms checks.

Any reused third-party production code, template or media needs its own licence review and retained attribution. The cleanup does not imply clearance of music, externally sourced footage or the original artwork. Store the source URL, revision, licence and any modifications alongside a reused production component.

## Checks actually run for this cleanup

- `git ls-tree -rl HEAD` — baseline tracked inventory and exact Git sizes recorded above.
- `git ls-files`, `git status --short --ignored` and tracked filename filtering — checked source/build/media/environment boundaries without reading private ignored files.
- SHA-256 comparison of tracked files — no byte-identical duplicates found.
- `rg` asset and documentation reference checks — six production PNGs are used; the two removed historical decorative screenshots had no remaining references outside this audit record.
- README relative-link/image-target check — **23 distinct local targets exist** at this stage.
- `git check-ignore` with sample Vercel, test-report, raw-MP3, rendered-video and cache paths — **all six expected paths ignored**.
- `git diff --check` — passed; Windows line-ending notices are informational.

The integrating review also checked **64 relative file/image targets across 11 Markdown files**, exact agreement between the combined and individual narration, and **130 selected words per person / 390 total**. Both S08 alternatives contain 42 words. A second reviewer identified that the community baseline must be captured before the first care; the short checklist and Day 1 sequence were corrected before commit. Recorded voice durations, export metadata and transaction evidence remain pending.

No application, contract or dependency change was made by this cleanup, and application tests were not rerun for these prose/ignore edits. The historical 111/15 test counts in the README link to the release where they were actually executed. The integrating lead records any additional checks for the final combined revision.
