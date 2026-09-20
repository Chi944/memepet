# Shared status

Updated: 20 September 2026.

The lead updates this file after reviewed merges. Role labels are Lead, Teammate A,
and Teammate B.

| Item | Status |
|---|---|
| Hosted GitHub repository | `Chi944/memepet` |
| Stable default branch | `main` |
| Application scaffold | Runnable Next.js app with wallet-free `/dev/*` previews |
| Pet artwork | Hatchling, Buddy, and Guardian stills accepted into `public/pets/` |
| Pet registry contract | Local `PetRegistry` with Foundry tests; not deployed |
| Progress mapper | `src/lib/pet-progress.ts` |
| Landing / community polish | Shells only; Teammate B still owns B1 and B2 |
| Wallet / live reads | Not implemented |
| Deployment | None |
| Confirmed community token | Not selected/verified |

## Built by the lead

- Shared Next.js app, previews, types, fixtures
- `PetRegistry` and display mapper
- PetScene polish and stage artwork in `/dev/pet`
- Honest `/pet` route that does not pretend the live loop exists

Live adoption, wallet connection, and confirmed on-chain progress are **not** built.

## Next task per role

Lead: L2 wallet and contract integration, only after an authorized testnet deploy.
Teammate A: inspect `/dev/pet` stage art, then A2 care-panel polish if needed.
Teammate B: start **B1** on `feat/b1-landing-hero` using `/dev/landing`.

## Latest stable baseline

- App start: `npm ci`, then `npm run dev`
- Known blockers: no deployed contract; no wallet connection; no authorized testnet

## Handoff template

Owner / task:
Branch / commit / PR:
What changed:
Checks actually run:
Browser evidence:
Next owner action:
Blockers:
