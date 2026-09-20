# MemePet — shared team context

Prepared for the lead, Teammate A, and Teammate B. This is a specification and prompt kit, not a completed app.

The hosted repository is Chi944/memepet. Start with lead L0.


---

## Included source: docs/PROJECT_BRIEF.md

# MemePet — frozen working brief v1

## Product

A meme-community companion app on X Layer. A user adopts a wallet-linked pet, completes a daily care action, sees its progress and helps a shared habitat grow.

**Core user story:** connect → adopt → care → see confirmed progress → refresh and recover the same pet.

## Proposed rules

One pet per wallet. One care per UTC calendar day. Each confirmed care gives 10 personal growth points and increments the community care total by one. Hatchling begins at 0 points, Buddy at 20, Guardian at 50. No missed-day penalty. The lead owns the contract and UI mapping of these rules.

Show progression earned from participation, not token spending. No token approvals, token transfers, deposits, rewards with financial value or new MemePet token.

## Commit scope

One community, one mascot with three stage assets, a landing/adoption entry, pet home, daily care, persistent state and a community-progress panel. The actual community token/network identity is lead-verified, not inferred from a ticker or generated artwork. A read-only holder indicator may be added by the lead after the core loop works.

## Stretch scope

Accessory saving, multiple communities, public profile pages, generated share images, market data. No marketplace, launchpad, breeding, trading, staking, chatbot, real-time 3D engine or in-app social feed.

## Architecture boundary

The lead owns contract reads/writes and supplies display-ready values and callbacks. Teammates build components with those inputs. UI preview data must never become a fallback for a failed live read.

## Visual direction

Soft collectible-pet appearance, readable text, spacious cards, consistent lighting/camera, a dominant pet scene and one obvious care action. Use approved art, not rendered financial logos or unverified token branding. The previous concept image is inspiration, not an implementation specification.

## Completion

Core transactions work in the declared environment; state survives refresh; rejected or failed transactions do not award progress; unknown community data is not shown as zero; the app works on a narrow mobile screen; the demo distinguishes live state from previews.

These are project design choices. The lead separately verifies hackathon requirements and the supported deployment environment.


---

## Included source: docs/OWNERSHIP.md

# File ownership and integration contract

Lead must confirm these paths against the actual app before delegation. Changes to this document or shared interfaces require lead review.

| Owner | Editable area |
|---|---|
| Lead | `contracts/**`, `src/app/**`, `src/hooks/**`, `src/lib/**`, `src/types/**`, `src/fixtures/**`, `src/components/ui/**`, global styles, repository configuration, packages/lockfile, CI/deployment, shared specification docs |
| Teammate A | `src/components/pet/**`, `public/pets/**`, `docs/pet-assets.md`; tests co-located in that component folder |
| Teammate B | `src/components/landing/**`, `src/components/community/**`, `docs/qa/**`, `docs/demo/**`; tests co-located in those component folders |
| Teammate B, only after stretch approval | `src/components/profile/**`; lead still owns public routes/data |

Task-level allowlists can be narrower than this table. Ownership is a coordination agreement, not a technical permission system. Everyone reviews their diff and the lead reviews every merge.

## Stable component exports

- A: `PetScene`, `CarePanel`, and `PetPreview` in `src/components/pet/`.
- B: `LandingHero`, `LandingPreview` in `src/components/landing/`; `CommunityPanel`, `CommunityPreview` in `src/components/community/`.
- Lead: working component shells and routes before A/B start. A/B fill in their shells without changing exported prop types.

Use `src/types/view-models.ts` for component inputs. The lead supplies named fixtures in `src/fixtures/ui-fixtures.ts`. Teammates read these files but do not change them without approval. Components can import other approved components for composition; they cannot edit another owner's files.

## Developer previews

The lead provides `/dev/pet`, `/dev/landing` and `/dev/community` with visible **UI preview — fictional data** labeling and state selectors. A/B may implement the owned preview components, but the lead controls route wiring. Fixture imports belong in preview components or tests only.

