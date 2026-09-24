# Final video capture — X Layer testnet, 24 September 2026 UTC

**The 185-second edit is exported and file/audio QC passed; team review and public upload remain open.** This
record covers the newly prepared **Account 2**, separately from the earlier
24 September acceptance account. It does not combine their transactions into
one apparent journey. A rejection observation is not an adoption/care pass.

## Environment and release

| Field | Observed value |
|---|---|
| Site | `https://memepet.vercel.app/pet` |
| Network | X Layer testnet, chain **1952**; test gas currency OKB |
| Registry | `0xe844152262D243a7B90F6e07FF7A67F1d7FeD216` |
| Demo wallet, Account 2 | `0x86F7De84EBB97c875e1494675Bfcd664f0773CE9` |
| Account preparation | Human-prepared demo account, funded with **0.002 test OKB**; not an organic-user claim |
| Released revision | `0cd895dbfdba6de67e3666e465300da549e80b19`, PR #48 |
| Release verification | Vercel production deployment **6642307101** succeeded **16:03:37 UTC**; public `/pet` bundle contained the new retry code before capture |
| Operator | Deston handles wallet prompts; Codex observes/operates permitted app controls |
| Clock convention | Times below are **24 September UTC**, which is 25 September Singapore after 16:00 UTC |

The root session observed Account 2 connected, chain 1952, **Pet: None yet**
and **Community cares: 1** before requesting adoption. No private wallet
material was requested or recorded for this evidence.

## First genuine rejection — observed, incomplete video coverage

At approximately **16:31 UTC**, after the human rejected the adoption request,
the user's screenshot and the app's accessibility state showed:

- Account `0x86F7…3CE9`, chain **1952**.
- **Pet: None yet**, with the adoption button still available.
- **Community cares: 1**.
- **“You declined the wallet request. No progress was awarded.”**
- The pictured mascot explicitly labelled as illustration, not an owned pet.

The saved app screenshot `account2-rejected-no-pet.png` was independently
inspected during documentation review and contains those values. The extension's
Cancel click was a human action; automation did not operate it.

**Result: PASS for the genuine rejection and unchanged no-pet/no-progress
outcome, within this observation scope.** The chain read below corroborates the
unchanged state but would not, by itself, prove that a human rejected a prompt.

### Fixed-block read after rejection

Read captured **2026-09-24T16:32:10.745Z** from the configured public RPC:

| Read | Value |
|---|---|
| Block | **41,808,690** |
| Block UTC | **2026-09-24T16:32:07.000Z** |
| Block hash | `0xf344d7d6e036c11ff2c3726a36dab49940fb73ac918eb46125d9c30ca5b86366` |
| Account nonce | **0** |
| Account balance | **2,000,000,000,000,000 wei = 0.002 test OKB** |
| `petOf(account).exists` | **false** |
| Community / care count / last care day | **0 / 0 / 0** |
| `communityStats(1)` | **1** |

No transaction hash is invented for a rejected request. The later adoption is
a separate approved action, recorded below.

### Capture limitation

The first recording stopped/timed out around **16:30 UTC**, before cancellation.
Its raw recording **does not contain the wallet Cancel click**. Do not describe
it as an uninterrupted video of the whole rejection. A guarded retake began
around **16:35 UTC**. In that retake, the human again reported rejection and the
root session observed the declined message, then reloaded to **None yet**.
Adoption was subsequently approved as recorded below. The recording remains
subject to frame/source-interval review; do not infer a visible Cancel click
from the fact that a capture process was running.

## Approved adoption — genuine browser and chain result

The human approved Account 2's adoption on the fixed release. The root session
observed the fresh app state **Adopted**, **Mochi / Hatchling**, **0 growth
points**, care **Ready**, and community **1**. The saved
`account2-after-adoption.png` independently shows the account/network, Adopted,
0 points, Ready care and community 1. Review of the original recording found
a brief pet read-failure message at source **102.5–104.6 seconds**, followed by
recovery at approximately **104.8 seconds**. The selected S03 sequence retains
that failure/recovery. This establishes eventual successful read-back on the
release, not an uninterrupted successful read or proof that a particular retry
branch caused recovery.

| Transaction evidence | Verified value |
|---|---|
| Adoption hash | `0xc80f760cd2c61e97ee7db43a207db32b9ba835e51c9187a320b91e8e9ec8a9a0` |
| Receipt | **success**, block **41,809,003**, UTC **2026-09-24T16:37:20.000Z** |
| From / to | Account 2 / registry listed above |
| Transaction value | **0**; testnet gas only |
| Decoded call | **`adopt(1)`** |
| Event | Matching **Adopted** log for Account 2 and community 1 |
| Independent read-back | Block **41,809,066**, UTC **16:38:23**, hash `0x0a98e9d285ee51e81a6fb3989272cc90627fc02ce97756c03b71d35a4ae034cd` |
| Read state | Pet exists, community **1**, care count **0**, last care day **0**; community total **1**, nonce **1** |

