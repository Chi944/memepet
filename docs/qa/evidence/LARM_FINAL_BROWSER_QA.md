# LARM-FINAL-QA — final browser QA

Task **LARM-FINAL-QA**, assigned by `docs/qa/FINAL_BROWSER_QA.md`. Browser
acceptance only. **No wallet was connected, no transaction was signed, nothing
was adopted, cared for, deployed or merged.** Deston/Codex owns the wallet
walkthrough; nothing here upgrades any wallet or acceptance record.

**Outcome.** No defect was found in `src/components/landing/**` or
`src/components/community/**`, so this change is evidence only — no source edit.
Two fixture gaps and four out-of-scope observations are handed off below. The
reduced-motion and animation rows could not be run in this environment and are
marked as such, not passed.

---

## Run context

| Field | Value |
|---|---|
| Task | LARM-FINAL-QA |
| Branch | `qa/larm-final-browser`, created from `origin/main` |
| Tested SHA | `3294618d1a42390899469088d02cd24608ae3296` — the merge of PR #45 |
| Includes | PR #45 (`3294618`, identical to base) and PR #44 counter helper (`94bb362`; compare shows base `ahead`, `behind_by=0`) |
| Tree state | Clean. Fresh extract of the tested SHA into an isolated directory; the only additions are this file and three `larm-final-og-*.png` |
| Start / end (UTC) | 2026-09-24T14:20:36Z → 2026-09-24T14:39:23Z |
| Browser | Chromium 152.0.7977.130 **embedded in the Claude desktop app** 2.7032.0 (UA `… Claude/2.7032.0 Chrome/152.0.7977.130 … MSIX`). Not standalone Chrome. |
| OS | Windows 11 Home 10.0.26200 (UA reports Windows NT 10.0) |
| Device pixel ratio | 1 |
| Node / npm | v24.19.0 / **11.17.0** — `docs/DEV_SETUP.md` pins npm 11.19.x; this is a deviation |
| Hosted URL | https://memepet.vercel.app |

### How the worktree was made

Larm's session has no local clone of this repository, by earlier instruction.
The branch was created on GitHub from `origin/main` via the API, and the tested
SHA was extracted from its tarball into a separate scratch directory, then
installed with `npm ci`. That gives the same isolation as a separate worktree;
no existing checkout or uncommitted work was touched.

### Deployment identity — **deployment SHA unverified**

- GitHub Deployments records the latest **Production** deployment as
  `6639785325` for sha `3294618`, state `success` at 2026-09-24T14:08:42Z. That
  is Vercel's own record and the strongest available indicator.
- It could **not** be proven that `memepet.vercel.app` serves that deployment:
  - Content-hash comparison is inconclusive. 0 of 14 chunk filenames served by
    the hosted page match the local build of the same SHA. Turbopack chunk
    hashes are not reproducible across machines (absolute paths, OS, Vercel
    environment), so this neither proves nor disproves identity.
  - The immutable deployment URL for `6639785325` returns `302` to
    `vercel.com/sso-api` — Vercel Deployment Protection. Not bypassed.
- Hosted results below are therefore labelled **hosted (deployment SHA
  unverified)** and are not assigned the local SHA.

### Local commands

```bash
npm ci
npm run typecheck && npm run lint && npm test && npm run build
npm run dev   -- -p 3200   # local preview
npm run start -- -p 3201   # local production, after build
# controlled read failure: dev server with a dead RPC, see Step 7
```

### Source codes used in the tables

| Code | Meaning |
|---|---|
| **H** | Hosted, https://memepet.vercel.app — deployment SHA unverified |
| **LPROD** | Local production, `next start` of the tested SHA, `http://localhost:3201` |
| **LP** | Local preview, `next dev` of the tested SHA, `http://localhost:3200` — **fictional fixtures** |
| **CT** | Controlled test, `next dev` of the tested SHA on `:3202` with a dead RPC — **not live behaviour** |
| **AUTO** | Automated Vitest run — **not a browser observation** |
| **CHAIN** | Direct read-only `eth_call` to X Layer testnet — not a wallet pass |

