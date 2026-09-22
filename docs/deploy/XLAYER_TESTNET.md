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
| Bytecode | Historical **byte-for-byte match, including CBOR metadata**; matching contract source pinned to `587ceb054d35dd4b7c04a8dd580dcab3b743b30b` in the 22 September comparison below |
| `APPROVED_COMMUNITY_ID()` | `1` |
| `communityStats(1)` | `0` — a confirmed zero, not unknown |
| `communityStats(99)` | reverts `InvalidCommunity`, as audited |
| `petOf(deployer)` | `exists = false` |
| Explorer verification | Not done — needs an OKX-linked OKLink API key. The exact bytecode comparison above verifies the pinned historical source build; it is not explorer source verification. |

Explorer: https://www.okx.com/web3/explorer/xlayer-test/address/0xe844152262D243a7B90F6e07FF7A67F1d7FeD216

## Source comparison — 22 September 2026

PR #26 (`8b7882da22e67aa31eabbc7a1f1e3138732c222b`) adds an SPDX header to
`PetRegistry.sol`. The contract's executable logic is unchanged. Recompiled
both the historical source at `587ceb054d35dd4b7c04a8dd580dcab3b743b30b` and
PR #26 through the installed Solidity **0.8.24+commit.e11b9ed9** standard JSON
interface: optimizer enabled, 200 runs, Cancun EVM, IPFS metadata and the
repository's `forge-std/=lib/forge-std/src/` remapping. Compared both results with
a fresh `eth_getCode` read from the configured X Layer testnet RPC.

| Check | Actual result |
|---|---|
| Historical compiled bytecode vs deployed code | **Exact match**, including metadata |
| PR #26 compiled bytecode vs deployed code | **Not an exact full-bytecode match**; metadata differs |
| Executable runtime, excluding trailing CBOR and its length | **Identical**, 1,344 bytes |
| ABI and storage layout between the two source builds | **Identical** |
| Full deployed-bytecode length, both builds | 1,397 bytes |
| Trailing CBOR plus two-byte length, both builds | 53 bytes |
| Historical/deployed full-bytecode keccak256 | `0xef261f8fd7613eeaee1b0a0485d6aff7c10847738e602392fb78486f52329a4b` |
| PR #26 full-bytecode keccak256 | `0x517380ddf2da261531e099f00d5531c3137243b1578b6173c760af2697fdc458` |
| Shared executable-runtime keccak256, excluding metadata | `0x6fcce1f70d73a84f5856dd7464f34d26d99f500726e8c653c21dae67b646bb90` |

The suffix was separated using its encoded two-byte CBOR length, not by
assuming a fixed metadata prefix. Solidity includes source hashes and license
identifiers in metadata, so even a comment-only source edit can change the full
bytecode. See [Solidity 0.8.24 metadata documentation](https://docs.soliditylang.org/en/v0.8.24/metadata.html).
No contract was redeployed during this comparison. These read-only checks do
not establish a successful browser wallet connection, adoption or care.
