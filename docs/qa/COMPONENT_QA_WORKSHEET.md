# Component / fixture QA worksheet (U1–U10)

Covers the **component / fixture checks** row of `docs/QA_CHECKLIST.md`
(U1–U10). `docs/qa/BROWSER_WALKTHROUGH.md` and `docs/qa/evidence/` cover the
**integrated application** checks (I1–I14) against a live Anvil registry —
this sheet is scoped to the isolated developer previews only:
`/dev/pet`, `/dev/community` (and `/dev/landing` for context).

These are fixture-only checks. A preview rendering correctly proves the
component honours its props; it does **not** prove the live integration
behaves the same way — see `BROWSER_WALKTHROUGH.md` and `evidence/OBSERVATIONS.md`
for that evidence.

Fill **Actual result** only after you run the step. Leave blank until then.
Do not mark Pass/Fail in advance.

**Setup:**

1. `npm run dev`, open `http://localhost:3000/dev/pet` and `/dev/community`.
2. Use each preview's state selector to switch between the fixtures named
   below (see `src/fixtures/ui-fixtures.ts` for the exact fixture names).
3. Check both light and dark scheme, and both ~390px and desktop width for
   every row that touches layout.
4. Enable OS-level "reduce motion" for U10.

---

### U1 — Render each pet stage

| | |
|---|---|
| **Steps** | In `PetPreview` (`/dev/pet`), select the hatchling fixture, then buddy, then guardian. |
| **Expected** | Each stage shows the correct supplied art (or placeholder), `displayName`, `communityName`, `stage` label and `growthPoints`. Progress-to-next-stage uses the supplied `nextStageAt`. |
| **Actual result** | |
| **Pass / Fail** | |
| **Notes** | |

### U2 — Render final stage (no next-stage target)

| | |
|---|---|
| **Steps** | Select the guardian (final-stage) fixture where `nextStageAt` is `null`. |
| **Expected** | A final-stage message is shown instead of a progress-to-next-stage calculation. No divide-by-zero, no `NaN`/`Infinity` in the UI. |
| **Actual result** | |
| **Pass / Fail** | |
| **Notes** | |

### U3 — Render missing art

| | |
|---|---|
| **Steps** | Select (or construct) a fixture where `artSrc` is `null`. |
| **Expected** | An intentional, accessible placeholder is shown — not a broken-image icon — with meaningful alt text. |
| **Actual result** | |
| **Pass / Fail** | |
| **Notes** | |

### U4 — Care callbacks route correctly

| | |
|---|---|
| **Steps** | In the CarePanel section of the preview, use the callback counters. Click Care in the `ready` state, Connect in `needs-wallet`, Switch network in `wrong-network`. |
| **Expected** | Each button invokes only its own supplied callback (`onCare` / `onConnect` / `onSwitchNetwork`); the counters shown are the preview's own click counters, not component-owned progress. Growth points shown come from props only, never incremented by the click itself. |
| **Actual result** | |
| **Pass / Fail** | |
| **Notes** | |

### U5 — Pending / awaiting-signature / submitting states

| | |
|---|---|
| **Steps** | Select each of `awaiting-signature`, `submitting`, and `pending` (with a fixture `transactionHash`) in the CarePanel preview. Click Care repeatedly in each. |
| **Expected** | Each state has a distinct, honest label. Care is disabled in all three. No success animation or growth award appears while in these states. Repeated clicks do not fire `onCare` again while disabled. |
| **Actual result** | |
| **Pass / Fail** | |
| **Notes** | |

### U6 — Error and unavailable states

| | |
|---|---|
| **Steps** | Select `error` (with a fixture message) and `unavailable` (with a fixture message) in the CarePanel preview. |
| **Expected** | `error` shows the supplied message and a retry control that invokes `onCare`. `unavailable` shows the supplied message only — no guessed balance, eligibility, or retry that would submit care. |
| **Actual result** | |
| **Pass / Fail** | |
| **Notes** | |

### U7 — Community zero vs. unknown

| | |
|---|---|
| **Steps** | In `CommunityPreview` (`/dev/community`), select a fixture with `totalCareActions: 0`, then a fixture with `totalCareActions: null`. |
| **Expected** | `0` renders as an explicit, confirmed zero. `null` renders as a distinct "unknown" state (not a `0` and not an empty bar that reads as zero). |
| **Actual result** | |
| **Pass / Fail** | |
| **Notes** | |

### U8 — Above-target / missing-target total

| | |
|---|---|
| **Steps** | Select a fixture where `totalCareActions` exceeds `milestoneTarget` (e.g. 24 of 20). Then select a fixture where `milestoneTarget` is `null`. |
| **Expected** | The progress fill is visually capped at 100% while the actual count text still shows the true number (e.g. "24"). With a `null` target, no percentage/fill is fabricated — a clear unavailable-goal message is shown instead. |
| **Actual result** | |
| **Pass / Fail** | |
| **Notes** | |

### U9 — Mobile and keyboard

| | |
|---|---|
| **Steps** | At 390px width, tab through `/dev/pet` and `/dev/community` using only the keyboard. |
| **Expected** | No horizontal overflow (`document.documentElement.scrollWidth === clientWidth`). Every interactive control (state selectors, Care/Connect/Switch/Retry buttons) is reachable by Tab and has a visible focus ring. |
| **Actual result** | |
| **Pass / Fail** | |
| **Notes** | |

### U10 — Reduced motion

| | |
|---|---|
| **Steps** | Enable OS "reduce motion". Reload `/dev/pet`. Trigger the `celebrate` state in the PetScene preview. |
| **Expected** | Non-essential pet idle motion and the celebration animation are suppressed or significantly reduced; no essential information is conveyed only through motion. |
| **Actual result** | |
| **Pass / Fail** | |
| **Notes** | |

---

## Out of scope for this sheet

- Anything requiring a real wallet signature or a live chain read — see
  `BROWSER_WALKTHROUGH.md` and `evidence/OBSERVATIONS.md`.
- `/dev/landing` copy and callback checks — a `LandingHero` has only one
  callback (`onGetStarted`); spot-check it alongside U9 rather than as a
  separate numbered row.
- Editing `src/components/pet|landing|community/**` to fix a defect found
  here — file a bug against the owning area instead of fixing it in this doc.