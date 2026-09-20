# Teammate A — pet experience

## Your job

Own how the pet looks, reacts and communicates its care status. You are contributing working interface code and visual assets, not just writing prompts. The lead owns transactions and progress. You never need wallet secrets to build this feature.

Start only after the lead demonstrates `/dev/pet` in your local copy and completes a first branch/commit/review with you. Read PROJECT_BRIEF and OWNERSHIP. Ask your coding agent to explain unfamiliar terms before approving changes.

## A1 — Pet scene, no wallet logic

**Allowed:** `src/components/pet/PetScene.tsx`, pet-scene styles/helpers/tests in that folder, and `PetPreview.tsx`. Assets and their provenance are covered separately below.

**Read-only inputs:** `src/types/view-models.ts`, `src/fixtures/ui-fixtures.ts`, approved design references and shared UI. Keep the agreed `PetSceneProps` interface.

**Prompt**

> Read AGENTS.md, docs/PROJECT_BRIEF.md, docs/OWNERSHIP.md, docs/DEV_SETUP.md and the existing PetScene/PetPreview shells. Implement task A1 only. First explain the task to me in plain language and list the files you intend to edit. Stay in the A1 allowlist. Do not edit types, routes, shared fixtures, global styles, package files, wallet code or contracts.
>
> Create a polished PetScene using the supplied PetSceneProps: show the pet art or an accessible intentional placeholder, displayName, communityName, stage and growthPoints. Use nextStageAt from props; at null show a final-stage message instead of dividing by zero. The stage is supplied, not invented by this component. Add gentle idle motion and a small celebration controlled by the celebrate prop. Respect reduced-motion preferences. Do not award points, persist game state, call a network or import wallet libraries.
>
> In the existing labeled PetPreview, show the supplied hatchling, buddy and guardian fixtures with clear developer controls. Fictional values stay in the fixture module. Do not change the route. Match approved references and shared design tokens, with no extra library or real-time 3D engine. Make it usable at 390px and desktop width, with meaningful alt text and visible keyboard focus for controls.
>
> Use the existing test setup. Test stage rendering, final-stage state, missing art and changing props. Run the documented checks. Report actual results, changed files and viewing steps. Do not claim visual checks were run without opening the preview or obtaining a screenshot.

**You check:** all three stages are visible; text is legible; missing art is intentional, not a broken image; the layout fits a narrow screen; the pet does not award itself growth. Show the lead a screenshot and the preview URL.

## A2 — Care action states

**Allowed:** `src/components/pet/CarePanel.tsx`, its co-located styles/tests, and `PetPreview.tsx`.

**Prompt**

> Implement A2 only, following the same project and file rules. Read CarePanelProps and CareActionState before proposing changes. Do not modify either type. Build the presentation and callbacks, not the transaction handler.
>
> Ready state: a Care button invokes onCare once per click. Needs-wallet state: a Connect wallet button invokes onConnect. Wrong-network state: a Switch network button invokes onSwitchNetwork. Cooldown: show the provided availability time with a clear timezone label and disable care. Awaiting-signature, submitting and pending states: distinct honest labels, disabled care, no success animation. Success: show the confirmed state supplied by the parent. Error: show the supplied message and a retry action through onCare. Unavailable: show the supplied message without guessing a balance or eligibility and do not submit care.
>
> The lead supplies correct state and guards live duplicate submissions. Use props for growth, not locally incremented values. Include all supplied states in the clearly labeled developer preview and count callback invocations only inside that preview. Do not create a fake live backend or localStorage progress. Test callback routing, disabled states, error message rendering and final-stage progress text using the existing test tooling. Run the documented checks; report evidence and limitations.

**You check:** pending/rejected transactions never show extra growth; the correct callback counter changes; disabled states cannot invoke Care; the label says what the app is waiting for.

## A3 — Art and final polish

Prepare approved assets in `public/pets/`. Prefer three same-size transparent stage images with a consistent subject scale, camera angle and foot position. Do not independently change the mascot between stages. Use a reference-approved export size, for example 1024×1024, and optimize the served copies without destroying edge quality.

Record filenames, source/creator, permission or license notes, dimensions and any limitations in `docs/pet-assets.md`. Do not claim rights that have not been established. Do not reuse unverified financial logos from the earlier mood board.

**Prompt**

> Implement A3 only inside my owned pet components and approved assets. Inspect the actual preview at narrow and desktop widths. Compare it with the approved reference. Fix only spacing, art alignment, readable labels, button sizing, layout shift and reduced-motion behavior. Reuse existing CSS/utilities and do not add a dependency. Do not change prop types, care rules, wallet code or live state. Report the visual differences you corrected, the files changed and remaining asset limitations. Run checks and provide viewing steps or screenshots.

## Stop and ask the lead when

A prop is missing, a route is broken, the app fails before your component loads, a package is required, a wallet error appears, or the agent proposes touching protected files. After two unsuccessful repair attempts, use the blocker template in REVIEW_DEBUG_HANDOFF instead of accepting a broad rewrite.

## Send with every handoff

Task ID and branch; what works; what you tested yourself; screenshots; actual check results; remaining issues. Be able to explain which props you receive and which callback your button calls.
