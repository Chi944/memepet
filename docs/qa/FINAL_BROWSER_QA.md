# Final browser QA — Larm handoff

Copy the prompt below into Larm's Claude Code session in the existing MemePet repository. This assigns final visual and browser acceptance work; Deston/Codex owns the real wallet walkthrough and eligibility checks. It contains no pre-recorded passes.

---

You are Larm's implementation and QA assistant. Complete task **LARM-FINAL-QA** in the existing MemePet repository. Inspect the app, record reproducible browser evidence, and repair only defects inside the allowlist below. Do not add features or packages.

## Start from reviewed code

Read `AGENTS.md`, `docs/PROJECT_BRIEF.md`, `docs/OWNERSHIP.md`, `docs/DEV_SETUP.md`, `docs/STATUS.md`, `docs/QA_CHECKLIST.md`, `docs/qa/COMPONENT_QA_WORKSHEET.md`, `docs/qa/BROWSER_WALKTHROUGH.md`, `docs/qa/WALLET_SETUP.md`, and their current linked evidence before acting. Historical results are not current passes.

Check `git status` and existing worktrees. Fetch `origin`, then base **qa/larm-final-browser** on the latest reviewed `origin/main`. Use a separate worktree if the checkout is dirty or occupied; preserve all existing work. Do not reset, force-push, or silently reuse an unrelated branch. State this task ID and intended files before editing. Confirm the lead's PR #44 community-counter helper fix and any subsequent reviewed fixes are included; if still pending, report that dependency and continue independent visual checks. Repeat affected checks after integration.

Record the full tested SHA, dirty/clean state, UTC start time, browser/version, OS, local commands, actual URLs, viewport dimensions, and deployment identity. Verify which SHA the hosted deployment serves; if unavailable, say **deployment SHA unverified**, rather than assigning local HEAD to it. Treat a changing hosted deployment as a separate run.

## Scope and coordination

Allowed fixes: `src/components/landing/**` and `src/components/community/**`, including co-located tests. Allowed evidence: `docs/qa/evidence/LARM_FINAL_BROWSER_QA.md` and meaningful screenshots named `docs/qa/evidence/larm-final-*.png`. Do not edit other documents, fixtures, pet/share components, routes, hooks, global styles, shared interfaces, contracts, configuration, dependencies or lockfiles.

Report issues outside this scope to Deston/Codex with exact reproduction, expected/actual behavior, screenshot and likely owning file. Do not silently broaden the assignment. Stop after two unsuccessful repair attempts and hand off the minimal blocker.

Coordinate with the lead before hosted observation: they are running the real wallet flow. Do not connect/disconnect their wallet, change its account/network, initiate signing, adopt, care, deploy, or merge. Use an independent wallet-free browser session for read-only inspection. Other wallets can change the shared counter; timestamp any observed total and never infer an exact +1 attributable to a transaction without the lead's isolated evidence. Optional public chain reads are read-only observations, not wallet passes.

Keep security alerts enabled. If a warning appears, leave the prompt unapproved and report it; do not switch domains or wallets to bypass it. Never access or capture keys, recovery words, passwords, keystores, or secret environment files.

## Execute the browser matrix

1. Inspect `/`, `/pet`, and the reachable community navigation at **1280×900**, **1440×900**, **390×844**, and **320×740**. Record actual dimensions. Check headings, readable contrast, wrapping, images, button labels/targets, loading and empty states, navigation, horizontal overflow and console errors. Measure document scroll/client widths and visually inspect; a screenshot alone does not prove no overflow.
2. Use keyboard only to test the skip link, navigation, stage selectors and other available controls. Verify visible focus, sensible order, Enter/Space activation and no traps. Do not activate wallet actions. Report screen-reader speech as NOT RUN unless actually tested.
3. Inspect light and dark preferences and both normal/reduced motion. Record whether each came from OS settings or browser emulation, and confirm the effective media query. Check stage transitions, entrances and celebration; reduced motion must preserve meaning. If an override is unavailable, mark that configuration BLOCKED/NOT RUN. Do not claim device testing from viewport emulation or animation testing from CSS inspection alone.
4. Run the local development server and inspect `/dev/landing`, `/dev/pet`, `/dev/community`, visibly labelled **UI preview — fictional data**. Exercise every existing stage, all ten care fixtures, all six community fixtures and available celebration controls. Check U1–U10: final/missing art, callback counters, pending/disabled/retry behavior, UTC cooldown, zero versus unknown, loading/error, above-target counts and missing-target percentages. Fixture clicks must not award progress. If a required fixture is absent, report the gap; do not edit shared fixtures or fabricate live state.
5. Build and start local production. Verify all three `/dev/*` routes return HTTP 404, and repeat on the hosted release. Record each route separately. Verify public `/pet/[address]` viewing without connection: an actually confirmed no-pet address, malformed address, and any available lead-verified pet. Do not assume the lead's address still has no pet.
6. Inspect public-page metadata and follow the actual Open Graph/Twitter image URLs exposed by the page. Check status, image rendering, dimensions, crop/readability, stage/no-pet/unavailable honesty and copy/share controls where available. Do not publish to social platforms; external cache previews remain NOT RUN unless observed.
7. Exercise read failures only in a controlled local environment using supported browser network controls or existing tests. Record the exact method and affected request. Server-side public-page/OG reads may require lead assistance; mark them BLOCKED if the available controls cannot exercise them. Do not alter production or substitute fixtures. Separate every controlled error result from genuine live behavior.

## Verify and hand off

Run the documented `npm run lint`, `npm test`, `npm run build`, and `npm run typecheck`; record exact commands, counts, warnings and failures. Run focused regression tests for meaningful fixes. Do not weaken checks. Contract tests may remain NOT RUN for this UI-only scope; cite existing CI separately without claiming a rerun.

In the evidence file, give every row **PASS / FAIL / NOT RUN / BLOCKED**, with UTC time, source (local preview/local production/hosted/controlled test), SHA or deployment, browser/dimensions/preferences, steps, expected result, actual result, screenshot reference and limits. Preserve failures and historical provenance; never automatically upgrade wallet or acceptance records.

Review `git diff --check` and the complete diff. Commit and push only owned changes after actual checks; open a PR with findings, validation, unresolved dependencies and lead handoffs. Do not merge or deploy. Finish with the PR URL, concise blocker list and readiness assessment, then stop your own servers and restore browser overrides.