Unless stated, browser rows used the embedded Chromium above, effective
`prefers-color-scheme: dark`, `prefers-reduced-motion: no-preference`.

---

## Environment limitation that affects several rows

For most of the session the Claude desktop window was not in the foreground.
The browser tool reported `document.visibilityState === "hidden"` and
screenshots timed out. In a hidden document Chromium does not paint, does not
decode images, and **freezes CSS animation clocks** — measured directly:
`confirmation-arrive` stayed at `currentTime 0` after 1 500 ms.

Layout, DOM, focus, ARIA and network checks do not depend on painting and are
reported normally. Anything that depends on painting — watching an animation,
seeing an image decode in-page, capturing a browser screenshot — is marked
**NOT RUN** where it applies, never inferred.

---

## Chain observations (CHAIN, read-only)

Block **41 800 859**, block time **2026-09-24T14:21:36Z**:

| Read | Result |
|---|---|
| `communityStats(1)` | **1** |
| `petOf(0x2ec8471290793FeB64792861Ce3102d291ce1CA1)` | exists **true**, community 1, careCount **1**, lastCareDay **20720** (UTC day 2026-09-24) |
| `petOf(0x000000000000000000000000000000000000dEaD)` | exists **false** |

The lead's address now has a pet, so the "no pet" assumption from the
23 September audit no longer holds. `0x…dEaD` is used below as the **actually
confirmed no-pet address**.

The total of 1 is recorded here as an observation at that block only; this
run does not attribute it. Attribution is the lead's, and it exists:
[`FINAL_ACCEPTANCE_2026-09-24.md`](FINAL_ACCEPTANCE_2026-09-24.md) records the
adopt and care transactions and exactly one `Cared` event in range, with
matching owner, transaction, receipt and +1 delta.

## Dependency: PR #45 is included but its live behaviour is unverified

PR #45 (`fix: refresh community from confirmed care receipt`) is in the tested
SHA. It fixes a FAIL in `FINAL_ACCEPTANCE_2026-09-24.md`: after the lead's
confirmed care, the community header stayed at 0 for more than two minutes
while the pet showed 10 and the chain total was 1.

That fix can only be observed by performing another care on the fixed release,
which that document states **has not been performed**, and which this task may
not do. What this run did verify is the component side: `CommunityPanel`
renders exactly the value it is given, keeps one live region, and never shows
zero for an unknown or failed read (C1–C7, E1–E3). Whether the hook now
delivers the new total promptly after a receipt remains **NOT RUN** here and
needs the next genuine care — earliest 2026-09-25 00:00 UTC, when the lead's
cooldown ends.

---

## Automated checks (AUTO)

Run 2026-09-24T14:22:10Z → 14:26:52Z against the tested SHA.

| Check | Result | Detail |
|---|---|---|
| `npm run typecheck` | **PASS** | exit 0 |
| `npm run lint` | **PASS** | exit 0; **0 errors, 1 warning**: `@next/next/no-img-element` at `src/components/share/ShareImage.tsx:18:9` — pre-existing, outside this scope, rule not disabled |
| `npm test` | **PASS** | exit 0; **115 passed across 21 files**. Non-failing Vite notice: `vitest.config.ts` uses a feature unsupported by the future `configLoader: 'native'` default |
| `npm run build` | **PASS** | exit 0; Next.js 16.3.5 (Turbopack), compiled in 21.7 s, 12 routes incl. `/pet/[address]` and its OG/Twitter image routes |
| `npm run test:contracts` | **NOT RUN** | UI-only scope, and Foundry is not installed on this machine. The Contracts CI job ran on the merged PRs; that is CI evidence, not a rerun here |

---

## Step 1 — layouts

Pages `/` and `/pet` on **H**, window 14:22–14:25 UTC. Each viewport was set by
browser emulation and confirmed from `innerWidth × innerHeight`. Overflow was
**measured** (`scrollWidth` vs `clientWidth`, plus a sweep of every element's
right edge), not judged from a screenshot.

