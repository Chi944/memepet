# Teammate A — what to do next (A3)

Updated 21 September 2026. **Submission closes 25 September, 23:59 UTC.**

Read this instead of the original `TEAMMATE-A.md` A1/A2 sections. The lead has
already built `PetScene` and `CarePanel` and they are merged on `main`. Your
remaining work is visual correction and asset provenance, not a rebuild.

## Before anything else

1. **Accept the GitHub invitation.** It is still pending. Until you accept you
   cannot push a branch or open a pull request.
2. Clone and run the baseline. No teammate has confirmed this yet, so if it
   fails, that is itself an important finding — report it rather than working
   around it.

```bash
git clone https://github.com/Chi944/memepet.git
cd memepet
npm ci
npm run dev
```

Open `http://localhost:3000/dev/pet`. Tell the lead it ran before you start.

## A3 — art correction and provenance

**Allowed:** `src/components/pet/**`, `public/pets/**`, `docs/pet-assets.md`.

**Do not change:** routes, shared types, fixtures, global styles, package
files, wallet code, contracts, or another teammate's components.

Branch: `feat/a3-pet-art`.

### The actual open problem

All three PNGs are already 1024x1024, so sizing is **not** the issue. The
problem recorded in `docs/pet-assets.md` is that the art came from a black
studio background knocked out to alpha, so a dark halo may remain around the
edges.

The app now has a dark mode, which makes this much easier to see — and much
more visible to a judge.

### Prompt

> Read AGENTS.md, docs/PROJECT_BRIEF.md, docs/OWNERSHIP.md, docs/DEV_SETUP.md
> and docs/pet-assets.md. Implement A3 only. First explain the task back to me
> and list the files you intend to edit. Stay inside
> `src/components/pet/**`, `public/pets/**` and `docs/pet-assets.md`.
>
> Open `/dev/pet` and inspect all three stages at 390px and at desktop width,
> in BOTH light and dark colour schemes. Dark mode is the important one: the
> stage art was produced by knocking a black studio background out to alpha,
> so look specifically for a dark fringe or halo at the silhouette edge where
> it meets a light card.
>
> If fringing exists, clean the alpha edges and re-export at the same
> 1024x1024 size with the same subject scale, camera angle and foot position.
> Do not redraw or restyle the mascot and do not change it between stages.
>
> Then check the idle bob and the celebration pulse with reduced motion
> enabled at the OS level. Neither should animate.
>
> Update docs/pet-assets.md with the final dimensions, the source, the
> permission or licence position, and any remaining limitation. Do not claim
> rights that have not been established.
>
> Run npm run typecheck, npm run lint, npm test and npm run build. Report the
> actual results, the files you changed, and screenshots of each stage in both
> colour schemes. Do not claim a visual check you did not perform.

### What you check yourself

- No dark halo on any stage, against a white card and against a dark card.
- All three stages sit at the same scale and baseline; the pet does not jump
  size or position between stages.
- Text stays legible at 390px.
- With reduced motion on, nothing moves.

### One thing to ignore

A previous QA pass reported mobile text "clipping mid-word" at 390px. **That
was withdrawn** — it was a screenshot artefact, not a layout bug. See
`docs/qa/evidence/OBSERVATIONS.md`. Do not try to fix it.

## Handoff

Task ID, branch, what works, what you tested yourself, screenshots, actual
check results, remaining limitations. Be able to explain which props
`PetScene` receives and which callback the Care button invokes.

---

# Stretch — only after A3 is merged

Added 21 September 2026. The contract is now **live on X Layer testnet and
frozen**: its deployed bytecode is verified identical to `main`. Nothing below
touches the contract, a route, a shared type, or a dependency.

**Hard cut-off: 24 September, 12:00 UTC.** Anything not merged with green CI by
then is dropped, so the 25th is kept for the video and the submission. Stop at
the end of any task if the clock is close — a finished A4 beats a half-finished
A4 and A5.

## A4 — the evolution moment (do this first)

**Allowed:** `src/components/pet/**` only. Branch: `feat/a4-evolution-moment`.

**Why it matters:** the stage-up — Hatchling becoming Buddy — is the single most
filmable beat in the demo, and right now it is only a pulse and a small badge.
The committed scope includes "one evolution moment", so this is completing
scope, not adding it.

### Prompt

> Read AGENTS.md, docs/PROJECT_BRIEF.md and src/components/pet/PetScene.tsx.
> Implement A4 only, inside src/components/pet/**.
>
> PetScene already receives a `celebrate` boolean. The lead's code sets it to
> true ONLY after a confirmed care moves the pet across a stage threshold —
> never on submission. Design a stage-up reveal driven entirely by that
> existing prop. Do not add a prop, change PetSceneProps, or decide yourself
> when to celebrate.
>
> Make it feel like the pet grew: for example a brief glow or burst behind the
> art, the new stage name announced, and the stage trail advancing. Keep it
> under about 1.5 seconds and tasteful — it must not obscure the growth points
> or the care button.
>
> With reduced motion enabled, show a static announcement instead of any
> motion. Announce the stage change to screen readers with an aria-live region.
>
> Use CSS only; add no animation library. Update the co-located tests: the
> announcement renders when celebrate is true, does not when it is false, and
> reduced motion still shows the text. Show every state in /dev/pet using the
> existing "Show confirmed-success celebration" toggle.
>
> Run npm run typecheck, lint, test and build. Report actual results and give
> me a short screen recording of the reveal at desktop and at 390px.

**You check:** it reads as growth, not as an error or a notification; it never
fires unless the toggle is on; reduced motion shows text with no movement.

## A5 — share-card artwork

**Allowed:** `public/pets/share/**` and `docs/pet-assets.md`. Branch:
`feat/a5-share-art`.

**Why it matters:** the site's link preview currently uses the square 1024px
mascot, but the card format is 1200x630, so X, Discord and Telegram crop it.
The lead will generate a proper share image per pet in code; you supply the art
it sits on.

### Prompt

> Produce three share-card backgrounds, one per stage, saved as
> public/pets/share/hatchling.png, buddy.png and guardian.png, each exactly
> 1200x630.
>
> Place the existing stage art — do not redraw the mascot — on the right
> ~45% of the canvas, using the same lilac-to-mint background as the app.
> Leave the left ~55% clear and calm: the lead's code will render the pet's
> name, stage and growth points there in text. Put no text in the image
> itself, because baked-in text cannot be kept accurate.
>
> Keep each file under 300 KB. Record dimensions, source and licence position
> in docs/pet-assets.md. Do not add token logos, tickers or claimed rights.

**You check:** the pet is not cropped at 1200x630; the left side is empty enough
for two lines of large text; all three share one layout so they read as a set.

## Handoff for stretch tasks

Same as A3, plus: tell the lead A5 is ready so it can be wired into the share
image.
