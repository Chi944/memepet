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
