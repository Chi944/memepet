# Larm (Teammate B) — community interface, testing and demo

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
