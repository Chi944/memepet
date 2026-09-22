# MetaMask domain warning — 22 September 2026

Task: `QA-WALLET-WARNING`. **Reviewer reports the domain no longer appears flagged; a fresh wallet prompt remains unverified.** A separate local Anvil test is recorded in [LOCAL_ANVIL_2026-09-22.md](LOCAL_ANVIL_2026-09-22.md). Do not approve a prompt that still shows a warning.

## Observed and reported evidence

- A user-supplied screenshot of `https://memepet.vercel.app/pet` shows MetaMask's connection prompt for `memepet.vercel.app` with **Malicious—flagged as unsafe**. The selected account is labelled **Imported Account 1**. The page shows connection pending and chain `1` (switch required), not the application's intended X Layer testnet `1952`.
- In the subsequent message, the user reports that the connection works and the imported account matches `0x2ec8471290793FeB64792861Ce3102d291ce1CA1`. Record this as **USER-REPORTED connection and address match**. It is not an independently observed walkthrough pass or proof that the warning was cleared.
- Matching the existing address means this is the same underlying wallet previously used with Foundry. A different app, browser profile or unlock password does not create a new blockchain account. A genuinely separate demo account would have a different address.
- The earlier real Chrome attempts that returned **No injected wallet was found** remain historical evidence. They no longer describe the user's latest reported setup.
- No network-switch completion, adoption, care, rejected transaction, account switch, confirmed pet refresh or community increment was established by this screenshot or report. No receipt hashes were supplied. Do not unlock conditional success narration on this evidence alone.

## Limited source and deployment review

The public repository's main revision was `c0edf54bb9fa7fa0cff64287583d101bac46ef2f`. GitHub deployment `6591803636` for that revision had a successful Production status at `2026-09-22T13:28:59Z`. Its changes after app revision `07cadc58b29d91c7fcd78c10779557d2ac99b470` were six demo documentation files only.

A focused, read-only source review found:

- The connect handler requests `eth_requestAccounts`, then reads `eth_chainId`; it does not request a signature or submit a transaction.
- Contract writes are `adopt(1)` and `care()`, with a wrong-chain guard and no native-currency `value` field.
- The registry source has no token-approval/transfer methods, payable entrypoints or external calls.
- The focused search did not find custom external scripts, injected iframes, signature methods, unsafe HTML/eval or unexpected redirects.

This is a limited source review, **not a security audit or a verification of every byte served to the user's browser**. It does not establish that the live domain is safe or that MetaMask's classification is a false positive. The classification's precise provider, reason and removal requirements are unknown.

## Review route

