# Scene setup (Lens Studio 5.24.1, macOS/Windows) — REQUIRED, not yet done

Status: **pending native editor work.** `Scene.scene` was intentionally left
untouched so no unverifiable serialized data is committed. An editor with Lens
Studio must build the hierarchy below, attach `GuessMeIn5Controller.ts`, and
wire its inputs. Nothing here has been previewed, CLAD-tested, or LEAF-tested.

## Scripts (already in this repo, importable as-is)

- `Assets/Scripts/GuessMeIn5Questions.ts` — 5 fixed A/B questions.
- `Assets/Scripts/GuessMeIn5State.ts` — pure state machine (unit-tested).
- `Assets/Scripts/GuessMeIn5Controller.ts` — `@component` wiring SIK
  Interactables + Text. Uses only the verified `Interactable` import path and
  the `onInteractorTriggerStart.add(...)` pattern from the official samples;
  start/update binding uses core `createEvent("OnStartEvent")` /
  `createEvent("UpdateEvent")` so no extra packages are needed.

## Hierarchy to build (all new objects under the scene root)

Placement target: compact arc **1.2–1.7 m in front of the wearer, slightly
below eye level**, large readable world-space targets, one question at a time.

- `QuizRoot` (SceneObject, position ≈ (0, -0.15, -1.45))
  - `QuestionGroup` (SceneObject)
    - `RoundText` (Text) — small header, e.g. "Round 1 / 5"
    - `QuestionText` (Text) — short prompt, large font
    - `AnswerAButton` (SceneObject, position ≈ (-0.28, -0.35, 0))
      - SIK **Interactable** component + a matching collider/trigger volume
        per current SIK docs, so pinch and Lens Studio mouse both trigger it
      - `AnswerAText` (Text) — choice A label
    - `AnswerBButton` (SceneObject, position ≈ (+0.28, -0.35, 0))
      - SIK **Interactable** component + matching collider/trigger volume
      - `AnswerBText` (Text) — choice B label
  - `ResultGroup` (SceneObject, enabled = false initially)
    - `ResultText` (Text) — e.g. "You got 4 / 5. ..."
    - `ReplayButton` (SceneObject)
      - SIK **Interactable** component + matching collider/trigger volume
      - `ReplayText` (Text) — "Play again"

## Controller wiring (Inspector inputs on `QuizRoot` or a dedicated object)

| Input | Wire to |
|---|---|
| questionText / roundText | `QuestionText` / `RoundText` |
| answerAText / answerBText | `AnswerAText` / `AnswerBText` |
| resultText | `ResultText` |
| answerA / answerB / replayButton | the three Interactable components |
| answerARoot / answerBRoot | `AnswerAButton` / `AnswerBButton` |
| questionGroup / resultGroup | `QuestionGroup` / `ResultGroup` |

## Acceptance checks (must be run in Lens Studio, ideally LEAF)

1. Project opens on SPECS 27 target and renders two choices, no editor errors.
2. A standard pinch/mouse press on an answer advances exactly one round.
3. Five rounds show correct round numbers and distinct options.
4. After the fifth pick the result card appears and the question card hides.
5. Replay clears the score, resets to round 1, and stays interactable.

Record a real full-flow SPECS preview video (< 3 min) for the submission.
