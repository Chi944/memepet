# MemePet

**Adopt the meme. Grow the community.**

A meme-community companion app for X Layer. You adopt a wallet-linked mascot,
complete one care action a day, and every confirmed care adds to a shared
community habitat total. Progression is earned by participating, not by
spending: there is no MemePet token, no transfer, no approval, and no reward
with financial value.

Built for **OKX Dev Day 2026, Build a Market track**. A three-person team: the
lead owns integration, Teammate A owns pet presentation, and Teammate B owns
the landing/community UI, QA, and demonstration.

![MemePet landing page](docs/images/home-desktop.png)

## What is and is not working

The interface, the design system, the view-model contract, and a unit-tested
`PetRegistry` contract exist. **Wallet connection, a deployed contract, and
live confirmed care do not.** The app says so on every surface rather than
showing a placeholder pet or a fabricated community total — an unknown value
renders as a hatched, explicitly unknown state, never as zero.

See [STATUS](docs/STATUS.md) for the remaining work and
[the audit](docs/AUDIT_2026-09-20.md) for known issues.

## How to run

Need Node 24.19.x and npm 11.19.x.

```bash
git clone https://github.com/Chi944/memepet.git
cd memepet
git checkout main
npm ci
npm run dev
```

Open `http://localhost:3000`. Stop the server with `Ctrl+C`.

| Page | What it is |
|---|---|
| `http://localhost:3000` | Landing + community panel. Community totals stay unknown until a live contract exists. |
| `http://localhost:3000/pet` | Honest pet home. Live adopt/care is not connected. |
| `http://localhost:3000/dev/pet` | Fictional pet UI. No wallet needed. |
| `http://localhost:3000/dev/landing` | Fictional landing UI. |
| `http://localhost:3000/dev/community` | Fictional community states. |

Checks:

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

`/dev/*` returns HTTP 404 in `npm run start` production mode.

## Status

See [STATUS](docs/STATUS.md).

Hosted repository: [Chi944/memepet](https://github.com/Chi944/memepet).

Set `NEXT_PUBLIC_SITE_URL` to the public origin before deploying, so link
previews resolve against the right host.

## Product scope

One community, one pet, three visual stages, adoption, daily care, confirmed persistent
progress, and a shared community counter. No new token, trading, deposits, token
approvals, NFT marketplace, or AI chatbot. See [the brief](docs/PROJECT_BRIEF.md).
