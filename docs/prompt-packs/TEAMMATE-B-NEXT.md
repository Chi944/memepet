# Teammate B — what to do next (B3, then B4)

Updated 21 September 2026. **Submission closes 25 September, 23:59 UTC.**

Read this instead of the original `TEAMMATE-B.md` B1/B2 sections. The lead has
already built `LandingHero`, `HowItWorks` and `CommunityPanel` and they are
merged on `main`. **Your remaining work is the long pole on this project.**
Nobody has tested the app as a user, and there is no demo material.

You now own `HowItWorks` as well (see `docs/OWNERSHIP.md`).

## Before anything else

You already have write access. Clone and confirm the baseline runs — no
teammate has confirmed this yet, so a failure is itself a finding.

```bash
git clone https://github.com/Chi944/memepet.git
cd memepet
npm ci
npm run dev
```

The live site is https://memepet.vercel.app.

## B3 — execute the browser walkthrough (do this first)

**Allowed:** `docs/qa/**`.

Branch: `feat/b3-qa-walkthrough`.

`docs/qa/BROWSER_WALKTHROUGH.md` already exists with every step written and
every actual-result field **blank**. It was left blank deliberately. Your job
is to fill it in by actually doing it.

The steps that need a real wallet have never been exercised by anyone:

- connect, approve
- adopt, **reject** the signature — no pet may be created
- adopt, approve — the pet may appear only after the receipt confirms
- hard refresh — the same pet must come back
- care, approve — growth may appear only after confirmation
- care again the same day — cooldown state, UTC time shown, button disabled
- advance one day, care again
- **switch accounts mid-session — the previous wallet's pet must not still be
  displayed**
- the community total increments by exactly one per confirmed care

### Prompt

> Read docs/QA_CHECKLIST.md and docs/qa/BROWSER_WALKTHROUGH.md. I am testing
> MemePet as a beginner user. Walk me through executing every step in that
> worksheet against the environment the lead names, and help me record what
> actually happened in the blank fields.
>
> Do not pre-mark anything as passing. If you do not have browser access, say
> so and leave the result as "not run" — do not describe a terminal command as
> a visual test. Do not claim to have signed a transaction or tested a wallet
> you cannot access.
>
> Explain how to capture a useful screenshot or error without exposing an
> address I care about, a private key or a seed phrase.
>
> For every failure, record environment, exact reproduction steps, expected
> result, actual result and sanitised console output. Report reproducible
> failures, not "it doesn't work". Do not change contract or wallet code to
> make a test pass — file it for the lead instead.

### What you check yourself

- **A rejected transaction awards no growth.** This is the single most
  important thing to prove — it is an explicit completion criterion.
- Unknown and zero look different in the community panel.
- The app is usable at 390px.
- Switching wallets never shows the previous wallet's pet.

Try the app once without any coaching from the lead first, and write down the
first moment you were confused. That note is worth more than a passing test.

## B4 — demo script and submission notes (start now, in parallel)

**Allowed:** `docs/demo/**`.

Branch: `feat/b4-demo`.

Do not wait for the deploy. Draft everything now with explicit placeholders,
then fill them in when the lead lands the contract.

### Prompt

> Using only implemented features and actual evidence in docs/qa/, draft a
> demonstration script and submission notes in docs/demo/. Cover the user
> problem, one real adoption, one confirmed care, the shared community total,
> and the declared X Layer environment.
>
> The organisers require a 2 to 4 minute video, so keep the core script inside
> that length and mark what to cut if it runs long.
>
> Use explicit placeholders for anything unverified: the contract address, the
> transaction hash, the live link. Do not invent tester numbers, partnerships,
> transactions or completed features. Identify any prepared wallet shown on
> screen. List the facts the lead must verify before submission, and include a
> clean-browser link check.

### What must be in the video

The honest framing is the strength of this project, not a weakness. Show that
unknown data renders as explicitly unknown rather than as zero, and that a
rejected transaction awards nothing. That is a real differentiator.

## Copy review (small, do it last)

`HowItWorks` is yours now. Read the three step descriptions and the hero note
at `/` and tighten anything that reads like developer language rather than
user language. Keep the headline "Adopt the meme. Grow the community." — it is
asserted in a test.

