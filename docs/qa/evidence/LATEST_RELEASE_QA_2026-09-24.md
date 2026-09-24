# Latest release QA — 24 September 2026 UTC

This record separates genuine wallet actions from controlled previews and tests.
It supplements, rather than replaces, the earlier [capture record](FINAL_CAPTURE_2026-09-24.md).

## Release and environment

- Hosted app: `https://memepet.vercel.app/pet`, Chrome on Windows.
- Production deployment `6643843361` succeeded at 17:21:03 UTC for commit
  `19c3fac1f097955f2b6e409ab2f4ab988abc0cee`.
- The freshly reloaded page exposed the receipt-retry chunks
  `30lftcqme8i56.js` and `2x9b5lqjuhrmh.js`. Deployment identity is supported by
  GitHub/Vercel's deployment record and public asset names; no private deployment
  access was bypassed.
- X Layer testnet, chain 1952; registry
  `0xe844152262D243a7B90F6e07FF7A67F1d7FeD216`.
- Humans operated MetaMask. Automation operated the app and independently read
  public receipts/state. No keys, passwords or recovery words were accessed.

## Genuine Account 1 run

Account: `0x3876722934FF2D3dC998656864BD5E8BBe1D5774`.

| Check | Actual result | Result |
|---|---|---|
| Account switch without reload | The wallet's general account selection initially left the site's Account 2 unchanged. After changing MemePet's connected account, the page changed from Account 2's 10 points/cooldown to Account 1's 0 points/Ready. | PASS for the actual site-account switch |
| Reload before care | Account 1, chain 1952, 0 points, Ready and community total 2 recovered. | PASS |
| Awaiting signature | Clicking Care displayed awaiting approval, no awarded progress and a disabled action. | PASS |
| Approved first care | Human approved; app automatically displayed 10 points, Done today and disabled care until 25 September 00:00 UTC. Receipt and read-back verified below. | PASS |
| Automatic community read | The rendered DOM displayed **Unknown** after care although the confirmed chain total was 3. | FAIL on 19c3fac; recovery fix required |
| Reload after care | Same account, 10 points, cooldown and community total 3 recovered. | PASS; does not turn the preceding failure into a pass |
| Switch to an account with no pet | Account 3 (`0xb7E6D789c39D468CfE3c5dA37C29Bd9852247B3a`) appeared with None yet and the mascot invitation; Account 1's live pet disappeared without reload. | PASS |

The browser accessibility snapshot retained an older community value while a
fresh rendered-DOM snapshot showed Unknown. The failure above uses the fresh
DOM, not the stale accessibility value. No seamless automatic counter update
is claimed. Original local observations and receipt JSON are retained in the
private production archive under `media/capture/latest-release-qa/`.

### Receipt and exact counter attribution

- Care transaction:
  `0x5a4861a8b7429b856c7e77467a1f70a22fd365b6ce44a64ab9657fcebc00b4e4`.
- Successful receipt: block **41,814,062**, 24 September **18:01:39 UTC**;
  sender Account 1, target the registry above, chain 1952, transferred value 0,
  calldata `0x093a37ff` (`care()`).
- Baseline block **41,814,035** at 18:01:12 UTC: community total **2**.
- Block **41,814,061**: total **2**. Receipt block **41,814,062**: total **3**.
- Interval `(41,814,035, 41,814,114]` contained exactly one `Cared` event:
  Account 1, this transaction, community 1, care count 1, UTC day 20720.
- Receipt-block `petOf(Account 1)` returned `(true, 1, 1, 20720)`.

The public RPC served these pinned reads afterward. The original failed
browser response was not captured, so its underlying provider cause remains
unproven.

## Recovery change under verification

Failed community reads now offer **Retry community total** with a clear
read-only explanation. Retry retains the last receipt block, drops results
from a previous wallet session, and never resubmits adoption/care or invents a
counter. The existing bounded automatic retry policy is unchanged.

Focused hook/page tests passed (11 tests), including failure → Unknown →
manual retry at the same block → correct total while an unpinned latest result
remains stale. The test asserts only one wallet write. Focused typecheck/lint
also passed. These controlled tests are not a genuine browser retry pass.

**Fresh hosted adoption/care/recovery on the new revision: NOT RUN yet.**
Account 3 is funded and connected in preparation; that does not establish a
transaction or a passed recovery.

## Visual follow-up

- Local `/dev/pet`, explicitly fictional data, visible in the in-app browser:
  effective `prefers-reduced-motion: reduce` was true. Buddy + Success +
  celebration preserved the artwork, 20-point fixture, stage label and
  confirmation text. Computed animation names were all `none`: PASS for this
  reduced-motion preview configuration.
- Missing artwork preview displayed the labelled placeholder: PASS.
- `/dev/community` Unknown total displayed **Care actions: Unknown** and no
  fabricated zero: PASS.
- Landing/button hover transforms are now gated on no motion preference.
- Normal-motion foreground animation verification: NOT RUN; the user explicitly
  preferred to keep reduced motion on. No OS preference was changed by automation.
- A real later-UTC-day evolution remains NOT RUN; preview stages do not prove
  earned progression.

## Repository and workspace cleanup

Retired completed prompts, editorial files and superseded snapshots from the
active source tree. A hashed private copy and [pinned history](README.md)
preserve the original records, including failures. All application modules,
tests, contract source, six used pet/share assets, lockfile and license notices
remain. No unused source/dependency deletion was justified by the import and
TypeScript checks.

Removed three clean, fully merged worktrees without force after checking
ancestry, tracked/untracked files and ignored content. Their Git branches
remain. A unique ignored forge-std copy was preserved with matching hashes.
Private video/edit sources and final exports are outside the submitted repo.

## Automated validation

- `npm run test:contracts`: 15 passed.
- `node --test docs/qa/counter-check.regression.mjs`: 8 passed.
- `npm test`: 123 passed across 21 files.
- `npm run typecheck` and `npm run build`: passed.
- `npm run lint`: passed with zero errors and the existing `ShareImage.tsx`
  plain-image warning (server-rendered share art).
- Local production HTTP: `/` 200; `/dev/pet`, `/dev/landing`, `/dev/community`
  each 404. Temporary development/production servers were stopped afterward.
- Final hosted deployment and fresh wallet validation of the recovery control:
  pending; no pass claimed yet.