[MetaMask's security-alert guidance](https://support.metamask.io/configure/wallet/security-alerts/), checked 22 September 2026, recommends not connecting or signing when a site is labelled malicious. It directs URL-classification disputes to its support team for manual review, including the flagged URL, network, screenshot and official project links. It notes that reviews can take several business days; no response time is guaranteed.

An ordinary page rebuild cannot be relied upon to clear an external classification. Investigate any issue identified by the review, fix and verify it if necessary, then request reassessment. Do not disable alerts or change domains/wallets merely to bypass the warning. Resume the signing walkthrough only after the concern has been investigated and resolved, with the intended account and chain checked again.

## Submission outcome — review requested

The user explicitly authorized submission on 22 September 2026. The request was first sent through MetaMask's official support chat without connecting a wallet to support. Its AI assistant directed the report to MetaMask's `eth-phishing-detect` review queue; the AI response itself was not a human review or a clearance.

A duplicate search for `memepet.vercel.app` returned no existing issues. The official blocklist-removal template was completed with the project URL, repository/revision, intended network and registry, the limited nature of the source assessment, and the user-supplied warning screenshot. The submitted request explicitly asks for routing if a different provider owns this classification.

**Submitted:** [MetaMask/eth-phishing-detect issue #296216](https://github.com/MetaMask/eth-phishing-detect/issues/296216), created `2026-09-22T15:06:00Z`. The published issue and screenshot were verified in the browser. It was initially OPEN with no comments. No secrets were included.

**Reviewer response:** At `2026-09-22T19:31:23Z`, repository collaborator `AlexHerman1` wrote, “this doesn't appear to be flagged anymore, please reply here or reopen if you are still seeing warnings,” and closed the issue. [Direct response](https://github.com/MetaMask/eth-phishing-detect/issues/296216#issuecomment-5782692269). Closure and comment were checked through GitHub's API. This is the reviewer's report, not proof that this browser's current prompt is clear or an exhaustive security clearance.

**User report on follow-up:** Only connection and network switching were approved; no signature, adoption/care transaction, spending limit or token approval was reported. Manual disconnect instructions were provided; successful permission removal has not yet been observed.

**Independent hosted-page observation on follow-up:** A fresh Chrome visit to `https://memepet.vercel.app/pet` displayed the intended full address, chain `1952`, pet **None yet**, community cares `0`, and the Adopt pet button. No connection or signing request was issued during this observation. It verifies an existing authorized connection, not a warning-free wallet prompt, and does not establish any adoption count from the care counter.

### Connect/disconnect assessment

The application connect handler requests accounts and chain ID. Automatic follow-up calls read the latest block, `petOf(address)` and `communityStats(1)`; pet reads repeat every 30 seconds. The checked connect path does not request a signature or call a contract write. Adoption, care and network changes have separate explicit callbacks.

**The audited pre-fix Disconnect button only clears React state. It does not revoke MetaMask site permissions.** A reload or provider account/network event can restore an already-authorized account through `eth_accounts`. This finding is being corrected in task `QA-WALLET-RELEASE`; the dated assessment here describes the original behavior. To remove the wallet's site permission manually, use MetaMask's account-view menu → **Dapp connections** → the site → **Disconnect**. Disconnecting does not revoke any token approvals already signed. See [MetaMask's documentation](https://support.metamask.io/more-web3/dapps/disconnect-wallet-from-a-dapp/).

### Public served-code spot check — 15:06 UTC

The public `/pet` HTML returned HTTP 200 and referenced 12 same-origin script-tag assets, all under `/_next/static/immutable/chunks/`. These returned JavaScript successfully and totalled 940,490 raw bytes. Two inline Next bootstrap/flight scripts were present; no external script origin appeared in those HTML script tags.

The served wallet chunk contained the checked `eth_requestAccounts` → `eth_chainId` handler, and the pet chunk contained `adopt(1)` / `care()` writes. Bundled viem also includes generic signing/approval helpers; their presence is not evidence of an application call, and this inspection did not establish that every possible runtime path is safe.

| Served chunk | SHA-256 |
|---|---|
| `36wsc-c-we1ff.js` | `70A5EFE13699BC456CE8DD1C5AEAEE4D7E194827D08CB28A25793D6065BF6B0D` |
| `27zh-3nrvff-o.js` | `673BE813D4F68A711BBBE481897B274CB33300099B809846A874D39B0871A69F` |

Cross-host byte comparison against the immutable deployment was blocked by its Vercel SSO redirect. Comparisons against the returned login HTML were discarded, not treated as mismatches. Dynamically loaded chunks, exhaustive dependency analysis, browser integrity and the classification rationale remain outside this bounded check. No downloaded JavaScript was executed by the inspection.

The assessment supports **no unexpected automatic write found in the checked connect path**, not permission to disregard the malicious-site warning or a confirmed false positive.

## Original support-request draft (retained for provenance)

**Subject:** Request manual review of MetaMask website classification for memepet.vercel.app

Hello MetaMask Support,

We maintain MemePet, a testnet pet-adoption and daily-care prototype. Please manually review the **Malicious—flagged as unsafe** classification shown for `https://memepet.vercel.app` during a MetaMask wallet connection request.

- Affected page: `https://memepet.vercel.app/pet`
- Intended network: X Layer testnet, chain ID `1952`
- Wallet chain shown when the warning appeared: Ethereum, chain ID `1`, before a network switch
- Public repository: `https://github.com/Chi944/memepet`
- Reviewed application source: `https://github.com/Chi944/memepet/tree/c0edf54bb9fa7fa0cff64287583d101bac46ef2f`
- Testnet registry: `0xe844152262D243a7B90F6e07FF7A67F1d7FeD216`
- Connection request in source: `eth_requestAccounts`, followed by `eth_chainId`
- Intended contract interactions: `adopt(1)` and `care()`. The reviewed source does not request token approvals or transfers.

We have a screenshot of the warning and have paused the transaction walkthrough. We are requesting an assessment rather than assuming the classification is incorrect. Please identify the reason/provider behind the classification, any remediation needed, and the reassessment process.

Thank you.

The submitted GitHub issue adapts this draft to MetaMask's template and includes the warning screenshot. Submission and the reviewer's later response are verified; a fresh warning-free wallet prompt and exhaustive security clearance are not.
