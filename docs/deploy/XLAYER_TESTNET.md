# X Layer testnet — PetRegistry deploy runbook

Local Anvil work is separate. This document is for **X Layer testnet only**.
Nothing here invents a contract address. Every value below was recorded from a real
broadcast that you run yourself.

**Never** put a seed phrase or private key in a file, in this doc, or on a
command line (`--private-key` is forbidden). Use an encrypted Foundry keystore
account. **Never** ask an agent to `--broadcast` for you.

---

## Confirmed network values (Phase A1)

Sources (retrieved 20 September 2026 — re-check before broadcast if stale):

- https://web3.okx.com/onchainos/dev-docs/xlayer/developer/build-on-xlayer/network-information
- https://web3.okx.com/onchainos/dev-docs/xlayer/developer/rpc-endpoints/rpc-endpoints
- Faucet: https://web3.okx.com/xlayer/faucet
- Verification (optional): https://www.oklink.com/docs/en/

| Field | Value |
|---|---|
| Network name | X Layer testnet |
| Chain ID | `1952` |
| RPC (primary) | `https://testrpc.xlayer.tech/terigon` |
| RPC (alternate) | `https://xlayertestrpc.okx.com/terigon` |
| Currency | OKB |
| Explorer | `https://www.okx.com/web3/explorer/xlayer-test` |
| Faucet | https://web3.okx.com/xlayer/faucet |

These match `src/lib/chains.ts` (`xLayerTestnet`).

### Phase A simulation (not a deploy)

Simulated without `--broadcast` against the testnet RPC, sender placeholder
`0x0000000000000000000000000000000000000001`:

| Metric | Result |
|---|---|
| Estimated gas | `461403` |
| Estimated max fee | `0.040000001` gwei |
| Estimated cost | `0.000018456120461403` OKB (forge labelled it ETH; native token is OKB) |
| Simulated CREATE | `0x522B3294E6d06aA25Ad0f1B8891242E335D3B459` |

**The simulated CREATE address is a simulation artefact and MUST NOT be
treated as deployed.** Do not put it in `deployment.ts`, the README, or a
submission form.

---

## Phase B — you broadcast (ordered)

### B1. Import an encrypted keystore (once)

```bash
cast wallet import memepet-xlayer-testnet --interactive
cast wallet list
cast wallet address --account memepet-xlayer-testnet
```

Fund that address from the faucet. Confirm balance yourself.

### B2. Set the public RPC env (no secrets)

PowerShell:

```powershell
cd contracts
$env:XLAYER_TESTNET_RPC_URL = "https://testrpc.xlayer.tech/terigon"
```

bash:

```bash
cd contracts
export XLAYER_TESTNET_RPC_URL="https://testrpc.xlayer.tech/terigon"
```

### B3. Optional: simulate again

```bash
forge script script/DeployPetRegistry.s.sol:DeployPetRegistry \
  --rpc-url xlayer_testnet \
  --sender 0x0000000000000000000000000000000000000001
```

No `--broadcast`. No key.

### B4. Broadcast (human only)

```bash
forge script script/DeployPetRegistry.s.sol:DeployPetRegistry \
  --rpc-url xlayer_testnet \
  --account memepet-xlayer-testnet \
  --broadcast
```

Record from the successful receipt (status must be success — a hash alone is
not enough):

| Field | Value |
|---|---|
| Contract address | `0xe844152262D243a7B90F6e07FF7A67F1d7FeD216` |
| Transaction hash | `0x2ff191a789d48bc58f19e018dfee82aad4cba2ad50212d942e8e1e002fd593f9` |
| Block number | `41543244` |

`contracts/broadcast/` is gitignored. Do not commit broadcast artifacts.

---

## Phase C — after you hand over B4 values (agent / lead)

These are the values recorded from the Phase B broadcast.

### C1. Bytecode match (BLOCKER if runtime code differs beyond CBOR)

```bash
cast code 0xe844152262D243a7B90F6e07FF7A67F1d7FeD216 --rpc-url https://testrpc.xlayer.tech/terigon
forge inspect PetRegistry deployedBytecode --root contracts
```

Compare the on-chain code to local `deployedBytecode`.

