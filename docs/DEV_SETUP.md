# MemePet development setup

## Verified environment

- Application directory: repository root (`memepet/`).
- Framework: Next.js 16.3.5 App Router with TypeScript and `src/`.
- Supported Node: 24.19.x (`.nvmrc` pins 24.19.0; package engines require
  Node 24.15 or newer within major 24).
- Package manager: npm 11.19.x (`packageManager` pins 11.19.0).
- Environment variables: none required for L0/L1 or their previews. L2 slice 1
  local Anvil verification uses the public `NEXT_PUBLIC_MEMEPET_*` keys listed
  in `.env.example` (never private keys).
- Current branch: `main` for teammates. Lead L2 wallet/adopt work ships from
  `feat/l2-wallet-adopt`.
- Baseline commit: merged L1 + product UI on `main`.
- Hosted repository: `https://github.com/Chi944/memepet`.

## Install and run

From the repository root:

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`. Stop the server with `Ctrl+C`.

The standard commands are:

```bash
npm run typecheck
npm run lint
npm test
npm run build
npm run start
```

`npm test` uses `vitest run`, so it exits after one non-interactive run.
Contract tests use Foundry (`forge` 1.8.3). Install Foundry, then:

```bash
cd contracts
forge install foundry-rs/forge-std --no-commit --no-git
cd ..
npm run test:contracts
```

## Wallet-free UI previews

Every preview displays **UI preview — fictional data** and uses only
`src/fixtures/ui-fixtures.ts`.

- `http://localhost:3000/dev/pet`
  - Select Hatchling, Buddy, or Guardian.
  - Select every supplied care state.
  - Toggle the presentation-only celebration.
  - Inspect local `onCare`, `onConnect`, and `onSwitchNetwork` counters.
  - Counters do not simulate a transaction or award growth.
- `http://localhost:3000/dev/landing`
  - Render `LandingHero`.
  - Press **Meet your pet** and inspect the local `onGetStarted` counter.
- `http://localhost:3000/dev/community`
  - Select Loading, Zero activity, Growing, Achieved, Unavailable, or
    Unknown target.
  - Unknown totals remain unknown, achieved totals keep their true count, and
    missing targets do not produce percentages.

These previews require no wallet, RPC endpoint, API key, private key, backend,
or external service.

## Local Anvil (L2 slice 1)

Committed `src/lib/deployment.ts` stays `not-deployed` until an authorized
network address is recorded. For local verification only:

1. Start Anvil: `anvil` (chain id 31337, RPC `http://127.0.0.1:8545`).
2. Deploy: from `contracts/`,
   `forge create src/PetRegistry.sol:PetRegistry --rpc-url http://127.0.0.1:8545 --private-key <anvil-account-key> --broadcast`.
3. Copy `.env.example` to `.env.local`, set `NEXT_PUBLIC_MEMEPET_*` to the Anvil
   values and the printed registry address, then restart `npm run dev`
   (rebuild if using `npm run build` / `npm run start` — public env is baked
   into the client bundle at build time).
4. Open `/pet`, connect an injected wallet on chain 31337, adopt, refresh.

Do not commit `.env.local` or any private key.

## Actual verification

### L0 baseline (20 September 2026, Node 24.19.0, npm 11.19.0)

- `npm ci` — passed; installed 439 packages from `package-lock.json`.
- `npm run typecheck` — passed with no TypeScript errors.
- `npm run lint` — passed with no ESLint findings.
- `npm test` — passed.
- `npm run build` — passed.
- `npm run start -- --hostname 127.0.0.1 --port 3100` — started successfully.

### Design and audit pass (20 September 2026, same toolchain)

Re-run after the UI/UX pass on the same day:

- `npm run typecheck` — passed, exit 0, no output.
- `npm run lint` — passed, exit 0, no findings.
- `npm test` — passed: 5 test files, 20 tests.
- `npm run build` — passed; routes `/`, `/_not-found`, `/dev/*`, `/icon.svg`,
  `/pet` generated.
- `npm run start -- --hostname 127.0.0.1 --port 3200` — started successfully.

The production server returned:

- `/` — HTTP 200
- `/pet` — HTTP 200
- `/icon.svg` — HTTP 200
- `/dev/pet` — HTTP 404
- `/dev/landing` — HTTP 404
- `/dev/community` — HTTP 404

The `/dev` layout calls `notFound()` in production before returning preview
children. Hiding links is not the gate. The production home page contains no
preview links (`grep` count 0) and still explains why care totals are unknown.

`npm run test:contracts` — **passed: 9 tests, 0 failed** (forge 1.8.3).

