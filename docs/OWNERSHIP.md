# File ownership and integration contract

Lead must confirm these paths against the actual app before delegation. Changes to this document or shared interfaces require lead review.

| Owner | Editable area |
|---|---|
| Lead | `contracts/**`, `src/app/**`, `src/hooks/**`, `src/lib/**`, `src/types/**`, `src/fixtures/**`, `src/components/ui/**`, global styles, repository configuration, packages/lockfile, CI/deployment, shared specification docs |
| Teammate A | `src/components/pet/**`, `public/pets/**`, `docs/pet-assets.md`; tests co-located in that component folder |
| Teammate B | `src/components/landing/**`, `src/components/community/**`, `docs/qa/**`, `docs/demo/**`; tests co-located in those component folders |
| Teammate B — stretch approved 21 Sep 2026 | `src/components/profile/**`; lead still owns public routes/data |

Task-level allowlists can be narrower than this table. Ownership is a coordination agreement, not a technical permission system. Everyone reviews their diff and the lead reviews every merge.

## Stable component exports

- A: `PetScene`, `CarePanel`, and `PetPreview` in `src/components/pet/`.
- B: `LandingHero`, `LandingPreview`, `HowItWorks` in `src/components/landing/`; `CommunityPanel`, `CommunityPreview` in `src/components/community/`; stretch: `PublicPetCard`, `PublicPetCardPreview` in `src/components/profile/`, taking `PublicPetCardProps`.
- Lead: working component shells and routes before A/B start, plus shared UI
  (`Button`, `Card`, `Badge`, `DataModeBadge`, `AppShell`) in
  `src/components/ui/`. A/B fill in their shells without changing exported
  prop types.

`HowItWorks` was added by the lead in B's folder while B had not started. It
takes a single `connected: boolean` prop and is rendered by the lead-owned
home route. B owns it from now on.

Use `src/types/view-models.ts` for component inputs. The lead supplies named fixtures in `src/fixtures/ui-fixtures.ts`. Teammates read these files but do not change them without approval. Components can import other approved components for composition; they cannot edit another owner's files.

## Developer previews

The lead provides `/dev/pet`, `/dev/landing` and `/dev/community` with visible **UI preview — fictional data** labeling and state selectors. A/B may implement the owned preview components, but the lead controls route wiring. Fixture imports belong in preview components or tests only.

Developer preview routes must return a not-found response in a production build. The lead tests that gate in the release build. They must not be reachable as an undocumented production demo mode.

## Shared changes

When a task needs a new prop, package, route or shared style, post a request with the exact need and current blocker. The lead makes or approves the smallest shared change, updates the interface and tells both teammates to sync. Do not independently invent two versions of the same field.

## Branch policy

Use one short-lived branch per task, such as `feat/a1-pet-scene`, `feat/b2-community-panel` or `feat/l2-care-integration`. Do not work directly on `main`. The lead merges reviewed work; no automatic agent merges. Configure required checks and branch restrictions where your repository supports them.

Check for a clean working tree before updating from main. Do not let an agent discard local work or force-resolve conflicts. The lead handles confusing conflicts and reviews the result.
