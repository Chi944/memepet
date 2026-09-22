# Separate local Anvil walkthrough — 22 September 2026

**LOCAL ONLY. This is not X Layer testnet evidence and does not clear the hosted domain warning.** The user authorized this independent local test while the [domain-review request](METAMASK_WARNING_2026-09-22.md) is pending.

## Environment

- Worktree: `memepet-qa-warning`, base application revision `c0edf54bb9fa7fa0cff64287583d101bac46ef2f`; local documentation commit `b500e6f` changes no application code.
- App: `http://127.0.0.1:3400/pet`, visibly labelled **Local Anvil**.
- RPC: `http://127.0.0.1:18545`; `eth_chainId` verified `0x7a69` / **31337**.
- Local registry: `0x5FbDB2315678afecb367f032d93F642f64180aa3`.
- Local deployment receipt: `0xa265c024700ed6454cd98e590aae043bba84dd283f65ff4683f06fe882f17acc`, status `0x1`, block `0x1`, runtime code 1,397 bytes.
- Intended wallet: `0x2ec8471290793FeB64792861Ce3102d291ce1CA1`. Funded **10 local test ETH** with `anvil_setBalance` after verifying the local chain. This does not fund the address on any public chain.
- Initial reads: `petOf = false/0/0/0`; community care total `0`.
- Anvil runs with `--quiet` so generated keys are not printed. Deployment used a public unlocked local account and `forge create --unlocked --broadcast`; no keystore/private-key access.
- App uses process-scoped public environment overrides with deployment status `local`, the above chain/RPC/registry, currency `ETH`, and an empty explorer URL. No `.env` file was read or modified.

`npm ci` completed (452 packages, reported 0 vulnerabilities). Existing contract dependencies were installed and the existing registry compiled/deployed. Dev server health returned HTTP 200 with the Local Anvil label at `2026-09-22T15:03:27Z`. No new app/contract test run is claimed for this setup; dependency installation and deployment are not browser transaction tests.

## Browser procedure and actual evidence

The browser tool cannot inspect MetaMask extension URLs: the attempt was explicitly blocked by browser security policy. The human operates extension prompts; the agent verifies the page and public local-chain results. No alternate automation route was used for those prompts.

| Walkthrough step | Actual result | Status |
|---|---|---|
| Connect wallet / network prerequisite | Real Chrome clicked Connect on the local page. Human reported approval; the page independently displayed the full intended address. Chain remained `1`. Switch network was requested; human network confirmation is pending. | Connection verified; network prerequisite pending |
| Reject adoption | Not attempted | NOT RUN |
| Approve adoption | Not attempted | NOT RUN |
| Refresh confirmed pet | No browser adoption yet | NOT RUN |
| Approve care | Not attempted | NOT RUN |
| Same-day cooldown | No browser care yet | NOT RUN |
| Next-day care | No local clock advance or second care yet | NOT RUN |
| Switch accounts | Not attempted | NOT RUN |
| Community increment | Baseline only; no care yet | NOT RUN |

Any receipt and on-screen state used to update these rows must come from the actual run. Mock providers, unlocked CLI calls, and public testnet reads cannot substitute for browser signature results.
