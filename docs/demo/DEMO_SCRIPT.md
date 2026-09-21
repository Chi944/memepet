# Demo script — OKX Dev Day 2026 submission

Status when drafted: **21 September 2026**. Deadline: **25 September 2026,
23:59 UTC** (`docs/STATUS.md`).

This is a script to run and record, not a record of something already run.
As of drafting, no wallet-signature walkthrough row in
`docs/qa/BROWSER_WALKTHROUGH.md` has been executed, and no X Layer deployment
exists (`docs/STATUS.md` → "X Layer deployment: None"). **Do not record this
script until both are true, and update the ⏳ markers below with real
evidence before submitting.**

Target length: 2–4 minutes — **verify the organizer's exact required length
before recording**; this script is written to be trimmable (see cut points).

---

## 0. Before recording — preconditions

- [ ] `PetRegistry` is deployed to the **declared X Layer test environment**
      (not Anvil) and the address is committed in `src/lib/deployment.ts` —
      never an invented address.
- [ ] `NEXT_PUBLIC_SITE_URL` points at a public, reachable deployment.
- [ ] A prepared demo wallet holds enough of the network's gas token to
      adopt + care live, on camera.
- [ ] `docs/qa/BROWSER_WALKTHROUGH.md` rows 1–6 and 9 have been run for real
      against that environment and are filled in (not blank).
- [ ] Screen recording is at a resolution that reads clearly at 390px and
      desktop — show both if time allows.

If any box above is unchecked, this is a rehearsal, not the submission take.

---

## 1. The problem (≈20s)

> "Meme communities are almost entirely transactional — the only way to
> belong is to buy and hold a token. MemePet gives a community a shared
> mascot, and every wallet its own pet, earned by showing up, not spending."

*(Cut point: trim to one sentence if under time pressure.)*

## 2. Connect and adopt (≈40s)

- Open the **live public URL** (⏳ fill in once deployed) in a clean browser
  — no dev tools, no pre-filled state.
- Click **Connect wallet**, approve in the prepared demo wallet.
- Click **Adopt pet**, approve the signature.
- Narrate while it confirms: "This is one transaction, no token, no
  approval — just a wallet-linked adoption record."
- Show the pet appear **only after** the receipt confirms and the UI
  re-reads the chain (not immediately on signing).

**Evidence to capture:** transaction hash for the adopt call, visible on
screen or captured in `docs/qa/evidence/` for the notes below.

## 3. Care and growth (≈40s)

- Click **Care**, approve the signature.
- Narrate: "Care is once per UTC calendar day, enforced on chain — not just
  in the UI." Show the pending state (no growth shown yet).
- After confirmation: growth points increase by 10; if this crosses a stage
  threshold, the evolution celebration plays.

**Evidence to capture:** transaction hash for the care call.

## 4. Refresh and shared progress (≈30s)

- Hard-refresh the page. Show the same pet recovered — from the chain, not
  from a fixture or local storage.
- Scroll to (or navigate to) the community panel. Point out the **Care
  actions** counter incrementing by exactly one from the confirmed care
  above, and that it is labelled "Care actions," not a headcount.

*(Cut point: this section can merge with §3 if time is tight — refresh
immediately after the care confirmation instead of as a separate beat.)*

## 5. Honesty beat — what this is not (≈20s)

> "There's no MemePet token, no staking, no marketplace. Progress here is
> non-transferable and can't be bought. Anything you see labelled 'preview
> data' or 'unknown' in this app is not live — we don't fake a number we
> can't justify."

Optionally show one `/dev/*` preview briefly, labelled on screen, to
illustrate the distinction between fixture and live data — clearly
identify it as a development preview, not the live app.

## 6. Close (≈10s)

> "MemePet — adopt the meme, grow the community. Repository and live link
> are in the submission."

---

## Prepared wallet / fixture disclosure

State explicitly in the submission notes and, if practical, on screen:

- The wallet used in the recording is a **prepared demo wallet** funded by
  the team for this purpose, not an organic user.
- Any `/dev/*` route shown is fictional preview data, gated out of the
  production build (`docs/QA_CHECKLIST.md` I12) — confirm that gate against
  the actual deployed build before recording, don't just assume it holds.

## Known limitations to state, not hide

- Single community/mascot only; no multi-community, marketplace, or social
  feed (`docs/PROJECT_BRIEF.md` — stretch/out-of-scope scope).
- `communityStats` reverts for an unapproved community id; the UI maps that
  to "unknown," not zero — mention this if a revert happens on camera
  instead of editing it out silently.
- AI-assisted development review is not a security audit — do not describe
  the contract as audited.

## Facts the lead must verify before submission (not assumed here)

- [ ] The exact organizer-required video length and submission format.
- [ ] The X Layer test/mainnet environment the track actually requires, and
      that the deployed address matches it.
- [ ] The public live-product link resolves in a clean, logged-out browser
      (see link-check below).
- [ ] The repository is public and the README is current at the commit
      being submitted.
- [ ] No secrets, private keys, or unpublished RPC credentials are visible
      in any frame of the recording or any committed file.

---

## Clean-browser link-check (run immediately before submitting)

Use a fresh private/incognito window with no extensions:

- [ ] Repository URL loads and the README renders correctly on GitHub.
- [ ] Live product URL loads over HTTPS with no console errors on first
      paint (`docs/QA_CHECKLIST.md` I13).
- [ ] `/dev/*` preview routes return not-found in the deployed build
      (I12) — confirmed against the actual production deployment, not
      just local `npm run build`.
- [ ] Demo video link (once uploaded) plays without requiring a login.
- [ ] Any block explorer link for the adopt/care transactions resolves to
      the correct network and address.