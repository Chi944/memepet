# MemePet project instructions

Read `docs/PROJECT_BRIEF.md`, `docs/OWNERSHIP.md`, `docs/DEV_SETUP.md` and the assigned task before editing. Inspect existing files. Do not invent a repository structure when the real one differs.

## Working rules

- Work on exactly one assigned task and feature branch. State the task ID and intended files before editing.
- Stay within the task's allowed paths. A dependency outside them is a blocker to report, not permission to change it.
- Only the lead changes contracts, wallet/data hooks, routes, shared types, shared fixtures, global styles, dependencies, lockfiles, build configuration or deployment settings unless explicitly delegated.
- Do not create another application, backend, database, token, NFT system or authentication service.
- Reuse installed libraries and shared UI. Do not add packages without the lead's approval.
- Do not read secret files, print environment values, request seed phrases/private keys, or place credentials in code, logs, screenshots or prompts. Public addresses are not signing credentials.
- Do not deploy, sign transactions, merge, force-push or run destructive commands without explicit human authorization for that action. Never modify another person's uncommitted work.
- UI components accept the agreed props and callbacks. They do not import wallet libraries, call RPC/API endpoints, award progress, or persist confirmed game state.
- Fixtures are fictional and belong only in clearly labeled development previews/tests. Never silently replace failed live reads with fixtures.
- Run the checks documented in DEV_SETUP. Never remove tests, weaken types or disable lint/build checks to manufacture a pass.
- Report exact commands and actual results. An unrun check is “not run,” not “passed.” Report browser checks separately from automated checks.
- Stop after two unsuccessful repair attempts and give a minimal reproduction and blocker report instead of widening scope.

## Handoff

Return the task ID, changed files, behavior delivered, actual checks, screenshots or viewing steps, known limitations, and any requested lead integration. Explain the change in plain language.

## Code review rules

Flag out-of-scope edits, secret exposure, new dependencies, fake live data, early success before transaction confirmation, unsafe HTML rendering, unhandled errors and missing empty/error states. These instructions guide behavior; they do not replace sandboxing, access controls or human review.
