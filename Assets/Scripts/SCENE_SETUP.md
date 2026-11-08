# Native scene wiring (November 8, 2026)

The native `Assets/Scene.scene` now includes a spatial `QuizRoot` 145 cm in front of the camera, with an enabled `QuestionGroup` and disabled `ResultGroup`.

- QuestionGroup: title, round text, question text, answer A and B buttons.
- ResultGroup: result text, replay button.
- Each answer/replay button: Text, Box Collider, and Spectacles Interaction Kit Interactable on the same SceneObject.
- QuizRoot: GuessMeIn5Controller with all 12 scene and component inputs assigned, using the controller's `.ts.meta` asset identifier.
- SIK root in the original template remains enabled. Use onTriggerStart on each Interactable.
- Questions/State/Controller scripts all have new TypeScript import metadata.

Run `npm test` and `npm run scene:check`. These check source wiring only. To verify the Lens actually runs, open `GuessMeIn5Specs.esproj` in native Lens Studio with the Spectacles target, compile TypeScript, and play through all five questions, score display and replay. Correct any native editor issues before recording the mandatory real SPECS YouTube video.

**Not yet verified here:** Native Lens Studio preview, LEAF, or CLAD build. Do not claim otherwise.