Foundry was already installed at `%USERPROFILE%\.foundry\bin` but that
directory was not on PATH, so `forge` appeared to be missing. Adding it to the
persistent user PATH fixed it; no reinstall was needed. If `forge` is not found
in a new shell, check PATH before reinstalling.

`anvil` was smoke-tested on port 8545 and responded with chain id 31337. It is
available for the local-node work in L2 slice 1.

### L2 slice 1 — wallet + adopt (20 September 2026)

Automated:

- `npm run typecheck` — passed.
- `npm run lint` — passed.
- `npm test` — passed: 7 files, 29 tests (includes map-pet + care-action-machine).
- `npm run build` — passed.
- `npm run test:contracts` — passed: 9/9.

Anvil (existing node on 8545, forge 1.8.3):

- Deployed `PetRegistry` to `0x5FbDB2315678afecb367f032d93F642f64180aa3`
  (local only; not committed into `deployment.ts`).
- `petOf` before adopt: `exists=false`.
- `adopt(1)` receipt status success.
- `petOf` after adopt: `exists=true`, communityId=1, careCount=0.

Browser wallet connect/adopt/refresh against MetaMask was not automated in this
pass; use the Local Anvil steps above for that journey.

Browser checks were run with Playwright at 390px and 1280px, in light and
dark colour schemes:

- Home: hero, how-it-works steps and community panel rendered; at 390px
  `document.documentElement.scrollWidth` equalled `clientWidth` (375), so there
  is no horizontal overflow.
- Pet home (`/pet`): renders the not-live explanation plus the rules it will
  enforce, and offers a route back to the overview.
- Pet preview: stage and care-state selectors rendered; the stage trail marks
  the current stage; the care callback counter increased without changing
  growth.
- Community preview: Achieved displayed 24 actions toward a 20-action target
  with the visual bar capped; Unknown target omitted percentage progress and
  showed the hatched indeterminate track instead of an empty bar.
- Console on the production home page: 0 errors and 0 warnings.

The earlier `/favicon.ico` 404 is fixed by `src/app/icon.svg`, which Next.js
serves and links as `<link rel="icon" … type="image/svg+xml">`. A direct
request to `/favicon.ico` still 404s, which is expected when an SVG icon is
declared.

## Known setup messages

- npm reports ESLint 9.39.5 as deprecated. ESLint 10.11.0 was tried first but
  crashes inside the React plugin bundled by `eslint-config-next` 16.3.5.
  The baseline therefore uses the version generated by the official Next.js
  16.3.5 scaffold. No lint rules were disabled.
- Vitest reports that a future Vite native config loader will prefer an ESM
  config file. Tests pass today; this is a forward-looking warning, not a
  failed check.
- npm may mention an unapproved optional `unrs-resolver` install script. The
  clean install and every configured check completed successfully without
  approving that script.
- On Windows, `npm ci` can report `EPERM` if a local Next.js server is still
  running. Stop `npm run dev` or `npm run start`, then retry.
- If the port is occupied, stop the previous server rather than starting a
  second copy.
- If Node or npm versions differ, install Node 24.19.x and rerun `npm ci`.

## Ownership after L0

- Teammate A owns `src/components/pet/**`, `public/pets/**`, and
  `docs/pet-assets.md`.
- Teammate B owns `src/components/landing/**`, `src/components/community/**`,
  `docs/qa/**`, and `docs/demo/**`.
- The lead owns routes, shared UI, types, fixtures, packages, global styles,
  integration, contracts, and deployment.

Teammates should not independently edit routes, shared types, shared fixtures,
shared UI, global styles, package files, or build configuration.

## Teammate A — pet work

Start from `main`:

1. Clone the repository, run `npm ci`, then `npm run dev`.
2. Open `http://localhost:3000/dev/pet`.
3. The lead already added PetScene stage labels, idle motion, reduced-motion
   handling, placeholders, and tests. Do not rebuild that from scratch.
4. Generate the three stage images using the prompts in `docs/pet-assets.md`.
   Paste the PNGs back to the lead. Do not invent filenames in fixtures.
5. After approved files are in `public/pets/`, continue A3 polish on
   `feat/a3-pet-art`.

Do not change routes, fixtures, types, packages, wallet code, or global styles.

## Teammate B — start B1 only

Start from `main`:

1. Clone the repository and run `npm ci`, then `npm run dev`.
2. Open `http://localhost:3000/dev/landing`.
3. Create branch `feat/b1-landing-hero`.
4. Improve only `LandingHero` and `LandingPreview` within the B1 allowlist,
   keeping the existing `LandingHeroProps`.
5. Run the documented checks, inspect 390px and desktop layouts, and submit the
   branch or pull request to the lead with screenshots and actual results.

Do not change routes, fixtures, types, packages, wallet code, contracts, or
global styles. Teammate B has not yet confirmed running this baseline.
