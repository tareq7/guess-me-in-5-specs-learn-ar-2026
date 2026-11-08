# Build notes — Guess Me in 5 — Spatial Edition (2026-11-08)

## What was built today (new work, VM-only)

New, original source for the SPECS 27 hackathon entry, written 2026-11-08 on
the Fleet Linux VM. The owner's laptop was never used.

- `Assets/Scripts/GuessMeIn5Questions.ts` — new 5-question A/B set with fixed
  order and a per-round friend key. Wording is original; the old phone Lens is
  a creative concept only and none of its source is copied here.
- `Assets/Scripts/GuessMeIn5State.ts` — pure state machine: one accepted
  answer per round, 5-round progression, restart, deterministic order/score.
- `Assets/Scripts/GuessMeIn5Controller.ts` — Lens Studio `@component` wiring
  SIK `Interactable.onInteractorTriggerStart` (verified sample pattern) to the
  state machine, plus a small selected-state scale pulse and question/result
  group switching. Placement target 1.2–1.7 m, slightly below gaze.
- `tests/guess-me-in-5-state.test.mjs` — 12 genuine assertions, all passing
  (`node --test tests/guess-me-in-5-state.test.mjs`).
- `Assets/Scripts/SCENE_SETUP.md` — exact native wiring still to do.
- `GuessMeIn5Specs.esproj` still declares `targetPlatform: Spectacles`.

## Provenance and disclosure (for the Devpost submission)

- Quiz *idea* predates the event (owner's October phone Lens, private source at
  `../all-lenses/.../guess-me-in-5-integration/src/`, never published here).
- All Lens source committed 2026-11-08 under the event dates is new.
- Component patterns derive from Specs Inc. MIT-licensed official samples
  (`Essentials`, `Specs Base Template With Examples`); see
  `THIRD_PARTY_SPECS_SAMPLES_LICENSE.md`. No sample code is pasted wholesale.
- The assistant `design-brief.md` remains a **draft**, not an approved
  plan-lens learner interview; no such interview was conducted.

## Honest verification status (do NOT claim otherwise)

- ✅ `node --test` passes (12/12) on the VM for pure game logic.
- ✅ Controller TypeScript smoke-checked by parse (decorators stripped for the
  check); import paths and event patterns match official samples.
- ❌ **Not run:** Lens Studio preview, CLAD build, LEAF tests, preview video.
  `Scene.scene` was deliberately left unmodified to avoid committing
  unverifiable serialized wiring.

## External blockers

1. Lens Studio 5.24.1 requires native Windows 11 or macOS 12+ with a supported
   GPU; the Linux VM cannot open/preview the project. A macOS editor must
   perform `SCENE_SETUP.md`, preview, and CLAD/LEAF runs.
2. Submission still needs: real SPECS preview screen recording (< 3 min) on
   YouTube, then Devpost submission with honest provenance above.

## Next steps for the parent/reviewer

1. Inspect and commit these files if acceptable (no commit was made by the agent).
2. Open the project in Lens Studio 5.24.1 with SPECS 27 selected.
3. Follow `Assets/Scripts/SCENE_SETUP.md`, run the 5 acceptance checks + LEAF.
4. Record, upload, and submit via Devpost before the Nov 9 deadline.