Source JSON captured **2026-09-24T16:38:26.829Z**. Its bounded log scan covers
blocks 41,808,690–41,809,066. **PASS for approved adoption, successful receipt
and eventual fresh pet read-back, with the transient read failure retained.**
Selected video source intervals are **88.500–93.000** and **97.000–115.533
seconds**. An idle wallet wait is shortened; this is an edited sequence, not
uninterrupted real time.

## First care — confirmed progress, read failures and capture gaps

The human approved Account 2's first care. The root session observed **10 growth
points**, Hatchling, **Done today**, a disabled care button, and the next care
time **25 September 00:00 UTC**. A saved app screenshot at **16:40:31 UTC**
shows that recovered state. These are genuine observations on revision
`0cd895d`; they do not prove an uninterrupted successful receipt read.

| Transaction evidence | Verified value |
|---|---|
| Care hash | `0x707beed648f7383f7804f2f4d46d5a6a3b86174d55b4d6bcc41affa4279004cf` |
| Receipt | **success**, block **41,809,168**, UTC **2026-09-24T16:40:05Z** |
| From / to / value | Account 2 / registry above / **0** |
| Decoded call/event | **`care()`**; matching **Cared** for Account 2, community **1**, care count **1**, UTC day **20720** |
| Community immediately before receipt | Block **41,809,167**: **1** |
| Community at receipt | Block **41,809,168**: **2** |
| Attribution interval | Exactly **one Cared event** in **(41,809,003, 41,809,266]**, matching this transaction/owner/receipt |
| Later pinned read | Block **41,809,266**, UTC **16:41:43**, hash `0x02e0ad3b3f7ef702b4ae3cf068680de8b12277922691d4867829bf4ba80a87c2` |
| Later state | Pet exists, community **1**, care count **1**, last care day **20720**, community total **2**, nonce **2** |

Source JSON captured **16:41:46.291 UTC**. **PASS** for real care, successful
receipt, the later observed 10-point pet read-back, cooldown and independently
attributed community chain delta **1 → 2**. Before/after observations establish
changed state; they are not continuous footage of the transition.

### Recorded frames do not establish a seamless care flow

Review of `account2-walkthrough-take3.mp4` found **0 growth points** and the
red message **“Care confirmed on chain, but refreshing the pet failed. The
displayed state may be out of date.”** around source time **293 seconds**.
The media audit subsequently identified the first red read-failure frame at
**8029 / 267.633 seconds** in the 30 fps source.
This differs from the saved 16:40:31 UTC app screenshot showing 10 points and
cooldown. Only one MemePet Chrome tab was identified. The cause of the differing
captured states is **unproven**; a compositor problem was suspected, but neither
that explanation nor the precise timing of recovery has been established.
Do not dismiss the recorded read-failure message as an artefact.

Source **393–524 seconds** is solid green and unusable. This take does **not**
provide a usable continuous care-success **0 → 10** or refresh shot. Preserve
the failure in QA evidence. The receipt, fixed-block reads and app screenshots
remain valid separate sources; a still image may illustrate an observed state
but must not be presented as uninterrupted live action. Re-capture any required
continuous demonstration, or disclose the use of verified stills in the edit.

### Selected edit treatment and export checks

The 185-second edit uses the actual care request/approval-pending footage
at **262.600–267.600 seconds**, followed by the original
`account2-first-care-result.png` with the persistent label **“After confirmation
· original browser still”**. That image was captured at **16:40:31.052 UTC**
and independently inspected: it shows 10 growth points, Done today, disabled
care and the 25 September UTC availability time. It does not show a continuous
transition from zero.

S05 opens with six seconds of the original hard-refresh result screenshot,
labelled **“After manual hard refresh · original browser still”**, then uses
public-page footage from **557.000–568.267 seconds**. S06 pairs verified receipt
and fixed-block values with the original Unknown-state screenshot. Stills use
only a bounded 3.5% camera push; no UI values are altered. The exact cuts and
labels are recorded in the final source manifest.
This treatment discloses the capture gaps; it does not convert them
into continuous-video passes.

