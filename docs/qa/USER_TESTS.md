# Usability test — three first-time users

Worksheet for testing https://memepet.vercel.app against the live X Layer
testnet registry `0xe844152262D243a7B90F6e07FF7A67F1d7FeD216` (chain 1952).

**Nothing in this file is filled in.** Every field stays blank until a real
session fills it. Do not pre-write an expected answer, and do not summarise a
session you have not run.

**Why this exists:** user value is an explicit judging criterion, and so far
everyone who has used MemePet also built it. Three people who have never seen
it will find things no amount of code review will.

---

## Before you start

- [ ] Run `docs/qa/BROWSER_WALKTHROUGH.md` yourself first. Do not put a
      stranger in front of a flow you have not confirmed works.
- [ ] Each participant needs a wallet on X Layer testnet with faucet funds.
      **Never a wallet holding real funds.** If they do not have one, seat
      them at a throwaway wallet you prepared, and record that you did.
- [ ] Have the faucet link open in advance — running out of gas mid-session
      wastes the participant's time and teaches you nothing about the product.
- [ ] Budget ~15 minutes per person.

## Consent script — read this aloud, before anything else

> "Thanks for helping. I'm testing a web app called MemePet, not testing you —
> if anything is confusing, that's information I want, and it's a problem with
> the app rather than with you. I'll ask you to do one task and then mostly
> stay quiet and watch, which can feel a bit awkward; that's normal. Please
> think out loud as you go. I'll take written notes about what you do and say.
> I won't record your screen, your face, or your wallet address, and my notes
> will refer to you only as a letter and number. You can stop at any time, for
> any reason, without explaining. This uses a test network, so no real money is
> involved at any point. Any questions before we start?"

- [ ] Consent asked and given — P1
- [ ] Consent asked and given — P2
- [ ] Consent asked and given — P3

Record participants as **P1, P2, P3 only**. No names, no wallet addresses, no
screenshots containing a wallet. If a participant says something that
identifies them, paraphrase it.

## The task

Give them exactly this, once, and then stop talking:

> "Adopt a pet and care for it."

That is the whole brief. Do not explain what a pet is, do not point at the
Connect button, and do not mention the network.

**The rule:** you do not help unless they are completely stuck — meaning they
have stopped making progress and have said so, or they are about to abandon.
When you do help, write down what you had to say. The thing you had to say is
the finding.

---

## P1

| | |
|---|---|
| **Date / time** | |
| **Device and browser** | |
| **Wallet used** (their own, or a prepared throwaway) | |
| **First moment of confusion** (what, and at what point) | |
| **Where they got stuck** (if anywhere) | |
| **What they said** — their words, quoted | |
| **What you observed** — what they did, not what you inferred | |
| **Did you have to help? What did you say?** | |
| **Completed the task?** (adopted / cared / both / neither) | |
| **Time to first confirmed care** | |
| **Anything they tried that does not exist** | |

## P2

| | |
|---|---|
| **Date / time** | |
| **Device and browser** | |
| **Wallet used** (their own, or a prepared throwaway) | |
| **First moment of confusion** (what, and at what point) | |
| **Where they got stuck** (if anywhere) | |
| **What they said** — their words, quoted | |
| **What you observed** — what they did, not what you inferred | |
| **Did you have to help? What did you say?** | |
| **Completed the task?** (adopted / cared / both / neither) | |
| **Time to first confirmed care** | |
| **Anything they tried that does not exist** | |

## P3

| | |
|---|---|
| **Date / time** | |
| **Device and browser** | |
| **Wallet used** (their own, or a prepared throwaway) | |
| **First moment of confusion** (what, and at what point) | |
| **Where they got stuck** (if anywhere) | |
| **What they said** — their words, quoted | |
| **What you observed** — what they did, not what you inferred | |
| **Did you have to help? What did you say?** | |
| **Completed the task?** (adopted / cared / both / neither) | |
| **Time to first confirmed care** | |
| **Anything they tried that does not exist** | |

---

## Keep observation and interpretation apart

Two different columns above, on purpose:

- **Observed** is what a camera would have caught. "Clicked Care twice, waited,
  scrolled down, clicked Care again."
- **Said** is their words in quotes. "I don't know if that worked."

Your explanation of *why* they did it is neither. If you want to record a
theory, mark it as a theory.

## Things worth watching for specifically

Not a checklist to march through — just where this app is most likely to lose
someone. Leave blank if it did not come up.

| Moment | Did it cause trouble? | Notes |
|---|---|---|
| Understanding what MemePet is, before connecting | | |
| Finding the Connect wallet action | | |
| Being on the wrong network, and recovering from it | | |
| Understanding that adopting is a transaction | | |
| Waiting through pending without thinking it had failed | | |
| Realising growth appears only after confirmation | | |
| Understanding the once-per-UTC-day rule | | |
| Reading the community total as "care actions", not people | | |
| Anything at 390px on a phone | | |

---

## Findings — fill in only after all three sessions

### The three changes that would most help a new user

Each one must name the observation that motivated it. If you cannot point at
something a participant actually did, it does not belong here.

| # | Change | The observation that motivated it | Participant |
|---|---|---|---|
| 1 | | | |
| 2 | | | |
| 3 | | | |

### Bugs found

File these the same way as any other bug — environment, reproduction steps,
expected, actual, sanitised console output. Do not fix product code to make a
session look better.

| # | What happened | Reproduction | Owner |
|---|---|---|---|
| | | | |

### What went right

Worth recording too: anything a participant understood immediately, or liked
without prompting. If the honest-data framing (unknown shown as unknown, a
rejected transaction awarding nothing) registered with anyone, quote them —
that is the project's main differentiator and a real user reaction to it is
worth more in the submission than any self-assessment.

| Participant | What worked, in their words |
|---|---|
| | |