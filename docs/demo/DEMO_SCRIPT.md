# MemePet — combined demo script

**Script ID: MP-EQ-20260923-v1.** Updated 23 September 2026 (Singapore).
Creative direction: playful and polished, with Mochi's personality and clear product proof.
Target **3:25**; final export must stay within the organiser's **2–4 minute** limit.
Submission closes **25 September 2026, 23:59 UTC** (26 September, 07:59 Singapore).
[Official builder kit](https://www.okx.com/en-sg/learn/okx-dev-day-builder-kit).

This replaces the previous camera-led script. It keeps Claude's real rejection
beat and later-UTC-day evolution, with **three substantive turns per person**.
Deston, Kym and Larm each have **130 selected spoken words: 390 total**.
These are equal word allocations, not measured audio durations. Final speaking
time must be balanced after the three recordings arrive.

## Read this before recording

This is a **planned narration, not a record of completed wallet actions**.
Browser adoption and care remain unverified in the current evidence log.
Every scene marked **CONDITIONAL** needs matching genuine footage before its
result narration can enter the submission. Voice recording alone proves nothing.

The team can record the planned lines now. If footage later contradicts a line,
record a correction and rebalance the word counts. Do not edit an app state,
transaction receipt or animation to manufacture the missing result.
If core adoption and care cannot be demonstrated, label the cut **REHEARSAL —
WALLET DEMO MISSING**; it is not the finished working-product submission.
The S08 alternate replaces only the optional evolution scene.

Use the [wallet walkthrough](../qa/BROWSER_WALKTHROUGH.md) for the operator,
[recording checklist](RECORDING_CHECKLIST.md) for capture,
[production plan](PRODUCTION_PLAN.md) for visuals and sound, and
[editor handoff](EDITOR_HANDOFF.md) for assembly.
Current facts and unresolved eligibility questions belong in
[submission notes](SUBMISSION_NOTES.md).

## Three MP3 files

| Person | Read-aloud file | Selected scenes | Upload filename |
|---|---|---|---|
| Deston | [Deston's script](speakers/lead.md) | S01, S04, S07 | `MemePet_Deston_MP-EQ-v1.mp3` |
| Kym | [Kym's script](speakers/teammate-a.md) | S02, S05, S08A **or** S08B | `MemePet_Kym_MP-EQ-v1.mp3` |
| Larm | [Larm's script](speakers/teammate-b.md) | S03, S06, S09 | `MemePet_Larm_MP-EQ-v1.mp3` |

Record **one MP3 per person**, with no face-camera requirement. Read only your
quoted lines, in scene order. Say each scene ID first, leave two seconds of
silence, read the block, then leave two seconds before the next ID. The editor
removes IDs and excess silence. Keep your natural voice; do not add music,
effects, speed changes or synthetic narration.

Aim for a relaxed **125–135 words per minute**, approximately one minute of
selected speech each. Speak clearly rather than forcing an exact stopwatch time.
Record in a quiet room at a steady microphone distance; keep the original.
Export 44.1 or 48 kHz MP3 at 192 kbps or better if your recorder offers those
settings. If you stumble, pause and repeat the whole sentence.

Kym records **one selected S08 version**. If the choice is still open, both may
be included under separate slates in the same MP3 as an optional pickup; only
one 42-word version enters the final. That pickup is not extra screen time.
No group call is needed: the editor interleaves all three voices.

## Combined read-aloud script

The quotes contain all selected narration. Directions and labels are not spoken.
Wallet verbs use “we” because one human may operate every prompt while all three
people narrate. No line claims that a particular speaker personally signed.

### S01 · Deston · Meet Mochi · 0:00–0:20 · 42 words

> "Meet Mochi. Tiny paws, very serious about attention. We built MemePet for meme communities that want a warmer reason to return together. Adopt a wallet linked pet, care for it daily, and watch a small shared ritual grow on X Layer testnet."

**Picture:** Genuine landing-page and pet artwork footage. Title: **MemePet ·
OKX Dev Day 2026 · X Layer testnet prototype**. If showing a stage the demo
wallet has not earned, label it **Stage artwork**. Pause after “attention”.

### S02 · Kym · Say no first · 0:20–0:44 · 44 words · CONDITIONAL

> "First, a small test: what happens if we say no? We request adoption, then reject it in the wallet. Nothing new appears. No pet, no points. Mochi can wait. That matters: a button click starts a request, but it never counts as confirmed progress."

**Proof:** Start with a wallet that has no pet. Capture the adoption request,
human rejection, and the resulting page with no created pet or awarded growth.
Hold the unchanged result. Keep the continuous raw capture; a mock or a
cancelled browser click does not prove wallet rejection.

### S03 · Larm · A real adoption · 0:44–1:09 · 44 words · CONDITIONAL

> "Now we approve adoption on X Layer testnet. The app shows the request waiting, then checks the successful receipt and reads the registry again. Here is our new Hatchling, starting at zero points. This is the same wallet throughout, with one pet per wallet."

**Proof:** Same wallet, chain 1952 and intended registry. Capture approval,
pending state, successful receipt and fresh read showing a Hatchling at zero
points. Keep **[ACTUAL ADOPTION HASH]** in the evidence record until captured.
Label any shortened wait **Confirmation wait shortened**.

### S04 · Deston · One daily care · 1:09–1:34 · 44 words · CONDITIONAL

> "Time for care. We approve the request and wait for confirmation. Ten growth points appear, and Mochi is still a Hatchling. The care button now waits until the next UTC day. One little check in is enough; nobody needs to keep clicking all afternoon."

**Proof:** First care request, approval, receipt, ten points and disabled care
button with its UTC availability time. Keep **[ACTUAL FIRST CARE HASH]**.
Speak “UTC” as three letters. The rule uses UTC calendar days, not a rolling
twenty-four-hour timer.

### S05 · Kym · Refresh and share · 1:34–1:56 · 44 words · CONDITIONAL

> "Will Mochi survive a refresh? Yes: the same pet and growth return from the registry. We can also open this public pet page without connecting a wallet. Sharing gives the community a way to see a pet's progress, without asking visitors to sign anything."

**Proof:** Hard refresh, let the live read finish, then show the same wallet's
public page in a browser context with no connected wallet. Match pet and growth.
Do not substitute a preview or cached screenshot for the refresh claim.

### S06 · Larm · A shared total · 1:56–2:18 · 44 words · CONDITIONAL

> "Each confirmed care also adds one to the community care total. Here are the readings around our care, alongside its receipt. That total measures care actions, not people or adopted pets. If the read fails, the interface shows unknown instead of inventing a number."

**Proof:** Capture the community total before and after the first care with the
same receipt as S04. Preserve **[ACTUAL BEFORE TOTAL]** and **[ACTUAL AFTER
TOTAL]** until recorded. Other wallets may care between reads; do not attribute
their increase to this wallet. Zero cares does not establish zero users or pets.
The last sentence describes implemented handling, not a filmed outage. If
illustrating it, label it **UI state example**; do not fake a live failure.

### S07 · Deston · Why the chain matters · 2:18–2:39 · 44 words

> "X Layer holds the shared record: adoption and care events in our Solidity registry. The Next.js app turns confirmed care counts into growth and stages. Wallet approval, a successful receipt, then a fresh read: that is the path from an action to visible progress."

**Picture:** Actual code/registry view and an explanatory **Wallet approval →
Receipt → Fresh read → Pet progress** diagram. Label diagrams as explanations.
Show the explorer only if it loads and matches the recorded deployment.
Code, bytecode comparison and passing tests are not independent security audits.

### S08A · Kym · Earned Buddy · 2:39–3:04 · 42 words · CONDITIONAL

> "We returned on a later UTC day for care number two. Now Mochi has twenty points and becomes a Buddy. A tiny glow up, genuinely earned. Guardian begins at fifty points, and missing a day never takes earned growth away from you."

**Use only with:** Second confirmed care for the same wallet on a later UTC
date, ten-to-twenty points and the actual Hatchling-to-Buddy change in the app.
Caption **Recorded [ACTUAL UTC DATE] — later UTC day**. Preserve **[ACTUAL SECOND
CARE HASH]**. An added animation cannot stand in for earned progress.

### S08B · Kym · Honest alternate · 2:39–3:04 · 42 words

> "These are the stage designs, shown as artwork. Two confirmed cares earn twenty points and unlock Buddy; five earn fifty and unlock Guardian. We have not captured that evolution here. Missing a day never takes earned growth away. Mochi keeps your place."

**Use instead of S08A when evolution footage is missing.** Show approved stage
assets with the persistent label **Stage artwork — progression rules** and
thresholds 0 / 20 / 50. Do not morph the demo wallet into Buddy or show a fake
transaction. The core adoption and first-care proof is still required.

### S09 · Larm · The next chapter · 3:04–3:25 · 42 words · CONDITIONAL

> "Our next goal is to test this daily ritual with a real meme community and learn what brings people back. For now, you can inspect the app, code, and recorded transactions in our project submission. MemePet: a little care, a shared story."

**Picture:** Return to the demonstrated pet, then an end card with
`memepet.vercel.app`, `github.com/Chi944/memepet`, all three names and the
declared testnet. The package must actually contain the app, accessible code
and recorded transaction links before using this line.
The community test is a **future goal**, not claimed adoption, retention or partnership.

## Equal contribution and timing

| Speaker | Blocks and counts | Selected words | Measured final speech |
|---|---|---:|---|
| Deston | S01 42 + S04 44 + S07 44 | **130** | **PENDING MP3** |
| Kym | S02 44 + S05 44 + S08A or S08B 42 | **130** | **PENDING MP3** |
| Larm | S03 44 + S06 44 + S09 42 | **130** | **PENDING MP3** |
| **Total** | Nine selected blocks | **390** | **PENDING MP3** |

Counts use whitespace-separated words inside the quoted narration only;
contractions and `Next.js` count as one. Slates, directions and the unused
alternate are excluded. Recheck counts after any spoken-line edit.
The proposed 3:25 includes readable proof holds; it is not a measured runtime.
Balance selected speech after upload, using pickups instead of unnatural speed changes.

## Capture across real UTC days

First care earns ten points. Buddy needs two confirmed cares on different UTC
calendar days; Guardian needs five. Skipping a day does not remove growth.

| Session | Required footage |
|---|---|
| Day 1, preferably 23 September UTC | S02 rejection, S03 adoption, S06 timestamped community baseline, S04 first care/receipt and S06 refreshed total, cooldown, S05 refresh/public page |
| A later UTC date, preferably 24 September UTC | S08A second care and real Buddy evolution, or select S08B |
| Before export | Match results to footage, fill evidence placeholders, measure duration and speaker balance |
| Before 25 September, 23:59 UTC | Check links while logged out and complete the submission |

UTC date changes at **08:00 Singapore time**. Schedule against receipt timestamps
and the app's cooldown label. First care on 24 September UTC and second on 25
September UTC leaves little editing margin.

Do not time-travel Anvil or combine wallets into a supposed continuous testnet
journey. Retakes must respect one adoption per wallet and one care per UTC day.
Keep testnet labels visible, hide keys/passwords, retain originals and receipts,
and leave unverified results unverified.

## Research applied

The [Tamayoshi finalist showcase](https://ethglobal.com/showcase/tamayoshi-9mw4g)
and [creator demo](https://www.youtube.com/watch?v=3JoavKWtOgQ) provide a relevant
example: retrieved automatic captions connect pet actions, changed state and
explorer history. That informs S03–S07; its duration is not our template.
Onchain pets already exist, so this script makes no “first ever” claim.

[Angpao.money's finalist narrative](https://ethglobal.com/showcase/angpao-money-1mn7c)
uses a familiar personal ritual and clear user journey. That informs the warm
opening without copying its words or claiming its results.
[ETHGlobal's demo guide](https://ethglobal.com/events/singapore2024/info/details)
supports short introductions, clear human speech, real product use and removal
of idle waiting. These are editorial references, not extra OKX rules.
Only the organiser can determine eligibility or advancement.
