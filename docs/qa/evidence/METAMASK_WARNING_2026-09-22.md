# MetaMask domain warning — 22 September 2026

Task: `QA-WALLET-WARNING`. **Classification unresolved; pause wallet transaction walkthrough.**

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

## Ready-to-send support request — NOT SUBMITTED

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

**Before sending:** attach the warning screenshot after checking it contains no private information. Use MetaMask's official support route; no wallet connection is required for the documented “Continue without wallet” support option. Do not include wallet files, recovery words, passwords or private keys. This draft has not been sent, and no review ticket or clearance exists yet.
