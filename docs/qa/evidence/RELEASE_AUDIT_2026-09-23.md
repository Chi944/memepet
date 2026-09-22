# Release audit — 23 September 2026 (Singapore)

Task: `QA-WALLET-RELEASE`. This is a bounded source, dependency and browser review, not a guarantee that no security risk exists.

## Integration scope

- Audited the merged changes from `07cadc5` through `2394853` (`origin/main`): PRs [33](https://github.com/Chi944/memepet/pull/33), [34](https://github.com/Chi944/memepet/pull/34), [35](https://github.com/Chi944/memepet/pull/35), [36](https://github.com/Chi944/memepet/pull/36) and [37](https://github.com/Chi944/memepet/pull/37).
- Original public-pet and truthfulness work is already integrated. PRs #22 and #26 are MERGED; `origin/feat/public-pet-page` is an ancestor of current main. No fetched remote branch has commits outside main. No open PR existed when this audit began.
- Saved demo corrections at `66362b6` have identical `docs/demo` content to the pre-audit integrated tree; commit `c041ea2` retained that saved work. No extra saved demo changes were dropped.
- Git listed the main checkout and `memepet-qa-warning` as the repository's registered worktrees. Main was clean but behind. This audit preserved the QA worktree's pending evidence as commit `3d1b2dc`, then merged latest main without conflicts. The only discarded incidental change was Next's generated development type-import path in `next-env.d.ts`.
- PRs #34–37 introduce no dependency, contract, wallet-hook or deployment-configuration changes. Artwork provenance remains documented in `docs/pet-assets.md`; original licensing was not independently verified by this audit.

## Findings and fixes

1. **Disconnect did not revoke site permission.** The old handler only cleared React state; hydration/provider events could restore the account. The release requests `wallet_revokePermissions` for `eth_accounts`, reads accounts back before reporting revocation, and handles failed/unsupported revocation with manual instructions. Local disconnect intent survives reload; stored success is rechecked. Stale asynchronous reads cannot reconnect the app. Independent review also caught and corrected stale revocation messages across tabs and lost account changes during connection. [MetaMask RPC reference](https://docs.metamask.io/metamask-connect/evm/reference/json-rpc-api/wallet_revokePermissions/).
2. **Demo timing was too restrictive.** Missing the first proposed filming day does not prevent two care actions on two later UTC dates before the deadline. The revised plan uses actual confirmed care days and retains an explicit shorter cut if the second care is unavailable.
3. **Evidence status was stale.** Documentation now distinguishes historical missing-provider attempts, observed local connection/network display, an observed existing hosted connection, the interrupted local signature test, and the reviewer's response to the domain warning. None is relabelled as a successful browser adoption/care.

No actionable regression was found in the teammate artwork, evolution and share-image changes. Evolution still consumes the receipt-and-reread-gated flag; it is not awarded by an animation. Reduced-motion CSS covers the new animation selectors. Share images use fixed local assets and retain no-pet/unavailable states.

## Bounded security checks

- Connect requests accounts and chain ID. The app's only contract-write path chooses `adopt(1)` or `care()`, checks the intended chain, and supplies no native-currency value. The reviewed registry exposes nonpayable methods and contains no token approval/transfer or external-call mechanism.
- Fresh read-only `cast chain-id`, `cast code` and `forge inspect PetRegistry deployedBytecode --root contracts` comparison: chain **1952**, registry `0xe844152262D243a7B90F6e07FF7A67F1d7FeD216`, **1,397 deployed bytes**. Executable bytecode matches after removing each CBOR metadata trailer using its encoded length. Full bytecode differs, consistent with the previously documented metadata-only source change; this is not explorer source verification. `petOf` for the user's address returned `false/0/0/0`; `communityStats(1)` returned `0`. No write or signature was performed.
- Source searches found no application `personal_sign`, typed-data signing, custom external script/iframe, `eval`, or `dangerouslySetInnerHTML` usage. Generic signing helpers in bundled viem are library capabilities, not evidence of app calls. This was not exhaustive dependency source analysis.
- `npm audit --json`: **0 known vulnerabilities**, all severities, at audit time. This database result cannot establish absence of undisclosed issues.
- Public `/pet`: HTTP **200**, `X-Frame-Options: DENY`, CSP `frame-ancestors 'none'`, `X-Content-Type-Options: nosniff`, and `Referrer-Policy: strict-origin-when-cross-origin`. This CSP prevents framing; it is not a restrictive script-source policy.
- [MetaMask review #296216](https://github.com/MetaMask/eth-phishing-detect/issues/296216#issuecomment-5782692269) is closed with a collaborator reporting that the domain no longer appears flagged. Current warning removal in the user's extension has not been independently observed. Leave any warning prompt unapproved.

## Checks actually completed

- Focused PetScene, ShareImage, PNG-render and og-art tests: **19 passed, 4 files**.
- Registry-hook and public-pet tests: **15 passed, 2 files**.
- `npm run test:contracts`: **15 passed, 0 failed** (Solc 0.8.24).
- `git diff --check 07cadc5..origin/main`: passed.
- Final `npm test`: **111 passed across 20 files**, including 23 wallet tests with mocked providers. These are not real wallet approvals.
- Final `npm run lint`: exit **0**, no errors, one existing `@next/next/no-img-element` warning in the Open Graph `ShareImage.tsx` renderer. The rule was not disabled.
- Final `npm run build`, then `npm run typecheck`: **passed** with explicit public X Layer testnet settings. An initial build caught TS2774 in a listener capability check; that check was corrected before this successful rerun. The non-failing Vite future configuration-loader warning remains.
- Demo documentation consistency: eight scene word counts, three speaker-script matches and 26 relative links checked. Combined script: **326 spoken words**, **3:20 target**; actual footage timing remains unverified.

## Browser evidence and limits

Fresh real Chrome hosted `/pet` displayed `0x2ec8471290793FeB64792861Ce3102d291ce1CA1`, chain **1952**, pet **None yet**, community cares **0**, and Adopt pet. No connection or signing request was initiated for this inspection. The user reports only connecting/switching networks.

The separate [local run](LOCAL_ANVIL_2026-09-22.md) verified connection and chain **31337** before its servers stopped. The rejection test reached awaiting-signature, with no observed human rejection/approval. No browser adoption/care receipt, account-switch check, cooldown, next-day evolution or confirmed-pet refresh is claimed. Wallet extension URLs are blocked by browser-tool policy; no alternate control route was used.

Browser reduced-motion behavior, external social-preview caching/cropping, and the original artwork licence chain remain outside this pass. No user keystore, recovery phrase, password or private key was read or decrypted. A site rebuild cannot itself certify removal of an external security classification.