Developer preview routes must return a not-found response in a production build. The lead tests that gate in the release build. They must not be reachable as an undocumented production demo mode.

## Shared changes

When a task needs a new prop, package, route or shared style, post a request with the exact need and current blocker. The lead makes or approves the smallest shared change, updates the interface and tells both teammates to sync. Do not independently invent two versions of the same field.

## Branch policy

Use one short-lived branch per task, such as `feat/a1-pet-scene`, `feat/b2-community-panel` or `feat/l2-care-integration`. Do not work directly on `main`. The lead merges reviewed work; no automatic agent merges. Configure required checks and branch restrictions where your repository supports them.

Check for a clean working tree before updating from main. Do not let an agent discard local work or force-resolve conflicts. The lead handles confusing conflicts and reviews the result.


---

## Included source: docs/prompt-packs/LEAD.md

# Lead — technical lead prompt pack

Run one task at a time in the approved shared repository. These prompts describe work to perform; none of it has already been implemented by this kit. The lead is the integration owner, not simply a third feature developer.

## L0 — Create the foundation BEFORE teammates code

**Human input:** approved repository; decision to use the existing app or start one fresh; approved design direction. No passwords or wallet secrets.

**Prompt**

> I am the technical lead for MemePet. Read AGENTS.md, docs/PROJECT_BRIEF.md, docs/OWNERSHIP.md, docs/DEV_SETUP.md, src/types/view-models.ts and src/fixtures/ui-fixtures.ts. Inspect the repository and report what already exists. We have two beginner contributors. Do not reinitialize or replace an existing application.
>
> Work on L0 only. Propose a minimal setup plan, files, dependencies and executable checks. Do not implement contract logic or add product features yet. For an empty repository, propose one Next.js/TypeScript app with the approved styling approach and a minimal component test setup; wait for approval before installation/scaffolding. For an existing app, reuse its package manager, conventions and test tools.
>
> After approval, provide the component shells and developer previews specified in OWNERSHIP. Export the agreed names without inventing new prop types. Previews need labeled fictional data, controllable states and callback counters, and must work without a wallet. Create only enough shared UI for consistent buttons/cards. Gate preview routes out of production and verify this with a production build. Configure and document actual dev/typecheck/lint/test/build commands, with one passing example test. Record the baseline. Keep external services, secret values and deployment out of this task.
>
> Return changed files, actual command output summaries, how to start each preview, unresolved setup problems and the exact starting task for A and B.

**Acceptance:** both teammates can run the same baseline; previews render the agreed shells; scripts exist and pass; no production fixture route; no duplicate apps. Do a small paired pull request before independent work.

## L1 — Minimal contract with tests

**Allowed:** contract source/tests/local scripts and lead-owned integration documentation. No teammate UI edits.

**Prompt**

> Implement L1 only after reading the project rules and inspecting existing contract tooling. Propose the contract interface and test plan before editing. We need a wallet-linked non-transferable registry, not an NFT or token. Proposed calls: adopt(communityId), care(), petOf(wallet), communityStats(communityId). One pet per wallet. A fixed, approved community configuration. One care per UTC calendar day, including clearly tested midnight-boundary semantics. Each successful care increments personal careCount and that community's counter once. Derive growth points and stage rather than storing redundant values. Permit the first care after adoption; handle the initial last-care sentinel explicitly. Emit adoption/care events.
>
> Do not add payments, token approvals/transfers, arbitrary XP grants, randomness, upgradeability, or external calls inside care. Use checked, bounded storage types and reject invalid community IDs and duplicate adoption. Test no-pet care, first care, duplicate same-day care, next-day care, boundary timing, independent wallets, exact counter increments and evolution thresholds in the display mapper. Run the local tests and report exact results. Do not deploy or request secrets. Unverified token addresses stay unconfigured, not invented.

**Acceptance:** the lead can explain the state changes and constraints; tests actually pass. Treat AI review as assistance, not an audit or a guarantee of mainnet safety.

