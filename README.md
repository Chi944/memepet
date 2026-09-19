# MemePet

**Adopt the meme. Grow the community.**

A three-person hackathon project: Deston owns integration, Kym owns pet presentation,
and Larm owns the landing/community UI, QA, and demonstration.

## Status — read this first

L0 provides one runnable Next.js application and wallet-free developer previews for
the agreed component shells. It does **not** implement adoption, live care,
persistence, wallet integration, contracts, deployment, or production pet artwork.

The public hosted repository exists at
[Chi944/memepet](https://github.com/Chi944/memepet). The current L0 work remains
uncommitted and unpushed for lead review.

## First steps

1. Deston reviews and publishes the L0 baseline.
2. Invite Kym and Larm to the repository and to the existing **OKX Hackathon**
   ChatGPT project. Each invitation is separate.
3. Each person creates their own project chat using [Chat setup](docs/CHAT_SETUP.md).
4. Only after Deston reviews and publishes L0, Kym starts **A1**, and Larm starts
   **B1**.

## Team boundaries

| Person | Owns | First coding task |
|---|---|---|
| Deston | Foundation, routes, shared types, contracts, wallet/data, integration, deployment | L0: working shared baseline |
| Kym | Pet scene, care presentation, stage artwork, animation | A1: PetScene in the supplied preview |
| Larm | Landing/community presentation, QA, demo evidence | B1: LandingHero in the supplied preview |

The lead is Deston throughout this repository. See [file ownership](docs/OWNERSHIP.md).
Names here are team labels, **not verified GitHub usernames**. Do not use them as
collaborator identities or CODEOWNERS handles without verification.

## Product scope

One community, one pet, three visual stages, adoption, daily care, confirmed persistent
progress, and a shared community counter. No new token, trading, deposits, token
approvals, NFT marketplace, or AI chatbot. See [the brief](docs/PROJECT_BRIEF.md).

## Source of truth

Merged repository files govern code and interfaces. Chat conversations are for guidance,
not automatic synchronization. Keep [STATUS](docs/STATUS.md) current and provide a branch,
commit, or handoff with debugging requests. Do not presume another person's chat or local
files have been updated. Fixtures are never substitutes for failed live reads.

## Commands

Use Node 24.19.x and npm 11.19.x from the repository root:

```bash
npm ci
npm run dev
```

Then open `http://localhost:3000`. See [DEV_SETUP](docs/DEV_SETUP.md) for preview
routes, verification commands, and current check results.

## Security and release

Never commit signing credentials, seed phrases, private keys, or secret environment files.
No deployment is authorized by this starter. No software license or third-party artwork
rights are asserted here; the team must choose and verify them before public release.
Verify hackathon requirements and dates from organizer sources separately.

## Reference material

[Current setup sources](docs/SETUP_SOURCES.md). Role packs and project rules are proposed
team workflow choices, not claims that a platform enforces file ownership.
