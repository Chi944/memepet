# MemePet — three-person demo script

Updated **22 September 2026, 13:30 UTC**. Target **3:20**, inside the organiser's
**2–4 minute** limit. Submission closes **25 September 2026, 23:59 UTC**
(26 September, 07:59 Singapore). [Official builder kit](https://www.okx.com/en-sg/learn/okx-dev-day-builder-kit).

Three documents, one per job:

| You are… | Read |
|---|---|
| Speaking on camera | [Read-aloud script](#read-aloud-script) and your [speaker file](speakers/) |
| Operating the browser and wallet | [Recording plan by UTC day](#recording-plan-by-utc-day) and [scene directions](#scene-directions) |
| Editing | [Editor handoff](EDITOR_HANDOFF.md) |

Nothing below has been recorded yet. Lines marked **⚑ CONDITIONAL** describe a
result and may be used only beside footage of that result actually happening.

---

## The story in one breath

Most meme communities are transactional: you belong by buying. MemePet gives a
community a daily ritual instead — adopt a mascot, care for it once a day, and
grow it by showing up. **The app only believes the chain:** a declined or failed
transaction awards nothing, and an unreadable value is shown as *unknown*, never
as zero. That last sentence is what makes this project different, so the video
**shows** it rather than just saying it.

---

## Recording plan by UTC day

A pet evolves from Hatchling to Buddy at 20 points, and each confirmed care adds
10. The contract allows one care per **UTC** calendar day. So a real, filmable
evolution needs **two cares on two different UTC days** — and the calendar still
allows it, but only if the first care happens today.

| When (UTC) | What to capture | Scenes |
|---|---|---|
| **Day 1 — 22 Sep, before 23:59 UTC** | Decline the adopt request, then adopt, then the first care (0 → 10 points, still Hatchling), the cooldown, and a hard refresh. Note the community total before and after. | S03, S04, S06 |
| **Day 2 — 23 Sep, after 00:00 UTC** | The second care: 10 → 20 points and the **real Hatchling → Buddy evolution**. Then the public pet page and its share link. | S05, S06 |
| Day 2 or 3 | Face-camera clips for all three speakers. These need no wallet and can be recorded any time. | S01, S02, S07, S08 |
| **Day 3 — 24 Sep** | Edit, caption, review against the evidence gates. | — |
| **Day 4 — 25 Sep** | Final logged-out link check, then submit **well before 23:59 UTC**. | — |

**If Day 1 slips past 23:59 UTC tonight**, the evolution can no longer be filmed
before the deadline. Drop S05, extend S04 by 10 seconds, and say nothing about
Buddy beyond the stage artwork in S02. Guardian (50 points, five cares) is not
reachable before the deadline under any plan — do not imply it.

### Setting up the demo wallet

The browser needs an injected wallet; a keystore file on disk cannot sign in a
browser. The simplest safe route:

1. Install OKX Wallet (or MetaMask) and **create a brand-new wallet inside the
   extension**. Do not import any wallet that holds real funds.
2. Add X Layer testnet: chain ID **1952**, RPC
   `https://testrpc.xlayer.tech/terigon`, symbol **OKB**.
3. Fund it. Either use the [faucet](https://web3.okx.com/xlayer/faucet), or send
   a little OKB from the deployer wallet yourself, in your own terminal:
   `cast send <new-address> --value 0.05ether --rpc-url https://testrpc.xlayer.tech/terigon --account memepet-xlayer-testnet`
   (it prompts for your keystore password; `0.05ether` means 0.05 OKB here).
4. Confirm the wallet shows chain 1952 and a balance, and that the new address
   has **no pet** yet — open `https://memepet.vercel.app/pet/<new-address>`.

Never film wallet creation, the recovery phrase, or the password prompt.

---

## Read-aloud script

Spoken words only. About 150 words per minute is a comfortable pace; each scene
lists its word count so no one has to rush.

### S01 · Deston · The hook · 0:00–0:20 · 43 words

> "In most meme communities, belonging means buying a token and watching a
> chart. MemePet offers a different ritual: adopt a mascot, care for it once a
> day, and grow it just by showing up. Every adoption and care is recorded on
> X Layer."

### S02 · Kym · The rules · 0:20–0:40 · 45 words

> "It's deliberately simple. One pet per wallet, and one care per day. Each
> confirmed care adds ten growth points. At twenty, your Hatchling becomes a
> Buddy; at fifty, a Guardian. Miss a day and you lose nothing — this is a
> ritual, not a chore."

### S03 · Deston · Adopt — and decline first · 0:40–1:20 · 51 words

> "I'm on X Layer testnet with a demo wallet. I'll request an adoption — and
> first, I'll decline it on purpose."

*(decline in the wallet)*

> "Nothing is created, and no progress appears. The app only believes the
> chain. Now I'll approve it."

*(approve; wait for confirmation)*

> ⚑ **CONDITIONAL** — "Confirmed, and the app has read the new pet back from the
> registry."

### S04 · Kym · The first care · 1:20–1:50 · 38 words

> "Now the daily action. Care, approve, and wait — growth only appears once the
> transaction confirms."

> ⚑ **CONDITIONAL** — "Ten points. Still a Hatchling. And care is now closed until
> the next UTC day — the time is shown right here."

### S05 · Kym · The next day · 1:50–2:15 · 32 words

Record on **Day 2** only.

> "It's the next UTC day, so care is open again."

> ⚑ **CONDITIONAL** — "That's twenty points — and Mochi evolves into a Buddy. We
> didn't animate this for the video; the chain says it happened."

### S06 · Larm · Persistence and community · 2:15–2:45 · 46 words

> ⚑ **CONDITIONAL** — "After a hard refresh, the same pet is still here — it's
> read from the chain, not saved in the browser. The community counter rose by
> one for each confirmed care. And every pet has a public page anyone can open,
> read straight from the registry."

### S07 · Larm · What's underneath · 2:45–3:05 · 40 words

> "Under the hood is a Solidity registry on X Layer and a Next.js app. There's
> no MemePet token, no marketplace and no financial reward. And wherever the app
> can't read something, it says 'unknown' — it never guesses a number."

### S08 · All three · Close · 3:05–3:20

**Deston** · 10 words
> "We wanted showing up for a community to feel personal."

**Kym** · 12 words
> "A small daily action gives the mascot a story you can follow."

**Larm** · 13 words
> "MemePet: adopt the meme, grow the community. The links are in our submission."

---

## Scene directions

**S01.** Face camera for the first sentence, then genuine landing-page footage.
Title card: **MemePet — X Layer testnet prototype**.

**S02.** Landing page "How it works", then the three stage images. Label the
artwork **Stage artwork — progression rules**: it explains the thresholds and is
not evidence that any wallet reached them.

**S03.** Show the **X Layer testnet** chip in the app bar. Capture the wallet's
request, the decline, and the app afterwards — no pet and no growth. Then the
approval, the pending state and the confirmed read-back. Overlay **Demo wallet ·
X Layer testnet**. Keep the continuous raw capture and the adoption hash. A
shortened wait is labelled **Confirmation wait shortened**. The ⚑ line needs a
successful receipt *and* the pet visibly read back.

**S04.** Capture the community total **before** caring. Then the care request,
pending state, confirmed 10 points, and the cooldown with its UTC time and the
disabled button. Hold each state long enough to read.

**S05 — Day 2.** Same wallet, same browser. Caption the scene **Recorded 23
September — next UTC day** so the jump is explained, not hidden. Show 10 → 20
points and the stage change from Hatchling to Buddy. If the evolution animation
(Teammate A's A4) is merged, it plays here on its own; do not add effects in the
edit. If the stage does not change on camera, cut this scene rather than fake it.

**S06.** Hard refresh (Ctrl+Shift+R) with the same wallet; the pet returns. Show
the community total **after** caring beside the before value from S04. If other
wallets cared in the meantime, say the actual difference rather than claiming
it. Then use **Share your pet** to open the public page at
`/pet/<address>` — it must show the same pet, read from chain.

**S07.** The repository and the contract address in `src/lib/deployment.ts`. Use
the explorer page only if it loads and matches; label a code view as code.
Bytecode comparison is not explorer source verification and not a security
audit — do not call it either.

**S08.** Each face in sequence, then an end card with the app URL, the
repository URL and the contract address.

---

## Time budget

| Scene | Speaker | Length | Words | Needs wallet |
|---|---|---|---|---|
| S01 | Deston | 0:20 | 43 | no |
| S02 | Kym | 0:20 | 45 | no |
| S03 | Deston | 0:40 | 51 | Day 1 |
| S04 | Kym | 0:30 | 38 | Day 1 |
| S05 | Kym | 0:25 | 32 | Day 2 |
| S06 | Larm | 0:30 | 46 | Day 1 + 2 |
| S07 | Larm | 0:20 | 40 | no |
| S08 | All | 0:15 | 35 | no |
| **Total** | | **3:20** | **330** | |

Scenes with a wallet run longer than their word count suggests, because the
screen is waiting on confirmations. If the edit runs over 4:00, cut in this
order: the public-page half of S06, then S05's second sentence, then S02's last
sentence.

---

## Evidence gates before the submission take

- [x] Application fixes from #22 and #26 deployed; production checked at revision
  `35186b5` on 22 September. Recheck the exact deployment before filming.
- [ ] Demo wallet prepared as above: chain **1952**, registry
  **`0xe844152262D243a7B90F6e07FF7A67F1d7FeD216`**, funded, no existing pet, and
  consent to show its public address on camera.
- [ ] [Wallet walkthrough](../qa/BROWSER_WALKTHROUGH.md) run and documented,
  including the decline, adoption, refresh, care, cooldown, account switching
  and the counter comparison. Keep failed or blocked rows honest.
- [ ] Day 2 care recorded after 00:00 UTC on 23 September, or S05 cut.
- [ ] Anvil time travel kept out of the video entirely. Next-day care on X Layer
  needs a real later UTC day.
- [ ] Transaction hashes, receipts, wallet disclosure and before/after values
  filled into [submission notes](SUBMISSION_NOTES.md).
- [ ] Full roster, team name, participation route, testnet eligibility and exact
  declaration confirmed on the form.
- [ ] App, repository, transaction links and the uploaded video checked while
  logged out.

Capture each wallet session in full first, then pick genuinely successful clips.
Adoption happens once per wallet and care once per UTC day, so a retake needs a
second prepared wallet or a later day — never splice two wallets into what looks
like one journey. If no wallet demo is possible, record S01, S02, S07 and S08 and
label the edit **REHEARSAL — WALLET DEMO MISSING**; that is not a working
integration submission.
