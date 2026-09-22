# MemePet — three-person demo script

Updated **22 September 2026**. Target **3:15**, within the organizer's **2–4 minute** requirement. Deadline: **25 September 2026, 23:59 UTC / 26 September, 07:59 Singapore**. [Official builder kit](https://www.okx.com/en-sg/learn/okx-dev-day-builder-kit).

**Script ready; wallet demonstration blocked.** Real Chrome reached “Not installed” and “No injected wallet was found.” No wallet connection approval, adoption or care was performed. Success lines below are **CONDITIONAL — UNVERIFIED**, not results. The locally integrated truthfulness fixes also need publication and verification on the actual recording deployment.

The integration is available in [draft PR #28](https://github.com/Chi944/memepet/pull/28)
and a [verified preview](https://memepet-21qy9t1rs-chi944s-projects.vercel.app/pet)
of commit `8a88f4b`. Wallet-free preview checks and CI passed; the same real
wallet connection attempt remained blocked. The production domain is unchanged.

## Speakers and recording pack

The user confirmed the display names **Deston, Kym and Larm**. Recording roles below follow the existing lead/A/B plan; exact full names for the submission form remain unverified.

| Speaker | Role in the recording | Individual script |
|---|---|---|
| Deston | Opening, wallet/adoption, close | [Deston / Lead](speakers/lead.md) |
| Kym | Pet experience, daily care, close | [Kym / Teammate A](speakers/teammate-a.md) |
| Larm | Persistence, community, scope, close | [Larm / Teammate B](speakers/teammate-b.md) |

Record each scene separately and slate its ID before the take. Keep two seconds of silence at both ends. Narration and face-camera clips can be recorded separately from the screen demonstration. Exclude conditional result lines until matching real evidence exists. Send original clips here in Codex, named by scene, speaker and take. See the [checklist](RECORDING_CHECKLIST.md) and [editor handoff](EDITOR_HANDOFF.md).

## Combined timeline

Quoted text is spoken. Other text directs capture and editing. Times are editorial targets; keep actual states readable and remain below four minutes.

### S01 · 0:00–0:20 · Deston · The idea

> “MemePet gives a meme community a daily ritual around a shared mascot. Connect a wallet, adopt a pet, and care for it over time. We built it on X Layer so the adoption and care history can be read from a public registry.”

Face-camera opening, then genuine landing-page footage. Title: **MemePet — X Layer testnet prototype**.

### S02 · 0:20–0:40 · Kym · The experience

> “The interaction is simple: one pet per wallet and one care action per UTC day. The app turns each recorded care into ten growth points. The three stages are Hatchling, Buddy and Guardian, with no missed-day penalty.”

Show landing steps and approved mascot artwork. Label a three-stage art strip **Stage artwork — progression rules**. This is not evidence of a wallet reaching every stage. First care gives 10 points and remains Hatchling; Buddy starts at 20, Guardian at 50.

### S03 · 0:40–1:20 · Deston · Connect and adopt

> “This demonstration uses X Layer testnet. I’m connecting a prepared demo wallet, then requesting an adoption. The registry records the pet against the wallet. There’s no token purchase or token approval; transactions still need network gas.”

Show genuine connection approval, adoption request, wallet transaction confirmation and pending state. Use this next line only after a successful receipt **and** a visible pet read-back — **CONDITIONAL / UNVERIFIED**:

> “The transaction has confirmed, and the app has read the new pet back.”

Overlay **Prepared team demo wallet · X Layer testnet** only once that preparation/disclosure is confirmed. Keep the continuous raw capture and full adoption hash. Label a waiting-time cut **Confirmation wait shortened**. A submitted hash alone is not success. No private wallet details in frame.

### S04 · 1:20–2:00 · Kym · Daily care

> “Now for the daily interaction: care for the pet and approve the transaction. The contract allows one care per UTC calendar day. The interface is designed to wait for confirmation and a fresh registry read before displaying growth.”

Show genuine care request, wallet confirmation and pending state. Use this result line only after checking the successful receipt, before/after values and cooldown — **CONDITIONAL / UNVERIFIED**:

> “This confirmed care added ten points. The pet is still a Hatchling, and the next care time is shown in UTC.”

This assumes a fresh pet's first care. If the verified state differs, rewrite the line before recording. Never animate an unearned stage change. Hold the actual cooldown and disabled care button.

### S05 · 2:00–2:35 · Larm · Persistence and community

This scene's narration is **CONDITIONAL / UNVERIFIED** until the matching walkthrough rows pass:

> “After refreshing, the same wallet’s pet and care progress are still here. The shared counter has also increased by one for this confirmed care. That number counts care actions, not people or pets. We show an unknown state when a read fails, rather than inventing a total.”

Show real refresh/reconnection if needed, then community values captured immediately before and after care. If other wallets acted during the interval, explain the actual difference rather than attributing their actions to this transaction. A public profile is optional; include a pet-bearing profile only after its real read matches the demonstrated pet. The supplied address's public page currently shows **no pet**.

### S06 · 2:35–2:55 · Larm · Integration and scope

> “The integration is a Solidity pet registry on X Layer, connected to a Next.js interface. This prototype supports one community and one mascot. There’s no MemePet token, marketplace or financial reward, and we’re presenting a testnet prototype, not a security-audited product.”

Show the real repository and configured contract address. Use an explorer page only if it loads and matches; label a code/configuration view as such. Bytecode comparison is not explorer source verification or a security audit.

### S07 · 2:55–3:15 · All three · Close

**Deston:**

> “Our aim is to make showing up for a community feel personal.”

**Kym:**

> “A small daily action gives the mascot a story you can follow.”

**Larm:**

> “MemePet: adopt the meme, grow the community. Explore the app and code through the links in our submission.”

Show each person in sequence, then the app and repository links on an end card. No unsupported user counts, partnerships or adoption claims.

## Evidence gates before the submission take

- [ ] Publish reviewed integration and identify the actual deployed revision.
- [ ] Human prepares/unlocks an injected demo wallet; verify chain **1952**, registry **`0xe844152262D243a7B90F6e07FF7A67F1d7FeD216`**, gas and consent to use it in the recording. A public address alone cannot sign.
- [ ] Run and document [the real wallet walkthrough](../qa/BROWSER_WALKTHROUGH.md), including rejection, adoption, refresh, care, cooldown, account switching and counter comparison. Keep failures and blocked rows honest.
- [ ] Keep Anvil time travel separate. Next-day care on X Layer needs a real later UTC day.
- [ ] Fill transaction hashes, receipts, wallet disclosure and before/after values in [submission notes](SUBMISSION_NOTES.md).
- [ ] Confirm full submission roster, team name, participation route, testnet eligibility and exact declaration. Form pages 2–3 remain unverified.
- [ ] Check app, repository, transaction links and uploaded video while logged out.

Capture the full QA run first, then use its genuinely successful clips after review. Adoption happens once per wallet, care once per UTC day. A separate retake needs another prepared wallet or a later day as appropriate; do not splice unrelated wallets into an apparently continuous journey. If the wallet remains unavailable, record S01/S02/S06/S07 and label the edit **REHEARSAL — WALLET DEMO MISSING**. That is not a completed working-integration submission.