| ID | Result | Page | Viewport | Actual |
|---|---|---|---|---|
| L1 | **PASS** | `/` | 1280×900 | client 1265 = scroll 1265 (15 px scrollbar); 0 offenders; 1 `h1` "Adopt the meme. Grow the community."; headings h1 → h2 → h3×3 → h2; 1 image loaded, has alt; 11 controls, 0 unnamed; skip link present |
| L2 | **PASS** | `/` | 1440×900 | client 1425 = scroll 1425; 0 offenders; 1 `h1`; 0 broken images; 0 unnamed controls |
| L3 | **PASS** | `/` | 390×844 | client 390 = scroll 390; 0 offenders; 1 `h1`; 0 broken images; 0 unnamed controls |
| L4 | **PASS** | `/` | 320×740 | client 320 = scroll 320; 0 offenders; 1 `h1`; 0 broken images; 0 unnamed controls |
| L5 | **PASS** | `/pet` | 1280×900 | client 1265 = scroll 1265; 1 `h1` "Your pet"; 0 broken images; 9 controls all named, 44–87 px tall; wallet-free state "Wallet: Not installed", "Pet: Connect to view"; no growth line; "Community cares: 1" (live read, matches CHAIN) |
| L6 | **PASS** | `/pet` | 1440×900 | client 1425 = scroll 1425; 0 offenders; 1 `h1`; 0 unnamed controls |
| L7 | **PASS** | `/pet` | 390×844 | client 390 = scroll 390; 0 offenders; 1 `h1`; 0 unnamed controls |
| L8 | **PASS** | `/pet` | 320×740 | client 320 = scroll 320; 0 offenders; 1 `h1`. **Visually inspected** (screenshot taken while the pane was briefly painting): nav fits, heading and lede wrap on word boundaries, two-column status grid readable, no clipping |
| L9 | **PASS** | both | all four | "View source ↗" footer link measures 21 px tall (85×21 desktop, 350/280×21 mobile) — under 24 px, but **passes WCAG 2.5.8 by the spacing exception**: the nearest other target is 1 993 px away. Not a defect |
| L10 | **PASS** | both | all four | Console: 0 error-level messages on `/` and `/pet` |
| L11 | **PASS** | `/` | 1280×900 | Community navigation reachable: `Community` → `/#community` |

