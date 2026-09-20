# MemePet

**Adopt the meme. Grow the community.**

A three-person hackathon project: the lead owns integration, Teammate A owns pet
presentation, and Teammate B owns the landing/community UI, QA, and demonstration.

## Status — read this first

The shared app runs locally. Developer previews use fictional data. Live adoption,
wallet connection, confirmed care, and production artwork are **not** implemented.

Stable code lives on `main` (L0 baseline). Lead work continues on feature branches
such as `feat/l1-pet-registry`. Do not treat a feature branch as the default
teammate starting point until the lead merges it.

Hosted repository: [Chi944/memepet](https://github.com/Chi944/memepet).

See [STATUS](docs/STATUS.md) for what is built and who should do what next.

## Start here

```bash
git clone https://github.com/Chi944/memepet.git
cd memepet
git checkout main
npm ci
npm run dev
```

Open `http://localhost:3000`.

| Role | Open this preview | First task | Branch |
|---|---|---|---|
| Teammate A | `/dev/pet` | Polish `PetScene` / generate stage art | `feat/a1-pet-scene` |
| Teammate B | `/dev/landing` | Polish `LandingHero` | `feat/b1-landing-hero` |
| Lead | contracts and shared app | L1 registry, then L2 integration | `feat/l1-pet-registry` |

Artwork prompts: [pet-assets](docs/pet-assets.md). Setup: [DEV_SETUP](docs/DEV_SETUP.md).
Ownership: [OWNERSHIP](docs/OWNERSHIP.md).

## Product scope

One community, one pet, three visual stages, adoption, daily care, confirmed persistent
progress, and a shared community counter. No new token, trading, deposits, token
approvals, NFT marketplace, or AI chatbot. See [the brief](docs/PROJECT_BRIEF.md).

## Security and release

Never commit signing credentials, seed phrases, private keys, or secret environment files.
No deployment is authorized by this starter. No software license or third-party artwork
rights are asserted here.
