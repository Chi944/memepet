# Vercel hosting

The app is hosted at [memepet.vercel.app](https://memepet.vercel.app).
The verified X Layer testnet registry is committed in
[`src/lib/deployment.ts`](../../src/lib/deployment.ts); the hosted app does not
need deployment environment overrides for that configuration.

## Project settings

| Setting | Value |
|---|---|
| Repository | `Chi944/memepet` |
| Framework | Next.js App Router |
| Root | Repository root |
| Install | `npm ci` |
| Build | `npm run build` |
| Node | 24.x, matching `.nvmrc` and package engines |

[`next.config.ts`](../../next.config.ts) supplies the configured security headers.
No separate `vercel.json` is needed for the current setup.

## Public environment configuration

`NEXT_PUBLIC_SITE_URL` is **optional on Vercel**. Canonical metadata resolves in
this order: explicit site URL → `VERCEL_PROJECT_PRODUCTION_URL` → localhost.
Use an explicit public origin on a non-Vercel host. Do not assume that every
preview should identify itself as the canonical production origin.

Normally leave `NEXT_PUBLIC_MEMEPET_*` unset so the committed registry is used.
To intentionally override a deployment, supply the full required group:

- `NEXT_PUBLIC_MEMEPET_DEPLOYMENT_STATUS` (`local`, `testnet` or `mainnet`).
- `NEXT_PUBLIC_MEMEPET_NETWORK_NAME`.
- `NEXT_PUBLIC_MEMEPET_CHAIN_ID`.
- `NEXT_PUBLIC_MEMEPET_RPC_URL`.
- `NEXT_PUBLIC_MEMEPET_REGISTRY_ADDRESS` (verified address).

The currency symbol and explorer URL are additional public configuration.
Use [`.env.example`](../../.env.example) for names, and verify the exact declared
environment. Configuration changes require a rebuild. The loader requires all five
values, an allowed status, a positive integer chain ID and a syntactically valid
address; otherwise it keeps the committed defaults. It does not validate RPC URL
syntax or availability, so verify that endpoint separately.

Signing keys, recovery words, keystore passwords and authenticated service secrets
must never be placed in `NEXT_PUBLIC_*` configuration. They are not required to
host this browser-wallet app.

## Release verification

Check the exact deployment revision and CI results before using a build for the demo:

- `/` and `/pet` load; valid public pet routes preserve no-pet/unavailable states.
- `/dev/pet`, `/dev/landing` and `/dev/community` return 404 in production.
- The app declares chain 1952 and the intended registry for this testnet release.
- Public/share links resolve to the intended origin and image.
- Complete the real [browser walkthrough](../qa/BROWSER_WALKTHROUGH.md) separately;
  a successful Vercel build does not prove wallet adoption or care.

Deployment evidence is in [the X Layer record](XLAYER_TESTNET.md) and
[dated QA records](../qa/evidence/). Hosting this app does not redeploy the contract.
