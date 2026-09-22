# UI-OKX-01 — visual polish and browser QA

Date: 22 September 2026. Branch: `feat/okx-ui-polish`.

## Design direction

Reference: [OKX Wallet](https://web3.okx.com/), inspected in Chrome. MemePet keeps its own name, original pixel-pet mark, and approved mascot artwork; no OKX logo or affiliation claim was added.

- Black `#000000`, surface `#111111`, white `#fafafa`, secondary text `#b3b3b3`, border `#292929`, lime `#c6ff00`.
- Geist for display and body, Geist Mono for utility data. Large left-aligned headline with a stage-art showcase beside it; stacked content on phones.
- A restrained interface lets the existing mascot be the expressive element. Flat surfaces, clear primary actions, a visible navigation state, and a compact shared-progress panel.
- Finite hero/stage entrances, interaction feedback, genuine progress transitions, and confirmed-stage celebration. Reduced motion disables or shortens these effects. No animation awards progress.

## Delivered

Updated shared shell, navigation, typography, favicon and social-preview palette; landing-stage selector; responsive how-it-works, pet and community layouts; and clearer empty/error/waiting states. Stage selection is explicitly labelled artwork and does not alter a wallet pet. Missing wallet guidance explains the next step. Gas wording replaces the misleading statement that nothing leaves a wallet.

No packages, contracts, hooks, shared state types, deployment settings, or wallet transaction behavior changed.

## Actual browser verification

Chrome, local app at `http://127.0.0.1:3300`, using explicit public X Layer testnet configuration.

- Landing: Hatchling, Buddy, and Guardian selection updates the illustration, selected state and explanatory copy. The main action navigates to `/pet`.
- Responsive DOM checks: viewport requests 320, 390 and 768 pixels had content widths 305, 375 and 753 (scrollbar excluded), respectively; page scroll width matched each content width after fixing the 320-pixel minimum-width overflow. Desktop and one 390-pixel how-it-works view were visually inspected. Subsequent narrow-viewport screenshots timed out in browser tooling; those screenshots are not claimed as captured.
- Browser reports `prefers-reduced-motion: reduce`; computed landing entrance duration was `1e-06s`, and pet preview had no active animation names. Standard-motion timing was reviewed in CSS, not visually asserted under a changed OS preference.
- Real `/pet`: wallet not installed; pet says “Connect to view,” chain unknown, mascot explicitly labelled illustration, no growth data displayed. Clicking Connect wallet genuinely returned “No injected wallet was found.” No connection, signature, adoption or care passed.
- Development-only pet preview: Guardian and pending view visually inspected; all supplied care states inspected through real selector interactions. Pending remained unconfirmed, rejection awarded nothing, cooldown disabled care. These are fictional presentation checks, not wallet checks.
- Development-only community preview: loading, zero, growing, achieved, unavailable and unknown-target states inspected. Above-target count remained 24 against a target of 20; unknown target did not become a fabricated percentage.
- Captured browser error log was empty for community preview. The dev server later reported a Turbopack HMR cache panic during hot edits; production build/start succeeded after stopping the dev server. No configuration workaround was introduced.

## Automated and production checks

- `npm run lint`: passed.
- `npm test`: passed, 73 tests in 15 files.
- `npm run build`: passed.
- `npm run typecheck`: passed.
- `git diff --check`: passed; only Git line-ending notices.
- `npm run start -- --hostname 127.0.0.1 --port 3300`: started.
- Production HTTP: `/` and `/pet` 200; `/dev/pet`, `/dev/landing`, `/dev/community` and `/pet/not-an-address` 404.
- Contract tests are not rerun locally for presentation-only edits; repository CI remains required before integration.

Final hosted checks are reported in the pull request and task response. Wallet walkthrough evidence from the submission pack remains blocked and is not upgraded by this UI pass.
