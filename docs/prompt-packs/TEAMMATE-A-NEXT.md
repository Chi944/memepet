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
