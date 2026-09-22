# Codex editor handoff — MemePet

**Edit plan only.** The user will share three speakers' recordings in this Codex task. No video generation, edit, export or paid media call has occurred. Use supplied recordings, genuine app/browser footage, screenshots, approved mascot art, simple titles and captions.

## Output and source conventions

- Target **3:20**, **1920×1080**, **30 fps**, MP4; stay within **2–4 minutes**. Retain an editable project and reviewed final export.
- Display names: **Deston, Kym, Larm**, confirmed by the user. Exact full names for the form remain unverified.
- Speaker files: `S03_Deston_T01.mp4`. Screen files: `S03_Screen_XLayer1952_YYYYMMDD_T01.mp4`; screenshots use `.png`. Preserve original files and takes.
- For each screen source, record UTC capture time, URL, deployment revision if known, chain, public demo-wallet identifier and QA reference. Never include signing credentials.
- Actual source paths, durations, frame rates and audio properties: **UNVERIFIED — populate after recordings arrive**.

## Shot and asset manifest

| Scene | Speaker files | Visuals required | When captured |
|---|---|---|---|
| S01 | `S01_Deston_T01.mp4` | Face, then landing page; title card | Anytime |
| S02 | `S02_Kym_T01.mp4` | "How it works"; stage art labelled **Stage artwork — progression rules** | Anytime |
| S03 | `S03_Deston_T01.mp4` | Real adopt request **declined**, app showing no pet; then approved, pending, confirmed read-back | **Day 1**, actual first-care UTC date |
| S04 | `S04_Kym_T01.mp4` | Community total before; care, pending, 0 → 10 points, UTC cooldown, disabled button | **Day 1** |
| S05 | `S05_Kym_T01.mp4` | Care again: 10 → 20 points, **real Hatchling → Buddy**; caption **Recorded [ACTUAL UTC DATE] — next UTC day**, filled from evidence | **Day 2**, a later UTC date — **cut if not captured** |
| S06 | `S06_Larm_T01.mp4` | Hard refresh with same pet; community total after; public `/pet/<address>` page showing the same pet | Day 1, then Day 2 |
| S07 | `S07_Larm_T01.mp4` | Repository and the contract address in `deployment.ts`; explorer only if it loads and matches | Anytime |
| S08 | `S08_Deston_T01.mp4`, `S08_Kym_T01.mp4`, `S08_Larm_T01.mp4` | Faces in sequence; end card with app, repo and contract | Anytime |

If over 4:00, cut in this order: the public-page half of S06, then S05's second
sentence, then S02's last sentence. Never cut S03's decline — it is the beat that
shows the app awarding nothing the chain did not confirm.

The first and second cares can be on 23/24 Sep UTC, or 24/25 Sep UTC with less
editing time. Missing 22 Sep does not by itself rule out Buddy. Do not infer a
new UTC day from Singapore midnight; it changes at 08:00 Singapore time.

## Editing rules

1. Preserve the entire raw wallet run. Shorten waits with a visible label; never join one wallet's request to another wallet's result. Never manufacture prompts, receipts, counters or explorer pages.
2. Pair result narration with its actual event. “Confirmed” needs a successful receipt and resulting UI read-back. A hash, click, automated test or mocked browser provider is insufficient.
3. Fresh-pet wording requires verified first care: 0 → 10 points, still Hatchling. Stage art explains thresholds; it does not prove evolution.
4. Label **X Layer testnet**, prepared-wallet provenance once verified, and any local Anvil/fictional preview footage accurately.
5. Use available Codex browser controls for genuine actions/captures. Native desktop and wallet-extension surfaces depend on actual tool access; the human may need to operate and record prompts. Do not promise unattended signing or recreate inaccessible footage.
6. Match audio, add accurate captions and use restrained transitions. Keep all three speakers identifiable. Prefer clean speech without music; any added track needs documented rights. No paid generation is planned.
7. Review the rendered file end-to-end for duration, readability, sync, private information and unsupported claims before calling it final.

## Values to fill before export

```text
Source files and preferred takes: UNVERIFIED
Recorded URL/deployed revision/capture UTC time: UNVERIFIED
Demo-wallet provenance and recording disclosure: UNVERIFIED
Adoption hash, receipt and pet read-back: UNVERIFIED
Care hash, receipt and before/after values: UNVERIFIED
Community before/after with times: UNVERIFIED
Optional public profile with matching pet: UNVERIFIED
Final runtime/export path: UNVERIFIED
Uploaded video URL/logged-out playback: UNVERIFIED
```

If the wallet blocker persists, an introductory rehearsal can be assembled and labelled **REHEARSAL — WALLET DEMO MISSING**. Keep missing scenes visible in the manifest; do not describe the rehearsal as the completed submission video.
