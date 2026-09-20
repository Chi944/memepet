# Lead — technical lead prompt pack

Run one task at a time in the approved shared repository. These prompts describe work to perform; none of it has already been implemented by this kit. The lead is the integration owner, not simply a third feature developer.

## L0 — Create the foundation BEFORE teammates code

**Human input:** approved repository; decision to use the existing app or start one fresh; approved design direction. No passwords or wallet secrets.

**Prompt**

> I am the technical lead for MemePet. Read AGENTS.md, docs/PROJECT_BRIEF.md, docs/OWNERSHIP.md, docs/DEV_SETUP.md, src/types/view-models.ts and src/fixtures/ui-fixtures.ts. Inspect the repository and report what already exists. We have two beginner contributors. Do not reinitialize or replace an existing application.
>
> Work on L0 only. Propose a minimal setup plan, files, dependencies and executable checks. Do not implement contract logic or add product features yet. For an empty repository, propose one Next.js/TypeScript app with the approved styling approach and a minimal component test setup; wait for approval before installation/scaffolding. For an existing app, reuse its package manager, conventions and test tools.
>
> After approval, provide the component shells and developer previews specified in OWNERSHIP. Export the agreed names without inventing new prop types. Previews need labeled fictional data, controllable states and callback counters, and must work without a wallet. Create only enough shared UI for consistent buttons/cards. Gate preview routes out of production and verify this with a production build. Configure and document actual dev/typecheck/lint/test/build commands, with one passing example test. Record the baseline. Keep external services, secret values and deployment out of this task.
>
> Return changed files, actual command output summaries, how to start each preview, unresolved setup problems and the exact starting task for A and B.

**Acceptance:** both teammates can run the same baseline; previews render the agreed shells; scripts exist and pass; no production fixture route; no duplicate apps. Do a small paired pull request before independent work.

## L1 — Minimal contract with tests

**Allowed:** contract source/tests/local scripts and lead-owned integration documentation. No teammate UI edits.

**Prompt**

> Implement L1 only after reading the project rules and inspecting existing contract tooling. Propose the contract interface and test plan before editing. We need a wallet-linked non-transferable registry, not an NFT or token. Proposed calls: adopt(communityId), care(), petOf(wallet), communityStats(communityId). One pet per wallet. A fixed, approved community configuration. One care per UTC calendar day, including clearly tested midnight-boundary semantics. Each successful care increments personal careCount and that community's counter once. Derive growth points and stage rather than storing redundant values. Permit the first care after adoption; handle the initial last-care sentinel explicitly. Emit adoption/care events.
>
> Do not add payments, token approvals/transfers, arbitrary XP grants, randomness, upgradeability, or external calls inside care. Use checked, bounded storage types and reject invalid community IDs and duplicate adoption. Test no-pet care, first care, duplicate same-day care, next-day care, boundary timing, independent wallets, exact counter increments and evolution thresholds in the display mapper. Run the local tests and report exact results. Do not deploy or request secrets. Unverified token addresses stay unconfigured, not invented.

**Acceptance:** the lead can explain the state changes and constraints; tests actually pass. Treat AI review as assistance, not an audit or a guarantee of mainnet safety.

## L2 — Earliest working integration, then the care loop

**Allowed:** lead-owned hooks, libraries, routing, contract interface files and integration tests. Do not redesign A/B components.

**Prompt**

> Work on L2 in two reviewed slices. First connect a wallet, deploy only to the explicitly authorized development/test environment, adopt, read the resulting pet, and recover the same state after refresh. Verify current network configuration from official documentation before configuration. Human authorization is required for deployment and signing; never request or print seed phrases/private keys.
>
> Second, integrate care and community reads. Inspect the agreed view-model types. Build the smallest mapper and hooks that convert confirmed chain state into those props. The live parent supplies onCare/onConnect/onSwitchNetwork; presentational components do not fetch or award progress. Use the existing wallet libraries rather than adding a second wallet system.
>
> Handle missing wallet, wrong chain, initial loading, nonexistent pet, unavailable read, rejection, submission, confirmation and retry. Block duplicate submissions in the controller as well as disabling the button. Award/display confirmed growth only after the receipt indicates success and the relevant data is refreshed; show a refresh failure honestly. Invalidate cached data on chain or account changes. Never load fictional fixtures when a live read fails. A failed optional token-holder read must not stop care. No token approval is needed by this design.
>
> Wire the smallest reviewed components from A and B. Report actual integration evidence, environment, public transaction references where available, and any feature still using a preview. Do not claim a successful transaction merely because a hash exists.

**Acceptance:** connected adoption and care are real; refresh persists; rejection gives no growth; a wallet switch cannot show another wallet's stale pet as its own; community progress comes from the same declared deployment.

## L3 — Review and release gate

**Prompt**

> Review the integrated MemePet core loop against docs/QA_CHECKLIST.md. Inspect the actual diff and current code; do not declare an audit. Verify contract configuration, chain/address mapping, transaction success semantics, cache keys, error states, secret hygiene and production preview exclusion. Run the documented checks and investigate reproducible failures without weakening checks. Review the production build and the exact commit to be deployed. Do not deploy until I explicitly authorize the target environment and deployment action. Return blockers separately from polish, with files and reproduction steps. Confirm which stretch features must remain out of the demo.

## Lead review budget

Integrate a small working slice as soon as it is reviewable. Keep at most one implementation task active per teammate, and avoid letting several unreviewed changes accumulate. Do not take on art cleanup, copy and video editing when teammates can own them. When blocked on chain integration, pause stretch work rather than widening the product.