The first native ChatCut H.264 export passed file QC: **1920×1080, 30 fps,
5,550 frames / 185 seconds**, full decode, no interior solid-green/black frames,
and correct captions. Its audio measured **−23.67 LUFS / −4.31 dBTP**. A second
render raises all three voices by 3 dB for clearer playback, preserving the
same edit, as `MemePet_The_Four_Musketeers_OKX_Dev_Day_FINAL_1080p.mp4`.
The final export independently passed full decoding and repeat audio/file QC.

| Final export measurement | Verified value |
|---|---|
| Filename | `MemePet_The_Four_Musketeers_OKX_Dev_Day_FINAL_1080p.mp4` |
| Native render ID | `22b933a1-d32e-42ee-860b-89003547c28c` |
| Video | H.264, **1920×1080**, **30 fps**, **5,550 frames** |
| Duration | **185.000 seconds video**, **185.088 seconds container**; within 2–4 minutes |
| File size | **22,115,573 bytes** |
| SHA-256 | `d5aed29429e259be4230117aaa71d41a0e890a3588ca50039c772052cf699f80` |
| Audio | **−20.67 LUFS**, **−1.28 dBTP**; no clipping detected |
| Decode | Full decode completed with exit code **0** |
| Review boundary | Metadata, decode, audio measurements and caption checks; no human end-to-end watch/listen is claimed |

All **5,550 decoded frames** were compared with the first export at 96×54:
5,486 were equal at that scale, and 64 showed minute variation (worst mean
absolute error **0.0083/255**). The worst frame was also checked at full
resolution and was visually clean. This supports no material new visual issue,
not byte-for-byte video identity. The earlier **19 visual/caption checkpoint**
checks remain applicable. No human full watch/listen is claimed.

A reviewed public upload, team sign-off and submission receipt remain
unverified; local file creation does not establish any of those outcomes.

The separate `MemePet_The_Four_Musketeers_OKX_Dev_Day.srt` was corrected from
the exporter's 43 raw-ASR cues to the **66 canonical final captions**. The video
timeline itself did not change. The corrected sidecar was verified and has
SHA-256 `80850f33b9bd989e55b026cfe217bfa9610048be55947de552b8cd68b7d5611f`.
Do not distribute the obsolete ASR-caption export.

**FAIL for the immediate community-header refresh in this run:** after the
receipt, the header went from 1 to **Unknown** while the pet correctly showed
10 points. Unknown truthfully represents a failed read; it is not the chain
count. Captured console output did not disclose the RPC exception (only wallet
extension warnings were noted), so its exact cause is unknown. Do not describe
this take as a seamless immediate 1 → 2 browser update.

