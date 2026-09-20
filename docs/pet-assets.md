# Pet artwork

No production mascot files are in the repository yet. Missing art must keep using
the accessible placeholder in `PetScene`. Do not point fixtures at filenames that
do not exist.

## Intended files

Place ChatGPT Image Gen 2.5 exports here after review:

- `public/pets/hatchling.png`
- `public/pets/buddy.png`
- `public/pets/guardian.png`

Target: 1024×1024, transparent background, same character, camera, and foot position
across all three stages. Optimize served copies later without destroying edges.

## Provenance

| File | Source | Permission | Status |
|---|---|---|---|
| hatchling.png | ChatGPT Image Gen 2.5 | generate after lead review of the prompt | not generated |
| buddy.png | ChatGPT Image Gen 2.5 | generate after lead review of the prompt | not generated |
| guardian.png | ChatGPT Image Gen 2.5 | generate after lead review of the prompt | not generated |

Do not claim a license or ownership that has not been established. Do not reuse
coin marks, tickers, or unverified token branding.

## Shared character bible

Use this block in every stage prompt so the mascot stays the same creature:

```text
Create a single original collectible companion mascot named Mochi for a wholesome
community pet app. Soft 3D collectible-toy look, rounded clay-like materials,
gentle studio lighting, consistent camera: full-body, centered, eye-level, slight
three-quarter view, feet planted on an invisible ground plane. One small round
creature with a cream body, blush-pink cheeks, tiny stubby limbs, glossy black
dot eyes, a tiny rounded snout, and two short rounded ears. No text, no letters,
no logos, no coins, no charts, no wallets, no QR codes, no brand marks, no
humans, no photoreal animals. Transparent background. Square 1024x1024. Clean
silhouette, no crop, no extra props.
```

## Image Gen 2.5 prompts

Paste one prompt at a time. Generate Hatchling first. Use that image as the
style/character reference for Buddy and Guardian if ChatGPT allows a reference
image.

### 1. Hatchling — `public/pets/hatchling.png`

```text
Create a single original collectible companion mascot named Mochi for a wholesome
community pet app. Soft 3D collectible-toy look, rounded clay-like materials,
gentle studio lighting, consistent camera: full-body, centered, eye-level, slight
three-quarter view, feet planted on an invisible ground plane. One small round
creature with a cream body, blush-pink cheeks, tiny stubby limbs, glossy black
dot eyes, a tiny rounded snout, and two short rounded ears. No text, no letters,
no logos, no coins, no charts, no wallets, no QR codes, no brand marks, no
humans, no photoreal animals. Transparent background. Square 1024x1024. Clean
silhouette, no crop, no extra props.

Stage: Hatchling. Mochi is newly adopted and compact, about the size of a bun,
with a faintly egg-smooth shell pattern on the back, oversized head, tiny feet
close together, curious and calm. Keep the body simple and round. Do not add
armor, accessories, or a different species.
```

### 2. Buddy — `public/pets/buddy.png`

```text
Create a single original collectible companion mascot named Mochi for a wholesome
community pet app. Soft 3D collectible-toy look, rounded clay-like materials,
gentle studio lighting, consistent camera: full-body, centered, eye-level, slight
three-quarter view, feet planted on an invisible ground plane. One small round
creature with a cream body, blush-pink cheeks, tiny stubby limbs, glossy black
dot eyes, a tiny rounded snout, and two short rounded ears. No text, no letters,
no logos, no coins, no charts, no wallets, no QR codes, no brand marks, no
humans, no photoreal animals. Transparent background. Square 1024x1024. Clean
silhouette, no crop, no extra props.

Stage: Buddy. Same exact character as the Hatchling, not a redesign. Mochi is
slightly taller and more filled-out, same cream color and face, same ear shape,
same foot placement. Add only a modest growth: a little more body volume, a
softer upright posture, and a tiny friendly smile. No new species traits, no
wings, no horns, no clothing.
```

### 3. Guardian — `public/pets/guardian.png`

```text
Create a single original collectible companion mascot named Mochi for a wholesome
community pet app. Soft 3D collectible-toy look, rounded clay-like materials,
gentle studio lighting, consistent camera: full-body, centered, eye-level, slight
three-quarter view, feet planted on an invisible ground plane. One small round
creature with a cream body, blush-pink cheeks, tiny stubby limbs, glossy black
dot eyes, a tiny rounded snout, and two short rounded ears. No text, no letters,
no logos, no coins, no charts, no wallets, no QR codes, no brand marks, no
humans, no photoreal animals. Transparent background. Square 1024x1024. Clean
silhouette, no crop, no extra props.

Stage: Guardian. Same exact character as Hatchling and Buddy, now at full
companion size. Keep the same cream body, ears, eyes, snout, and foot position.
Mochi looks confident and settled, with a slightly broader stance and a very
small leafy-lavender marking on the chest, still toy-like and friendly. No
armor, no weapons, no cape, no crown, no financial symbols.
```

## After generation

1. Paste the three PNG files into this chat for review.
2. The lead copies approved files into `public/pets/` and records exact
   dimensions here.
3. Only then may fixtures or live views point `artSrc` at those files.
