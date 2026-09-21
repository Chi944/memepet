# Vercel hosting prep (no contract required)

> **Status, 21 September 2026:** hosted at https://memepet.vercel.app and the
> X Layer testnet registry is committed in `src/lib/deployment.ts`, so no
> `NEXT_PUBLIC_MEMEPET_*` variables are needed on Vercel. `NEXT_PUBLIC_SITE_URL`
> is optional: `metadataBase` falls back to `VERCEL_PROJECT_PRODUCTION_URL`.
> The rest of this file records how the site was hosted before the contract
> existed.

The hackathon asks for a live product link. The app can be hosted while
`src/lib/deployment.ts` stays `status: "not-deployed"`. Visitors see the
honest “no registry connected” pet gate and unknown community totals until
env vars (or a later committed testnet record) point at a real registry.

**Do not invent a contract address to make the site look live.**

This file prepares the deploy; it does not create a Vercel account or run a
production deploy for you.

---

## What stays true without a contract

| Item | Behaviour |
|---|---|
| Committed `DEPLOYMENT` | `status: "not-deployed"`, all address/network fields `null` |
| `/` | Landing + community unknown state |
| `/pet` | Not-live gate (no fictional pet as live data) |
| `/dev/*` | `404` in production builds |

After an authorized X Layer testnet record (see `XLAYER_TESTNET.md` Phase C),
either commit verified values into `deployment.ts` **or** set the
`NEXT_PUBLIC_MEMEPET_*` overrides on Vercel and redeploy. Prefer committing
only values you have verified on-chain.

---

## Create the Vercel project (human)

1. Import `https://github.com/Chi944/memepet` in the Vercel dashboard.
2. Framework preset: **Next.js** (App Router). Root directory: repository root.
3. Build command: `npm run build` (Vercel default for Next.js is fine).
4. Install command: `npm ci` (matches CI / `packageManager`).
5. Node: **24.x** (see `.nvmrc` / `package.json` engines).
6. Do **not** add private keys, seed phrases, or RPC auth secrets as
   `NEXT_PUBLIC_*` variables.

No `vercel.json` is required for the default Next.js path. Add one later only
if you need redirects or headers.

---

## Environment variables

### Always set for a public URL

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes for correct OG/metadata | Canonical public origin, e.g. `https://your-app.vercel.app` (no trailing slash). Used by `src/app/layout.tsx` `metadataBase`. |

Without it, metadata falls back to `http://localhost:3000`, which is wrong on
a public host.

### Leave unset until a registry is verified

These override committed `DEPLOYMENT` only when **all** of status, network
name, chain id, RPC URL, and registry address are set together
(`src/lib/deployment.ts`). Do not set a partial group.

| Variable | Example when ready (not yet) |
|---|---|
| `NEXT_PUBLIC_MEMEPET_DEPLOYMENT_STATUS` | `testnet` |
| `NEXT_PUBLIC_MEMEPET_NETWORK_NAME` | `X Layer testnet` |
| `NEXT_PUBLIC_MEMEPET_CHAIN_ID` | `1952` |
| `NEXT_PUBLIC_MEMEPET_RPC_URL` | `https://testrpc.xlayer.tech/terigon` |
| `NEXT_PUBLIC_MEMEPET_REGISTRY_ADDRESS` | `TODO_REGISTRY_ADDRESS` — real address only |
| `NEXT_PUBLIC_MEMEPET_CURRENCY_SYMBOL` | `OKB` |
| `NEXT_PUBLIC_MEMEPET_EXPLORER_BASE_URL` | `https://www.okx.com/web3/explorer/xlayer-test` |

Until those exist, keep them **unset** on Vercel so the app stays honestly
not-deployed.

### Never set

- Private keys, mnemonics, keystore passwords
- OKLink / explorer API keys as `NEXT_PUBLIC_*` (and prefer not hosting them
  on Vercel at all; verification is optional and local — see
  `XLAYER_TESTNET.md`)

---

## After the first host is live

1. Put the public URL in the submission materials and README “Live demo” row.
2. Set `NEXT_PUBLIC_SITE_URL` to that URL and redeploy.
3. When Phase C records a testnet registry, either update `deployment.ts` in
   git or set the `NEXT_PUBLIC_MEMEPET_*` group on Vercel — then confirm `/pet`
   shows the live client, not the gate.

---

## Related

- Contract runbook: `docs/deploy/XLAYER_TESTNET.md`
- Env template: `.env.example`
