# Pet artwork

Approved stage stills are in `public/pets/`. Preview fixtures may point at these
files. Live reads must never fall back to them.

## Files

| File | Stage | Final dimensions | Recorded source | Processing |
|---|---|---|---|---|
| `public/pets/hatchling.png` | Hatchling | 1024×1024 RGBA PNG | ChatGPT Image Gen 2.5, 20 Sep 2026, per the original project record | Black-matte edge cleanup, 22 Sep 2026 |
| `public/pets/buddy.png` | Buddy | 1024×1024 RGBA PNG | Same recorded source | Same processing |
| `public/pets/guardian.png` | Guardian | 1024×1024 RGBA PNG | Same recorded source | Same processing |

The original source attribution is inherited from this repository; the original
ChatGPT session and generation metadata have not been independently verified.
The same cream collectible character is retained across stages:

- Hatchling: large spotted egg shell, paws together.
- Buddy: shell reduced to a small back cap.
- Guardian: chest leaf mark, arms held out, more body volume.

## A3 correction — 22 September 2026

The originals came from a black studio field knocked out to alpha. This left
both dark silhouette fringes and translucent dark eye pixels. The correction
uses deterministic pixel processing; it does not generate or redraw the mascot.
An image-generation trial was rejected because it changed the subject and is
not included in the repository.

Processing preserves the 1024×1024 canvas, camera, pose, RGB colors in the
interior, and original nonzero-alpha bounds. Enclosed knockout holes and
translucent interior pixels are made opaque again. Within the outer three-pixel
band, nearby interior RGB supplies a foreground estimate; the observed edge
RGB/foreground ratio estimates coverage. Edge RGB is decontaminated and alpha
is adjusted accordingly. The original exterior remains fully transparent.
This is an estimate from the flattened source, not recovery of a native alpha
export. Normal subject shading is retained.

| Stage | Original and final alpha bounds (left, top, right, bottom; exclusive) | Edge RGB pixels corrected | Interior alpha pixels restored |
|---|---|---:|---:|
| Hatchling | 206, 130, 845, 902 | 5,205 | 3,098 |
| Buddy | 202, 88, 864, 939 | 6,570 | 2,131 |
| Guardian | 170, 32, 925, 975 | 7,182 | 3,755 |

The source canvases have different visible subject bounds. `PetScene` applies
presentation-only transforms to the three known `/pets/<stage>.png` paths.
They align to Hatchling's 772-pixel visible height, horizontal centre 525.5,
and foot baseline 902 in source-canvas coordinates. Other artwork paths keep
their supplied framing. Source files are not repositioned or rescaled.

The pet stylesheet explicitly sets `animation: none` for the idle bob and
celebration pulse under `prefers-reduced-motion: reduce`.

## Permission and licence position

The project describes these as accepted, team-generated hackathon assets.
No third-party licence was purchased, and no release licence has been selected
or established by this work. Acceptance for the project does not establish
exclusive ownership or clearance of all third-party rights. The generation
account's applicable terms and any input rights remain for the team to verify.
No coin marks, tickers, token logos, or additional rights claims are added.

## Verification and remaining limitations

- PNG dimensions, RGBA format, unchanged nonzero-alpha bounds and unchanged
  interior RGB were checked programmatically after processing.
- Composites of all three corrected files were visually inspected against
  white and dark `#221b36` backgrounds. The visible black fringe and eye
  transparency are improved. These composites are asset checks, not screenshots
  proving that the app was tested in dark mode.
- Local `npm ci` and `/dev/pet` baseline startup succeeded with Node 24.19.0
  and npm 11.19.0. Light-mode browser inspection was performed; full final
  desktop/390px checks in both OS colour schemes are still pending.
- An OS-level reduced-motion check has not been completed. Code inspection
  alone is not evidence of that browser check.
- The alpha reconstruction is approximate because a native transparent
  source was not available. Review at other sizes before using the art in
  higher-resolution promotional materials.

### Automated checks for this A3 commit

With Node 24.19.0 and npm 11.19.0:

- `npm run typecheck` — passed, exit 0.
- `npm run lint` — passed, exit 0.
- `npm test` — passed, 9 files / 39 tests.
- `npm run build` — passed, exit 0, with network access for the configured
  Google Fonts. The initial sandboxed build could not fetch those fonts.

The preview browser lost access to localhost after the development server was
restarted to refresh the optimized-image cache. Final browser verification of
the corrected PNGs and display transforms is therefore pending; the successful
asset-composite checks above must not be presented as a completed app walkthrough.

### Integration with current main — 23 September 2026

The newer UI uses an arrival animation, a finite celebration lift and a hover
transform rather than the original idle bob/pulse. Its existing reduced-motion
rule disables those animations and transitions. Artwork alignment now uses
independent CSS `translate` and `scale` properties so those `transform`
animations cannot overwrite the common stage framing.

After merging current main: typecheck passed; lint passed with two pre-existing
unused-disable warnings in the lead-owned Open Graph routes; all 79 tests in
16 files passed; production build passed. Final OS-level appearance and
reduced-motion browser checks remain unverified, as recorded above.

## A5 share-card backgrounds — 23 September 2026

Ready for the lead to wire into the generated share image. These are background
assets only; the lead-owned Open Graph routes have not been changed.

| File | Dimensions / format | File size | Source |
|---|---|---:|---|
| `public/pets/share/hatchling.png` | 1200×630 RGB PNG | 152,535 bytes | Corrected `public/pets/hatchling.png` above |
| `public/pets/share/buddy.png` | 1200×630 RGB PNG | 146,932 bytes | Corrected `public/pets/buddy.png` above |
| `public/pets/share/guardian.png` | 1200×630 RGB PNG | 153,645 bytes | Corrected `public/pets/guardian.png` above |

Composition uses deterministic Pillow processing, with no generation or redraw.
Only transparent source margins are trimmed. Each complete silhouette is resized
with Lanczos filtering to 480 pixels tall, centred at x=930, and placed at y=85
(feet at y=565). The original aspect ratio is preserved to the nearest pixel.
The background blends lilac `#efe7ff` to mint `#e2f6ec`, using a linear RGB mix
weighted 65% by horizontal position and 35% by vertical position. These colours
follow the A5 prompt's lilac-to-mint direction; the current live UI is dark/lime.
All files are losslessly saved, without palette quantisation.

The left 660 pixels (55%) contain only the calm gradient, reserved for the
lead's live name, stage and growth-point text. No text, marks or tickers are
baked into the art. Keep that text inside the left area with suitable margins
and dark, high-contrast lettering. The subject occupies the right 45%, with
clear margins on every edge.

All three exports were visually inspected. Programmatic checks verified exact
1200×630 dimensions, file sizes below 300,000 bytes, complete subject bounds,
and that the left 55% is pixel-identical to the empty gradient. Source stage
PNGs are unchanged. Actual social-platform cropping and the final text overlay
remain for integration testing after the lead wires these files in.

The permission and licence position above applies unchanged to these derivatives.
No new rights, exclusive ownership, or third-party clearance is claimed.