## L2 — Earliest working integration, then the care loop

**Allowed:** lead-owned hooks, libraries, routing, contract interface files and integration tests. Do not redesign A/B components.

**Prompt**

> Work on L2 in two reviewed slices. First connect a wallet, deploy only to the explicitly authorized development/test environment, adopt, read the resulting pet, and recover the same state after refresh. Verify current network configuration from official documentation before configuration. Human authorization is required for deployment and signing; never request or print seed phrases/private keys.
>
> Second, integrate care and community reads. Inspect the agreed view-model types. Build the smallest mapper and hooks that convert confirmed chain state into those props. The live parent supplies onCare/onConnect/onSwitchNetwork; presentational components do not fetch or award progress. Use the existing wallet libraries rather than adding a second wallet system.
>
> Handle missing wallet, wrong chain, initial loading, nonexistent pet, unavailable read, rejection, submission, confirmation and retry. Block duplicate submissions in the controller as well as disabling the button. Award/display confirmed growth only after the receipt indicates success and the relevant data is refreshed; show a refresh failure honestly. Invalidate cached data on chain or account changes. Never load fictional fixtures when a live read fails. A failed optional token-holder read must not stop care. No token approval is needed by this design.
>
> Wire the smallest reviewed components from A and B. Report actual integration evidence, environment, public transaction references where available, and any feature still using a preview. Do not claim a successful transaction merely because a hash exists.

**Acceptance:** connected adoption and care are real; refresh persists; rejection gives no growth; a wallet switch cannot show another wallet's stale pet as its own; community progress comes from the same declared deployment.

## L3 — Review and release gate

**Prompt**

> Review the integrated MemePet core loop against docs/QA_CHECKLIST.md. Inspect the actual diff and current code; do not declare an audit. Verify contract configuration, chain/address mapping, transaction success semantics, cache keys, error states, secret hygiene and production preview exclusion. Run the documented checks and investigate reproducible failures without weakening checks. Review the production build and the exact commit to be deployed. Do not deploy until I explicitly authorize the target environment and deployment action. Return blockers separately from polish, with files and reproduction steps. Confirm which stretch features must remain out of the demo.

## Lead review budget

Integrate a small working slice as soon as it is reviewable. Keep at most one implementation task active per teammate, and avoid letting several unreviewed changes accumulate. Do not take on art cleanup, copy and video editing when teammates can own them. When blocked on chain integration, pause stretch work rather than widening the product.


---

## Included source: docs/prompt-packs/TEAMMATE-A.md

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


---

## Included source: docs/prompt-packs/TEAMMATE-B.md

# Teammate B — community interface, testing and demo

## Your job

Own the first explanation a visitor sees, the shared community-progress panel, and the evidence that the app actually works. You contribute interface code, user testing and the demo. You do not need to implement a backend or smart contract.

Start only after the lead demonstrates your local developer previews and completes a first branch/commit/review with you. Read PROJECT_BRIEF and OWNERSHIP. Execute one task at a time.

## B1 — Landing hero

**Allowed:** `src/components/landing/**`, including the existing LandingHero/LandingPreview shells and co-located styles/tests.

**Read-only:** shared UI, approved mascot assets, LandingHeroProps, project brief and design reference.

**Prompt**

> Read AGENTS.md, docs/PROJECT_BRIEF.md, docs/OWNERSHIP.md and docs/DEV_SETUP.md. Inspect LandingHero and LandingPreview. Implement B1 only. First explain the task and list intended files. Do not change routes, global styles, shared types, dependencies, wallet logic, contracts or other teammates' components.
>
> Create a polished landing hero for MemePet. Explain that users adopt a meme-community mascot, care for it and contribute to shared progress. Use the headline “Adopt the meme. Grow the community.” and one primary “Meet your pet” action that invokes the supplied onGetStarted callback. Use approved art or a clearly intentional placeholder. No made-up partnerships, prices, user counts, token addresses, rewards or claims of guaranteed returns. Do not use the earlier mockup's coin labels as verified data.
>
> Use shared design tokens and existing components. Work on a 390px screen and desktop with accessible text, focus and button semantics. The preview may record callback clicks but must remain visibly fictional/development-only. Add a test for the action callback and visible product explanation using existing tooling. Run documented checks and report actual results, files and viewing steps.