PR #48 retried the pet receipt reads only. The follow-up
[PR #49](https://github.com/Chi944/memepet/pull/49) shares that bounded same-block
availability retry with community refreshes. Its automated tests are separate
from this failed live read. **No genuine care after that fix is established by
this record.**

PR #49 merged as **`3d0428e89c591282beb558a2411367ebd4d28bd2`** after App,
Contracts and Vercel checks passed. Main CI also passed with **122 app tests**.
Production deployment **6643249022** succeeded at **16:50:38 UTC**; public `/pet`
bundles contained the new shared helper. This release evidence does not change
the outcome of the earlier recorded care.

## Human refresh, copying and disconnected public view

The human reported performing **Ctrl+Shift+R**. The root session then observed
the same Account 2, Hatchling, **10 points**, disabled UTC cooldown and community
total **2**. The screenshot `account2-after-human-hard-refresh.png` contains
that recovered state. **PASS for persistence and recovery after the human's
reported hard refresh**; the earlier automated shortcut did not demonstrate a
refresh and is not counted.

The root clicked **Copy link** and observed **Link copied**. The clipboard's
pasted contents were not separately inspected, so this records the control's
observed result only. The root then clicked Disconnect and observed verified
account-access revocation / **Not connected**. The saved disconnect screenshot
was taken during **Disconnecting…**, before the later completed accessibility
observation; it alone does not prove completion.

Without reconnecting, the root opened Account 2's public pet URL and observed
the **read-only** page with the same Hatchling and **10 points**. Public-header
and full-width growth screenshots were retained. **PASS for the disconnected
public view**; no visitor care action or wallet signature was needed.

The homepage subsequently displayed community **2** but no milestone percentage.
This is intentional: successful live mapping in `map-community.ts` keeps
`milestoneTarget: null` until a verified target exists. The unavailable-target
label is not evidence that the count read failed; do not invent a milestone.

## Current acceptance and footage matrix

| Check | Genuine action/result evidence | Final video source |
|---|---|---|
| Connected account/network | OBSERVED in the app, as above | Source interval pending |
| Reject adoption; no pet/progress | **PASS within the observations above**, including the repeated retake result | First capture incomplete; selected guarded retake **26.000–44.033s** contains genuine rejection/unchanged state |
| Approved adoption, receipt and pet read-back | **PASS for successful receipt and eventual 0-point Hatchling**, after a transient pet-read error | Take 3 **88.500–93.000s + 97.000–115.533s**, with read failure/recovery retained and idle wait shortened |
| First care, receipt, later 10-point state and cooldown | **PASS for the transaction and observed result**; recorded pet-refresh failure retained | Working edit uses actual request footage then the labelled original result still; no continuous 0 → 10 claim |
| Prompt community update after care | **FAIL on `0cd895d`**: Unknown after receipt; **1 → 2 chain delta verified**; fixed-release real rerun NOT RUN | Preserve failure/refresh context; no synthetic counter |
| Refresh/public page consistency for Account 2's pet | **PASS after human-reported hard refresh**, then disconnected public view | Working edit labels the original refresh-result still, then shows public-page video; no continuous refresh action claimed |
| Hosted disconnect | **PASS**, root observed completed account-access revocation | Screenshot catches transition; completed result is the later accessibility observation |
| Account-switch regression | **PENDING a specific checked transition/result** | Optional in final film |
| Later-day evolution | **NOT RUN for this account; not claimed** | S08B uses labelled stage artwork/rules |
| Finished video/export | **185-second MP4 exported; file/audio QC and 66-caption sidecar checks passed** | Team review, public video URL and submission receipt remain unverified |

Fill approved transaction hashes, successful receipts, exact before/after blocks,
counter attribution, actual UI observations and source in/out times only after
they are verified. Preserve failures and retries rather than replacing them
with success claims.

## Source manifest

Originals are local production media under `memepet-video/media/capture/`, not
uploaded to the public source repository by this draft.

| Source | SHA-256 / purpose |
|---|---|
| `account2-after-rejection-2026-09-24T16-32-10-745Z.json` | `df8409b7f0f52580a5c6ed44f4c690ac96d7edc6da68c410f5b52552e5e7069d` — fixed-block read-only state |
| `account2-rejected-no-pet.png` | `2e8e1ec6313a372a20a552b93b417870aaba78942f54fd94e1895a0eba0e92b0` — app result screenshot |
| `account2-adoption-chain-evidence.json` | `8a01a5232899e762ece5d45869715efda50f32a57b90712fc5a93b8ded98e324` — adoption transaction, receipt/event and pinned read-back |
| `account2-after-adoption.png` | `9583315db6d74923065f1956adf4fc1494f18349dfe502153b3a1dde1686b03a` — app adoption/read-back result |
| `account2-care-chain-evidence.json` | `cdebaaef9bc48cdc036c54d73fd464be8ad530bfe8716fe50dfce92a8b0996db` — care receipt/event, counter delta and pinned read-back |
| `account2-first-care-result.png` | `673e3c535e2ccc12b7cca1ec9c808f32d4411cac4e1768eda1cd573ee5f188c3` — original 16:40:31 UTC care-result still; 10 points and cooldown |
| `account2-after-human-hard-refresh.png` | `58cfcbe27f951c043eede37e0d95541fae7c77296654c237141dab455d2c1fb4` — recovered same pet, cooldown and total 2 |
| `account2-postcare-community-unknown.png` | `0d1df9df57f658ca67b0280e0b8c07f88d75255ac955ef423b94ba2f49a08db0` — original post-care Unknown header |
| `account2-disconnected-before-public.png` | `aeef7e672c2d936d6c24fa85aa7bfd5b1fbfd1365f28d8e7f47c089e7cadaa6b` — disconnect transition, not completion proof alone |
| `account2-public-disconnected.png` | `251b70eebf5924284bb8fbb7de0e7d51d93e5facc18cbfa80acde7896a604b15` — read-only public-page header |
| `account2-walkthrough-take3.mp4` | `6f937bc634bfdf4bd24336f5b9c8c6deee1cc50c733c1fe97ff92ba89c9efe03` — pet-read error begins at 267.633s; 393–524s is solid green. **No usable continuous care-success/refresh shot.** Use reviewed intervals only |
| `final-source-evidence.json` | Local source/hash and audio-analysis manifest updated **17:03:56 UTC**, containing final selected source cuts and explicit still labels |

Earlier successful care/receipts belong to the separate wallet in
[FINAL_ACCEPTANCE_2026-09-24.md](FINAL_ACCEPTANCE_2026-09-24.md). Larm's
[browser audit](LARM_FINAL_BROWSER_QA.md) and the [release summary](../../STATUS.md)
remain separate evidence categories.