**Limits.** Contrast was checked by computing token ratios in the earlier audit
(PR #31); it was not re-measured per viewport here. Mobile rows are viewport
emulation in a desktop browser, **not device testing**.

---

## Step 2 — keyboard only

**H**, 1280×900, window 14:24–14:26 UTC. Tab, Shift-free, Enter and Space via
real key events. After every key press the focused element, `:focus-visible`
and computed outline were read. **No wallet action was activated.**

| ID | Result | Check | Actual |
|---|---|---|---|
| K1 | **PASS** | Skip link is first stop | Tab 1 → `Skip to content` (`href="#main"`), `:focus-visible` true, outline solid 2px |
| K2 | **PASS** | Skip link works | Enter → `location.hash` `#main`, focus on `<main id="main" tabindex="-1">`; next Tab lands on `Meet your pet`, the first control inside main |
| K3 | **PASS** | `/` order and no trap | Skip → MemePet → Overview → Your pet → Community → Meet your pet → How it works → Hatchling → Buddy → Guardian → View source → **wraps to Skip**. 11 stops, every one `:focus-visible` with a 2 px outline |
| K4 | **PASS** | Stage selectors, Space | Space on Buddy: `aria-pressed` Hatchling false / **Buddy true** / Guardian false; stage heading → "Buddy"; image alt → "Mochi, the MemePet buddy mascot"; focus stays on Buddy |
| K5 | **PASS** | Stage selectors, Enter | Enter on Guardian: **Guardian true**, others false; heading and alt update; focus retained |
| K6 | **PASS** | `/pet` order and no trap | Skip → MemePet → Overview → Your pet → Community → Get OKX Wallet → Connect wallet → Connect wallet → View source → **wraps to Skip**. 9 stops, all visible focus. Both `Connect wallet` buttons were reached and **not activated** |
| K7 | **NOT RUN** | Screen-reader speech | No screen reader was run. `aria-live`, `aria-pressed` and names were read from the DOM; that is not speech testing |

---

## Step 3 — colour scheme and motion

| ID | Result | Source | Actual |
|---|---|---|---|
| M1 | **PASS** | H, 1280×900, **browser emulation** `prefers-color-scheme: light` | Effective query confirmed `light`. The app still renders `#000` / `#fafafa`: `:root` sets `color-scheme: dark` and the stylesheets contain **0** `prefers-color-scheme` rules. The UI-OKX-01 design is dark-only by intent, consistently rendered and readable. Not a defect |
| M2 | **PASS** | H, **browser emulation** dark (app default) | Effective query `dark`; same dark rendering |
| M3 | **BLOCKED** | — | **Reduced motion.** The browser tool can emulate colour scheme but has no `prefers-reduced-motion` override, and changing the Windows animation setting is outside what this assistant may do. `matchMedia('(prefers-reduced-motion: reduce)')` was `false` throughout. Needs a human run: Windows Settings → Accessibility → Visual effects → Animation effects **off**, then reload `/dev/pet` and toggle the celebration |
| M4 | **NOT RUN** | LP | **Normal-motion animation.** Not observed: the page was hidden, and the `confirmation-arrive` animation stayed at `currentTime 0` after 1 500 ms. Its keyframes run opacity 0 → 1 with `fill: both`, so the designed end state is visible — but that is from the keyframes, not from watching it play |

Supplementary, **not a pass for M3**. A `@media (prefers-reduced-motion:
reduce)` rule sets `animation: none` on all five elements that animate during
the celebration. Applying `animation: none` to those elements directly left
the celebration message **"MOCHI GREW INTO HATCHLING!"**, the pet art and the
stage label at `opacity 1`; only the decorative, textless glow stayed at 0. So
if the rule applies, the celebration's meaning is not lost. This is a
simulation of the end state, not the media query firing.

---

## Step 4 — development fixtures (LP — fictional data)

All three pages carry the banner **"Developer preview — every value below is
fictional"** and the label **"UI PREVIEW — FICTIONAL DATA"**. Window 14:29–14:36
UTC, 1280×900. Fixtures were driven through the DOM because the pane was
hidden.

### `/dev/community` — all six fixtures

| ID | Result | Fixture | Actual |
|---|---|---|---|
| C1 | **PASS** | Loading | `aria-busy="true"`; "Loading community progress…"; no count, no bar |
| C2 | **PASS** | Zero activity | bar 0/20, fill 0%, valuetext "0 care actions toward a target of 20". A **known zero** — no "Unknown" text |
| C3 | **PASS** | Growing | bar 7/20, fill 35% |
| C4 | **PASS** | Achieved | `aria-valuenow` 20 (capped), fill **100% (capped)**, but valuetext keeps the true count: **"24 care actions toward a target of 20"**; "milestone achieved" |
| C5 | **PASS** | Unavailable | "could not be loaded", "no fictional total"; no bar |
| C6 | **PASS** | Unknown target | "Milestone target unavailable. No percentage can be calculated."; no bar, no percentage |
| C7 | **PASS** | Live region | One `aria-live` region; `aria-busy` true only for Loading |

### `/dev/pet` — every stage, all ten care fixtures, celebration

| ID | Result | Check | Actual |
|---|---|---|---|
| P1 | **PASS** | U1 Hatchling | 10 growth points, "10 of 20 points toward Buddy", next stage 20, bar 10/20 named "Growth toward next stage", alt "Mochi, the hatchling pet" |
| P2 | **PASS** | U1 Buddy | 20 points, "20 of 50 toward Guardian", bar 20/50, alt updated |
| P3 | **PASS** | U2 Guardian (final) | "Guardian is the final stage", "Final stage."; **no bar, no "Next stage"**; no `NaN`, `Infinity`, `undefined` or `null` in the page |
| P4 | **BLOCKED** | U3 missing art | **Fixture gap** — no pet fixture has `artSrc: null`, so the missing-art placeholder cannot be reached in the preview. Shared fixtures not edited. See handoff G1 |
| P5 | **PASS** | U4 Ready | "Care for Mochi" → `onCare` 0 → 1 only; growth unchanged |
| P6 | **PASS** | U4 Needs wallet | "Connect wallet" → `onConnect` 0 → 1 only; growth unchanged |
| P7 | **PASS** | U4 Wrong network | "Switch network" → `onSwitchNetwork` 0 → 1 only; growth unchanged |
| P8 | **PASS** | Cooldown | "Care unavailable", disabled; "available again at Jan 2, 2030, 12:00 AM **UTC**" |
| P9 | **PASS** | U5 Awaiting signature | disabled; "No progress has been awarded." |
| P10 | **PASS** | U5 Submitting | disabled; "Progress is not confirmed yet." |
| P11 | **PASS** | U5 Pending | disabled; "No progress has been awarded yet."; hash shown is the fictional `UI_FIXTURE_NOT_A_REAL_HASH` |
| P12 | **PASS** | Success | chip "Confirmed"; no button |
| P13 | **PASS** | U6 Rejected | "You declined the wallet request. No progress was awarded."; "Try care again" → `onCare` 1 → 2 only; growth unchanged |
| P14 | **PASS** | U6 Unavailable | message only; **no button**, so no care is offered |
| P15 | **PASS** | Disabled controls inert | Clicking disabled Pending, Cooldown and Awaiting-signature buttons — via both `.click()` and a dispatched `MouseEvent` — left every counter unchanged |
| P16 | **PASS** | Fixtures award nothing | Growth stayed "10 growth points" across every click in P5–P13 and while celebrating |
| P17 | **PASS** | Celebration toggle | Off: no celebration element. On: celebration renders, growth unchanged. Five descendants carry one-shot animations (glow 1.2 s, arrive 0.8 s, lift 0.9 s, confirmation 0.4 s, stage reveal 1 s) |
| P18 | **NOT RUN** | Celebration animation plays | See M4 — animation clock frozen in a hidden page |

### `/dev/landing`

| ID | Result | Check | Actual |
|---|---|---|---|
| D1 | **PASS** | Callback | "Meet your pet" → `onGetStarted` +1 per click (1 → 2 → 3); page stays on `/dev/landing` |
| D2 | **PASS** | Stage selectors isolated | Clicking Buddy did not change `onGetStarted` |
| D3 | **PASS** (observation) | Headings | Two `h1`s: the preview title "Landing component preview" (`LandingPreview.tsx:15`) and the hero headline. Not a WCAG failure, on a page that 404s in production; production `/` has exactly one `h1` (L1). Demoting the preview title would put an `h2` above an `h1`, a worse order. Left as is |

---

## Step 5 — production preview exclusion and public pet pages

| ID | Result | Source | UTC | Actual |
|---|---|---|---|---|
| X1 | **PASS** | LPROD | 14:28:00Z | `/dev/landing` HTTP **404**, no fixture text in body |
| X2 | **PASS** | LPROD | 14:28:00Z | `/dev/pet` HTTP **404**, no fixture text |
| X3 | **PASS** | LPROD | 14:28:00Z | `/dev/community` HTTP **404**, no fixture text |
| X4 | **PASS** | H | 14:26:54Z | `/dev/landing` HTTP **404**, no fixture text |
| X5 | **PASS** | H | 14:26:54Z | `/dev/pet` HTTP **404**, no fixture text |
| X6 | **PASS** | H | 14:26:54Z | `/dev/community` HTTP **404**, no fixture text |
| X7 | **PASS** | LPROD | 14:28 | `/pet/0x…dEaD` (confirmed no-pet): HTTP 200; `h1` "Pet of 0x0000…dEaD"; "This wallet has not adopted a pet. The registry read succeeded and reported that no pet exists for this address. Nothing fictional is shown in its place."; no growth, no care control |
| X8 | **PASS** | LPROD | 14:28 | `/pet/0x2ec8…1CA1` (lead's pet, per CHAIN): HTTP 200; "Live", "Hatchling (current stage)", "Stage: Hatchling", **"10 growth points"**, "10 of 20 points toward Buddy" — matches careCount 1; **no care, adopt or connect control** |
| X9 | **PASS** | LPROD | 14:28 | Lower-case `0x2ec8…1ca1`: HTTP 200, same pet |
| X10 | **PASS** | LPROD | 14:28 | Malformed `not-an-address`: HTTP **404** |
| X11 | **PASS** | LPROD | 14:28 | Malformed `0x123`: HTTP **404** |
| X12 | **NOT RUN** | LPROD | 14:30 | In-page pet image on X8 rendered. The `<img>` reported `naturalWidth 0` and `decode()` never settled — consistent with the hidden page, not a broken image. The asset itself was fetched: **200, valid PNG, 640×640, 53 372 bytes**, byte-identical in size on H |

---

## Step 6 — metadata and share images

Each page's actual `og:image` and `twitter:image` URLs were followed.

| ID | Result | Source | Actual |
|---|---|---|---|
| O1 | **PASS** | H | `/`: `og:image` and `twitter:image` → HTTP 200 `image/png` **1200×630** (299 577 B), matching the declared width/height; `twitter:card` `summary_large_image` |
| O2 | **PASS** | H | `/pet/0x2ec8…1CA1`: both images 200 PNG **1200×630** (278 182 B). Viewed: **"Mochi · Hatchling · 10 growth points · 0x2ec8…1CA1"**, mascot fully in frame, readable. Matches CHAIN. Evidence: `larm-final-og-pet.png` |
| O3 | **PASS** | H | `/pet/0x…dEaD`: both images 200 PNG **1200×630** (33 544 B). Viewed: **"No pet yet · This wallet has not adopted a pet · 0x0000…dEaD"** — no mascot, no fabricated pet. Evidence: `larm-final-og-no-pet.png` |
| O4 | **PASS** | LPROD | Same three images fetched from `:3201` directly: identical byte sizes to H |
| O5 | **PASS** | H | `og:title` bytes contain a correct UTF-8 em dash (`E2 80 94`) and no replacement character. A `�` seen during the run was the Windows console, not the page |
| O6 | **NOT RUN** | — | Copy/share controls: no share or copy-link control was reached without a connected wallet on `/pet`, and the public page exposes none |
| O7 | **NOT RUN** | — | External social-platform cache previews. Nothing was published |

`larm-final-og-*.png` are the **served PNG bytes** fetched from the URLs above,
not browser screenshots.

---

## Step 7 — controlled read failures (CT — not live behaviour)

**Method.** A separate `next dev` of the tested SHA on `:3202`, started with
public, non-secret configuration: the real registry address and chain id 1952,
but `NEXT_PUBLIC_MEMEPET_RPC_URL=http://127.0.0.1:9`, an address nothing
listens on, so every registry read fails for real through the unmodified code
path. No fixture was substituted and production was not touched. No existing
environment file was read or printed. Window 14:36–14:39 UTC.

| ID | Result | Page | Affected request | Actual |
|---|---|---|---|---|
| E1 | **PASS** | `/` | client `eth_call` `communityStats(1)` → `http://127.0.0.1:9/` | Badge "Unknown"; "Community care total could not be loaded. No preview data is shown. Live progress is unavailable; no fictional total is shown."; **no "0"**, no bar; `aria-busy` false (resolved to error, not stuck) |
| E2 | **PASS** | `/` | same | Retries **bounded**: 8 requests, still 8 after a further 8 s. Consistent with viem's default retries under dev-mode double effects; resolves to the error state |
| E3 | **PASS** | `/pet` | same | "Community cares: **Unknown**", not 0; no growth line |
| E4 | **PASS** | `/pet/0x2ec8…1CA1` | **server-side** `petOf` during render | Badge "Not read"; "The pet could not be loaded. This wallet's pet could not be read from the registry. No preview pet is shown." **Does not claim "has not adopted a pet"** — that pet exists on chain, so read-failed is correctly kept distinct from no-pet. No stage, no growth |
| E5 | **PASS** | `/pet/0x2ec8…1CA1/opengraph-image` | **server-side** read during image render | 200 PNG 1200×630. Viewed: **"Read failed · The registry read failed. No pet is shown."** Evidence: `larm-final-og-read-failed.png` |

The assignment anticipated that server-side public-page and OG reads might need
the lead's help. The environment override made them controllable locally, so
E4 and E5 were run rather than marked BLOCKED.

Share images therefore have three distinct, honest states — a real pet
(O2), no pet (O3) and a failed read (E5) — and none invents data.

---

## Fixture gaps — for Deston/Codex

Shared fixtures are outside this task's allowlist and were not edited.

**G1 — no missing-art pet fixture.** `src/fixtures/ui-fixtures.ts` has no pet
with `artSrc: null`, so checklist item **U3** cannot be exercised in
`/dev/pet`. *Expected:* a fixture that renders PetScene's missing-art
placeholder. *Actual:* all three pet fixtures point at real PNGs. Note that
live data cannot reach the placeholder either — `map-pet.ts` always assigns
art from `STAGE_ART` — so today the placeholder is covered by no browser
path at all. *Owner:* `src/fixtures/ui-fixtures.ts`.

**G2 — no unknown-total community fixture.** None of the six community
fixtures has `totalCareActions: null` without an error, so the "Care actions:
Unknown" branch of `CommunityPanel` cannot be reached in `/dev/community`. It
**is** covered by `CommunityPanel.test.tsx` ("treats a null total as unknown,
not zero"), and E1/E3 show the live error path. *Owner:*
`src/fixtures/ui-fixtures.ts`.

## Observations outside scope — for Deston/Codex

None of these is a defect in the sense of misleading a user; all are low
priority and none should compete with submission work.

**H1 — public pet pages share site-wide OG text.** On `/pet/[address]` the
`<title>` is pet-specific ("Pet of 0x2ec8…1CA1 · MemePet"), but `og:title` and
`og:description` fall back to the site defaults. The share *image* is
pet-specific, so a shared link shows the right card under generic text.
*Reproduce:* view source of `/pet/0x2ec8…1CA1`, read `og:title`. *Likely
owner:* `generateMetadata` in `src/app/pet/[address]/page.tsx`.

**H2 — `og:description` uses retired hero copy.** It reads "…add to shared
habitat progress", which the visible hero replaced in PR #25 ("…watch the
community's shared habitat grow alongside it"). *Likely owner:*
`src/app/layout.tsx` metadata.

**H3 — share images keep the old light theme.** The OG cards use a light
pastel palette while the app is now dark monochrome with lime (UI-OKX-01).
Readable and honest; a brand-consistency note only. *Likely owner:*
`src/components/share/**`, `src/lib/og-art.ts`.

**H4 — local OG URLs are absolute to port 3000.** Served from `next start` on
another port, `og:image` points at `http://localhost:3000/…` and does not
resolve. Local-only; hosted URLs are correct. Informational.

---

## Readiness

- **Landing and community components: ready.** Every row in scope passed at
  four viewports, by keyboard, across all fixtures, and under a real read
  failure. No change was needed.
- **Honesty invariants hold in the browser** — unknown is never shown as zero,
  a failed read is never shown as "no pet", fixtures never award progress, and
  `/dev/*` is 404 in local production and on the hosted site.
- **Still open, and not closable from this environment:** reduced-motion (M3,
  needs a human to switch the OS setting) and watching animations and in-page
  images paint (M4, P18, X12, need the window in the foreground).
- **Pending on a genuine care:** PR #45's prompt community refresh after a
  confirmed receipt. Included in the tested SHA, not yet observed by anyone.
- **Not in this task:** the genuine wallet walkthrough, which remains the
  critical path and is Deston/Codex's.
