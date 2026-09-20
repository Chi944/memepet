# Shared status

Updated: 20 September 2026.

| Item | Status |
|---|---|
| Hosted GitHub repository | `Chi944/memepet` |
| Stable default branch | `main` |
| Application | Next.js app with landing, pet home, and `/dev/*` previews |
| Pet artwork | Hatchling, Buddy, Guardian in `public/pets/` |
| Pet registry | Local Foundry contract; not deployed |
| Wallet / live care | Not implemented |
| Deployment | None |

## Built

- Shared app, types, fixtures, previews
- Mochi stage art in `/dev/pet`
- Landing hero with approved hatchling art
- Community panel cases, including unknown-vs-zero
- Honest `/pet` route

## Next

Lead: L2 after an authorized testnet deploy. Do not invent a contract address.
Teammate A: review `/dev/pet`; remaining polish is visual only.
Teammate B: review `/dev/landing` and `/dev/community`; remaining polish is copy/QA.

## Run

```bash
npm ci
npm run dev
```

Then open `http://localhost:3000`.
