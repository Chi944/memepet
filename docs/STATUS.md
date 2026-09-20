# Shared status

Updated: 20 September 2026.

The lead updates this file after reviewed merges. Role labels are Lead, Teammate A,
and Teammate B.

| Item | Status |
|---|---|
| Hosted GitHub repository | `Chi944/memepet` |
| Stable default branch | `main` is the L0 baseline only |
| Active lead branch | `feat/l1-pet-registry` |
| Application scaffold | Runnable Next.js app with wallet-free `/dev/*` previews |
| L0 foundation checks | Install, typecheck, lint, test, build, production 404, and browser checks passed |
| Pet registry contract | Local `PetRegistry` with Foundry tests; not deployed |
| Progress mapper | `src/lib/pet-progress.ts` maps care count to points/stage |
| Pet presentation | Shells plus A1 scene polish; artwork files not bundled yet |
| Landing / community polish | Shells only; Teammate B still owns B1 and B2 |
| Wallet / live reads | Not implemented |
| Deployment | None |
| Confirmed community token | Not selected/verified |

## Built by the lead

- One shared Next.js app in the repository root
- Shared Button/Card styles and homepage
- Component shells and `/dev/pet`, `/dev/landing`, `/dev/community`
- Shared types and fictional fixtures
- `PetRegistry` contract and display mapper
- Role-label documentation
- PetScene polish: stage labels, idle motion, reduced-motion, missing-art placeholder, tests
- Image Gen 2.5 prompts in `docs/pet-assets.md`

Live adoption, wallet connection, and confirmed on-chain progress are **not** built.

## Next task per role

Lead: keep L1/L2 on feature branches. Do not merge unfinished work into `main`.
Teammate A: review `/dev/pet`, generate the three stage images from `docs/pet-assets.md`,
then continue A3 after the lead copies approved files into `public/pets/`.
Teammate B: start **B1** on `feat/b1-landing-hero` using `/dev/landing`.

## Latest stable baseline

- Branch / commit: `main` tracks the L0 baseline
- App start instructions: `npm ci`, then `npm run dev`
- Known blockers: no approved pet artwork files yet; contract not deployed

## Handoff template

Owner / task:
Branch / commit / PR:
What changed:
Checks actually run:
Browser evidence:
Next owner action:
Blockers:
