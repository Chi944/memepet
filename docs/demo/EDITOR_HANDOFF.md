# Codex editor handoff — three MP3 voices

Script ID: **MP-EQ-20260923-v1**. Use [DEMO_SCRIPT.md](DEMO_SCRIPT.md) and [PRODUCTION_PLAN.md](PRODUCTION_PLAN.md) together. The **185-second edit is exported** as MP4 with SRT; file/audio QC passed. Team review and public-upload playback remain open.

## Inputs

Four MP3 files have been received for three speakers. Preserve every original;
combine Kym's A/B parts into one speaker's editable source without losing provenance:

| Person | File | Blocks in that file |
|---|---|---|
| Deston | `MemePet_Deston_MP-EQ-v1.mp3` | S01, S04, S07 |
| Kym | `MemePet_Kym_MP-EQ-v1-partA.mp3` + `MemePet_Kym_MP-EQ-v1-partB.mp3` | S02, S05, **S08B selected** |
| Larm | `MemePet_Larm_MP-EQ-v1.mp3` | S03, S06, S09 |

The opening must show **The four musketeers**, then all four supplied portraits
and names: **Deston, Kym, Larm, YeeWei**. YeeWei has no narration. During speech,
show that speaker's circular portrait in the bottom-left with waveform movement
derived from the actual voice audio. Keep it clear of captions and app evidence.
Check portrait visibility/crops in the composed output before calling them final.

Speak naturally at roughly 125–135 words/minute. Each selected script has 130 words, approximately one minute of speech. Announce the scene ID, leave a two-second gap, read the block, then pause before the next ID. Slate/retake words do not enter the final voice count. Do not read stage directions, evidence warnings or headings. Keep any retake after a clear pause and say the scene ID again; the editor selects one complete take.

Record in a quiet room, keep the microphone distance consistent, and leave about five seconds of room tone at the beginning or end. No music, reverb, sound effects or aggressive noise removal baked in. Prefer 48 kHz / 256 kbps or better MP3 if available; an existing clean phone recording is acceptable. Do not repeatedly convert/compress a recording to change its reported bitrate. A face-camera recording is optional and is not needed for this edit.

These lines are planned narration. Recording them does not verify their claims. Conditional result lines can enter the submission only beside the matching genuine event; otherwise they are retaken, removed or held out of a labelled rehearsal.

## Screen evidence needed separately

The MP3s do not show that the product works. Preserve one continuous raw capture of each actual browser/wallet session, including failures and waits. A human operates wallet-extension prompts when tool policy prevents the agent from doing so. Never record key import, passwords or recovery words.

File convention: `MemePet_S02-S06_XLayer1952_YYYYMMDD_T01.mp4`. Record actual UTC time, URL, deployed commit, chain, registry and demo-wallet identifier. Save full transaction hashes and successful receipts. A second care uses a separate date-labelled source; do not imply that a shortened edit spans a new UTC day without saying so.

Use `media/recordings/` for local raw files, `media/cache/` for proxies, and `media/exports/` for renders. These are ignored by Git. Keep the project source, public proof notes and small purposeful documentation in the repo. Do not commit the three voice recordings or copies of whole media libraries.

## Assembly order

1. Inspect the uploaded MP3s, transcribe, identify all nine blocks and any alternate/retake slates. Confirm the script version. Keep the originals unchanged.
2. Select complete natural takes. Interleave S01 through S09; do not play one person's whole MP3 and then the next. Keep three separate editable voice tracks or clearly identified clips.
3. Preserve equal 130-word/three-turn allocations. Measured selected voice intervals are Deston 54.73s, Kym 47.07s and Larm 62.60s, including pauses; equal elapsed time is not claimed. Preserve natural speed/pitch rather than forcing a rushed delivery.
4. Lay genuine browser clips under the relevant narration. Do not manufacture wallet screens, transaction states, counters, explorer receipts or evolution. Preserve one identifiable wallet/chain journey throughout.
5. Use **S08B**: labelled stage artwork/rules, with no earned-evolution claim. The unused A alternate needs actual next-UTC-day Buddy evidence and is not part of this edit.
6. Add the title/name cards, diagram, restrained emphasis and captions from the production plan. Keep wallet fields and results readable. A screenshot can support an already-observed state; it cannot substitute for a transaction sequence.
7. Match voices by perceived loudness. Apply only necessary cleanup without altering meaning. Add music/SFX only with documented rights; the bundled brag music is not currently cleared. Duck any bed under speech.
8. Preview the composed timeline at every cut and the whole sequence. Check evidence mapping, pronunciation, name cards, mobile-size readability, clipping, black gaps, missing frames and end-card links.
9. Render the reviewed submission cut, then play the **exported file** end to end. Record duration/resolution, audio/caption checks and actual output path. No render is called final merely because an export job succeeded.

## Completed edit and evidence manifest

The native editable timeline retains the chosen voice clips; selected durations
are in the combined script. Exact product-source cuts are recorded below and in
`final-source-evidence.json`. All nine narration blocks are assembled.

| Scene | Speaker/source | Picture and evidence |
|---|---|---|
| Intro | No added narration | All four supplied portraits/names and The four musketeers; composed framing checked |
| S01 | Deston S01 | Genuine overview and labelled Mochi artwork |
| S02 | Kym S02 | Take 3 **26.000–44.033s**: genuine repeated rejection and unchanged state |
| S03 | Larm S03 | Take 3 **88.500–93.000s + 97.000–115.533s**: adoption, transient read failure and recovery retained; idle wait shortened |
| S04 | Deston S04 | Take 3 **262.600–267.600s**, then original care-result PNG labelled **After confirmation · original browser still**; no continuous 0→10 claim |
| S05 | Kym S05 | Six seconds of original hard-refresh result PNG with its explicit label, then public-page footage **557.000–568.267s** |
| S06 | Larm S06 | Verified receipt/read graphic, then original Unknown-state PNG; no seamless counter-update claim |
| S07 | Deston S07 | Labelled explanation of wallet, registry, receipt/read-back and pet progress |
| S08B | Kym S08B | Labelled stage artwork and rules; no live evolution claim |
| S09 | Larm S09 | Future-labelled goal, team and actual app/repository links |

The Take 3 video and the saved 16:40:31 UTC app screenshot show different
post-care states. The cause is unproven; do not label it a compositor defect or
erase the recorded pet-read error. Preserve the valid receipt/chain reads and
observed screenshot state as separate evidence. Do not animate a screenshot
into an apparent live 0 → 10 transaction. The selected edit uses a bounded 3.5%
camera push over clearly labelled originals, with no edited UI values. Source
hashes are retained in `memepet-video/media/capture/final-source-evidence.json`;
the selected cuts and labels are now synchronized there. The final export has
passed file/audio QC; team playback review remains open.
See the
[capture limitations](../qa/evidence/FINAL_CAPTURE_2026-09-24.md#recorded-frames-do-not-establish-a-seamless-care-flow).

## Delivery

- Working edit 3:05 / 185 seconds, within the organizer's 2–4 minute limit; 1920×1080, 30 fps, H.264 MP4 with AAC audio is the production choice. Verify the actual exported duration.
- Deliver the editable project/timeline, final MP4, accurate SRT, poster and linked description. Preserve originals and the evidence manifest.
- Exact upload destination/video URL is still a placeholder. Check the reviewed upload while logged out and through to its final frame; do not submit a rehearsal or a stale export.
- Actual wallet results now have receipts, browser observations and matching sources. Preserve the explicit still-image disclosures and capture limitations in the final edit; do not label the export reviewed or submitted before those steps happen.

Delivery filename: `MemePet_The_Four_Musketeers_OKX_Dev_Day_FINAL_1080p.mp4`
and matching `MemePet_The_Four_Musketeers_OKX_Dev_Day.srt`.
The first export passed 1920×1080, 30 fps, 185 seconds / 5,550 frames, full
decode and visual/caption checks. A second render adds 3 dB to all voices;
final file independently passed decode and audio QC at **−20.67 LUFS / −1.28
dBTP**, with no clipping. It contains **5,550 frames**, **185.000s video** /
**185.088s container**, and **22,115,573 bytes**. SHA-256:
`d5aed29429e259be4230117aaa71d41a0e890a3588ca50039c772052cf699f80`.
The corrected sidecar has 66 canonical timeline captions rather than 43
raw-ASR cues; SHA-256:
`80850f33b9bd989e55b026cfe217bfa9610048be55947de552b8cd68b7d5611f`.
The final render ID is `22b933a1-d32e-42ee-860b-89003547c28c`.
No human end-to-end watch/listen, public upload or submission is claimed.