**You check:** a new visitor understands the activity; the primary action works; mobile does not overflow; there are no fabricated live metrics.

## B2 — Community-progress panel

**Allowed:** `src/components/community/**`, including CommunityPanel/CommunityPreview and co-located styles/tests.

**Read-only:** CommunityPanelProps/CommunityViewModel, communityFixtures and shared design tokens.

**Prompt**

> Implement B2 only after reading the same project instructions and existing shells. Stay within src/components/community/. Do not fetch data, import wallet libraries, create API routes, install packages or alter shared types/fixtures. Read CommunityPanelProps as the integration contract.
>
> Display the community name, the real supplied care-action total, target and a visually clear progress bar. Label the total “Care actions,” not people or users. A value of null is unknown, not zero. Render loading, zero-activity, growing, achieved, unavailable and unknown-target cases using supplied inputs. Cap the visual fill at 100% while preserving the actual count text. Avoid dividing by zero or a missing target. Unknown/invalid target means no percentage and a clear unavailable-goal message, not an invented target. An error must not show fake live progress.
>
> Use the existing labeled preview to inspect all supplied cases. Add tests for unknown-vs-zero, loading/error, a value above target and a zero/unknown target using local test inputs. Use shared styling and make the panel readable at narrow widths. Run documented checks. Report changed files, actual outputs and how to verify the component.

**You check:** zero and unavailable look different; 24 actions toward a 20-action target displays the true count without overflowing; there is no invented user count.

## B3 — Manual QA and bug reports

**Allowed:** `docs/qa/**` and `docs/demo/**`. Code fixes require a separate scoped task in the appropriate owner's folder.

**Prompt**

> Read docs/QA_CHECKLIST.md and the implemented app documentation. I am testing MemePet as a beginner user. Create a manual testing worksheet in docs/qa/ with exact steps, expected results and blank actual-result/evidence fields. Do not pre-mark tests as passing. Prioritize the full adoption/care/refresh flow, wallet rejection, wrong network, duplicate care, unavailable data, wallet switching and mobile layouts. Separate component-fixture tests from real integrated behavior. Explain how I should collect a useful screenshot/error without exposing secrets.
>
> If you have actual browser access, report exactly which checks you ran, which environment and commit you tested, and what happened. If you do not, give me the steps and leave the result as not run. Do not claim to have signed a transaction or tested a wallet you cannot access. Do not change contracts or wallet code to make a test pass.

Try the app without coaching from the lead first. Record the first confusing point. Ask external testers for consent before recording them. Separate team activity from external feedback. Report reproducible failures, not just “it doesn't work.”

## B4 — Demo and submission evidence

Run after the core flow works; the lead checks all technical claims. No unverified dates or organizer requirements are bundled here.

**Prompt**

> Using only the implemented features and actual evidence in docs/qa/, draft a demonstration script and submission notes in docs/demo/. Cover the user problem, one real adoption, one confirmed care/evolution, shared progress and the declared X Layer environment. Use explicit placeholders for unverified details, and list limitations. Do not invent tester numbers, partnerships, transactions or completed features. Identify any prepared wallet or UI fixture shown. Keep a concise core script that can be adjusted to the organizers' verified video-length requirement. Include a clean-browser link-check checklist and a list of facts the lead must verify before submission.

## Stretch: public pet card

Only after lead approval and a frozen public-profile interface. Build the display component only. The lead supplies the route, public state, URL and any copy callback. Do not create an image-generation server or database.

## Send with every handoff

Task ID/branch, screenshot or observed evidence, actual checks, known problems, and a clear request when blocked. For bugs include environment, reproduction steps, expected/actual result and relevant sanitized console output.
