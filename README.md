# MemePet

**Adopt the meme. Grow the community.**

A three-person hackathon project: the lead owns integration, Teammate A owns pet
presentation, and Teammate B owns the landing/community UI, QA, and demonstration.

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

Mochi stage art, pet/landing/community presentation, and a local `PetRegistry`
are in the repo. Wallet connection, a deployed contract, and live confirmed care
are **not** implemented. See [STATUS](docs/STATUS.md).

Hosted repository: [Chi944/memepet](https://github.com/Chi944/memepet).

## Product scope

One community, one pet, three visual stages, adoption, daily care, confirmed persistent
progress, and a shared community counter. No new token, trading, deposits, token
approvals, NFT marketplace, or AI chatbot. See [the brief](docs/PROJECT_BRIEF.md).