- **Allowed:** trailing CBOR/metadata hash suffix may differ.
- **BLOCKER:** any larger difference means the live contract is not this
  repository’s `PetRegistry` (including the care-guard bytecode). Stop —
  do not update `deployment.ts`.

### C2. Live reads

```bash
cast call 0xe844152262D243a7B90F6e07FF7A67F1d7FeD216 "APPROVED_COMMUNITY_ID()(uint32)" \
  --rpc-url https://testrpc.xlayer.tech/terigon

cast call 0xe844152262D243a7B90F6e07FF7A67F1d7FeD216 "communityStats(uint32)(uint64)" 1 \
  --rpc-url https://testrpc.xlayer.tech/terigon
```

Expect on a fresh deploy:

- `APPROVED_COMMUNITY_ID` → `1`
- `communityStats(1)` → `0` (confirmed zero, not “unknown”)

### C3. Fill `src/lib/deployment.ts`

Only after C1 passes and C2 matches expectations. Committed `DEPLOYMENT`
fields map as follows — every value must be verified or remain `null`:

| Field | Value after testnet record |
|---|---|
| `status` | `"testnet"` |
| `networkName` | `"X Layer testnet"` |
| `registryAddress` | `0xe844152262D243a7B90F6e07FF7A67F1d7FeD216` |
| `explorerBaseUrl` | `"https://www.okx.com/web3/explorer/xlayer-test"` |
| `chainId` | `1952` |
| `rpcUrl` | `"https://testrpc.xlayer.tech/terigon"` |
| `currencySymbol` | `"OKB"` |

These values are now committed in `src/lib/deployment.ts`.
Local overrides may still use `NEXT_PUBLIC_MEMEPET_*` without committing an address.

### C4. Automated checks

```bash
npm run typecheck
npm run lint
npm test
npm run build
npm run test:contracts
npm run start -- --hostname 127.0.0.1 --port 3100
```

Then assert `/` is HTTP 200 and `/dev/pet`, `/dev/landing`, `/dev/community`
are HTTP 404 in that production server.

### C5. Explorer verification (optional — skipped by default)

Needs an OKLink API key tied to an OKX account. **This project does not
require it.** If you later opt in:

```bash
forge verify-contract 0xe844152262D243a7B90F6e07FF7A67F1d7FeD216 src/PetRegistry.sol:PetRegistry \
  --chain 1952 \
  --verifier oklink \
  --verifier-url https://www.oklink.com/api/v5/explorer/contract/verify-source-code-plugin/XLAYER_TESTNET \
  --verifier-api-key <your-key-not-committed> \
  --watch
```

If you have no key, leave the contract unverified on the explorer and say so
in the PR. Do not fake verification.

### C6. PR / CI

Open or update the PR with: address, tx hash, block, explorer link, bytecode
match result, and whether explorer verification was skipped.

---

## Related

- App hosting (independent of contract): `docs/deploy/VERCEL.md`
- Env templates: `.env.example`


---

## Recorded result — 21 September 2026

Deployed from a throwaway keystore wallet created with `cast wallet new`,
funded from the X Layer faucet. The private key was never displayed or shared.

| Check | Result |
|---|---|
| Deployer | `0x2ec8471290793FeB64792861Ce3102d291ce1CA1` |
| Contract | `0xe844152262D243a7B90F6e07FF7A67F1d7FeD216` |
| Deploy tx | `0x2ff191a789d48bc58f19e018dfee82aad4cba2ad50212d942e8e1e002fd593f9` |
| Block | `41543244` |
| Receipt status | `0x1` (read from the chain, not from forge's report) |
| Gas used | 354,926 at 0.02 gwei |
| Bytecode | `cast code` equals `forge inspect PetRegistry deployedBytecode` from `main` **byte for byte, including CBOR metadata** |
| `APPROVED_COMMUNITY_ID()` | `1` |
| `communityStats(1)` | `0` — a confirmed zero, not unknown |
| `communityStats(99)` | reverts `InvalidCommunity`, as audited |
| `petOf(deployer)` | `exists = false` |
| Explorer verification | Not done — needs an OKX-linked OKLink API key. The bytecode match above is the stronger guarantee that this is the repository's source. |

Explorer: https://www.okx.com/web3/explorer/xlayer-test/address/0xe844152262D243a7B90F6e07FF7A67F1d7FeD216