## One thing to ignore

Your earlier reported bug — mobile copy "clipping mid-word" at 390px — **was
withdrawn.** It was a screenshot artefact from a capture taken at the wrong
viewport, not a CSS bug. The live site has no horizontal overflow at 390px or
320px. See `docs/qa/evidence/OBSERVATIONS.md`. Do not spend time on it.

## Handoff

Task ID, branch, screenshots or observed evidence, actual check results, known
problems, and a clear request when blocked. For bugs: environment,
reproduction steps, expected and actual result, sanitised console output.

---

# Update — 21 September 2026: the contract is live

The contract is deployed on X Layer testnet at
`0xe844152262D243a7B90F6e07FF7A67F1d7FeD216` and https://memepet.vercel.app
reads it. B3 can now be run **against the live contract**, which is the real
test. Your #16 worksheet is merged; #17 needs a rebase — see the review comment.

Order of work:

1. Rebase #17 and update the stale "no deployment / no live link" facts.
2. **B3 against the live site** — the priority. Use a throwaway wallet funded
   from the X Layer testnet faucet, never a wallet holding real funds.
3. Only then, the stretch tasks below.

---

# Stretch — only after B3 has actually been run

The contract is frozen: nothing below changes it, a route, or a dependency.

**Hard cut-off: 24 September, 12:00 UTC.** Anything not merged with green CI by
then is dropped, so the 25th is kept for the video and the submission.

## B6 — real user tests (do this first; no code)

**Allowed:** `docs/qa/**`. Branch: `docs/b6-user-tests`.

**Why it matters:** "user value" is an explicit judging criterion, and so far
the only people who have used MemePet built it. Three real people who have
never seen it are worth more than any feature.

### Prompt

> Help me run a short usability test of MemePet with three people who have
> not seen it. Write docs/qa/USER_TESTS.md with: a one-paragraph consent script
> I read aloud before starting; a single task ("adopt a pet and care for it");
> the rule that I do not help unless they are completely stuck; and a table
> per participant with first confusion, where they got stuck, what they said,
> and whether they completed the task.
>
> Record participants as P1, P2, P3 only — no names, no wallet addresses, no
> screenshots of their wallets. Do not invent results; every field stays blank
> until a real session fills it. Separate what I observed from what they said.
>
> Finish with the three changes that would most help a new user, each linked
> to the observation that motivated it.

**You check:** consent was asked before each session; nothing is invented; the
recommendations trace back to something a participant actually did.

## B5 — public pet card

**Allowed:** `src/components/profile/**` — **approved as of today**. Branch:
`feat/b5-public-pet-card`.

**Why it matters:** a shareable page for each pet is on the brief's stretch
list, and it gives the demo something to share.

The prop contract already exists — the lead added `PublicPetCardProps` to
`src/types/view-models.ts`. Read it; do not change it.

### Prompt

> Read AGENTS.md, docs/OWNERSHIP.md, src/types/view-models.ts and
> src/components/pet/PetScene.tsx. Implement B5 only, inside
> src/components/profile/**.
>
> Build `PublicPetCard` using `PublicPetCardProps` exactly as defined. It shows
> the pet's art, name, stage, growth points and the stage trail, plus the
> owner's shortened address as a link to explorerUrl when it is not null.
> Reuse PetScene or the shared Card and Badge rather than restyling from
> scratch. Render the DataModeBadge from pet.dataMode, so a preview can never
> be mistaken for a live pet.
>
> The card only displays what it is given. It must not fetch, connect a wallet,
> read the chain, or show a Care button — a visitor viewing someone else's pet
> cannot care for it.
>
> Also build `PublicPetCardPreview` for a /dev preview the lead will wire up,
> using the existing petFixtures, visibly labelled "UI preview — fictional data".
>
> Add co-located tests: the owner link appears only when explorerUrl is set,
> the preview badge appears for fixture data, and no Care button renders.
> Run npm run typecheck, lint, test and build and report actual results.

**You check:** it works at 390px; there is no way to act on someone else's pet;
fixture data is visibly labelled.

## Handoff for stretch tasks

Same as B3, plus: tell the lead when B5 is merged so the route can be wired.
