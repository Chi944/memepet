# Deston's first coding-agent message — L0 only

Paste this into one coding agent, with the repository folder open.
This prompt is for building the local baseline, not creating a second app elsewhere.

---

I am Deston, lead for MemePet. Work on L0 only, on branch chore/l0-foundation.
Read AGENTS.md, docs/PROJECT_BRIEF.md, docs/OWNERSHIP.md, docs/DEV_SETUP.md,
docs/prompt-packs/DESTON.md, src/types/view-models.ts, and src/fixtures/ui-fixtures.ts.
Inspect this repository first. It may contain only starter instructions and proposed
types, not an application. Do not overwrite an existing app or uncommitted work.

Build one minimal Next.js App Router / TypeScript application in this repository root
with a src directory. Keep the existing docs and agreed interfaces. Use npm for a new
app; preserve an existing working package manager if one is already present. Verify
current stable dependency requirements from official documentation and propose the
smallest dependencies and checks before installation. Wait for my dependency approval,
then implement the approved baseline, not the complete game. Do not blindly scaffold
into this non-empty root; use a safe temporary scaffold and deliberately integrate it
without deleting these files if the scaffolder requires an empty directory.

Create shared Button/Card styling and component shells with the exports and props in
OWNERSHIP.md. Create /dev/pet, /dev/landing, and /dev/community with visible
"UI preview — fictional data" labels, selectable fixture states, and callback counters.
These must run without wallets, tokens, private keys, RPC credentials, or API keys.
Provide an honest placeholder homepage rather than fake live game activity.

Exclude preview routes from production and verify they return 404 in a production
server. Do not import fixtures into any production game/data controller. A production
build succeeding is not, by itself, evidence that preview routes are inaccessible.

Configure and actually run typecheck, lint, tests, and build. Include one working example
component test using the approved test setup. Record required Node/npm versions, actual
commands and results in docs/DEV_SETUP.md. Run a local browser check of each preview when
available; otherwise mark browser checks NOT RUN. Do not weaken tests or types to pass.

Do not add blockchain packages, contracts, wallet connection, a database, payments,
a token, API integrations, sharing infrastructure, or deployments in L0.

Return changed files, actual checks, preview instructions, remaining blockers, and a
small handoff telling Kym how to start A1 and Larm how to start B1. Do not automatically
merge, push, or deploy. I will review the result first.
