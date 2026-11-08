---
status: draft
event: Learn AR with SPECS 2026
project: Guess Me in 5 — Spatial Edition
source_concept: Existing October 2026 Guess Me in 5 phone Lens by the same author
---

# Guess Me in 5 — Spatial Edition

**Design direction (assistant draft, not an approved plan-lens interview):** A new room-anchored five-round friendship prediction game for SPECS 27. The earlier phone Lens provides the creative concept; this new AR version uses a proper Specs target project, spatial placement, and pinch-driven hand interactions.

**One spatial moment:** Five luminous floating question cards appear as a compact tabletop arc approximately 1.2–1.7 meters in front of the wearer, slightly below eye level. The active card moves forward. The wearer selects one of two large answers using the standard Specs cursor/pinch interaction. After five choices, a spatial score/explanation card rises in place of the question trail. The wearer can restart the round.

**Why glasses:** No phone occupies the wearer's hands; the choices are positioned in the person's room, not presented as a face-locked 2D screen. On each answer, the used card fades away in the same real-world location.

**Primary preview workflow:** Start → question 1 → pinch answer A or B → next question → finish fifth → score screen → Restart. Implement with a SPECS Base Template scene, standard Spectacles Interaction Kit and tappable Interactable components. Mouse presses in Lens Studio's SPECS preview must simulate pinch (no real hand recognition needed).

**Constraints:** No face recognition, live camera AI, voice dependency, scanning people, online accounts, personal information, or cross-user networking. The first version is a deterministic local quiz. Use large targets and short readable text, with at most one primary question at a time.

**Five acceptance checks (must be tested in Lens Studio and ideally LEAF, not yet performed):**
1. SPECS 27 project opens and renders at least two spatial choices in the preview without editor errors.
2. A standard mouse/pinch on an answer advances exactly once.
3. Five sequential questions show the correct round number and distinct options.
4. After fifth selection the result appears and the old cards disappear.
5. Restart clears score, resets round and remains interactable.

**Risks and verification:** Lens Studio needs native Windows/macOS and a supported graphics device; the user's Linux VM cannot open it. GitHub-hosted macOS VMs are being tested as a permitted VM-only alternative. The official `plan-lens` skill is learner-led and has not been completed/approved. Do not assert CLAD, Lens Studio or LEAF verification without logs.

**Attribution:** Reuses the original owner's *concept*, and Specs Inc.'s MIT-licensed official SPECS Base Template. The old Snapchat phone Lens is not itself this event submission.

**After the build:** Open the project in Lens Studio with SPECS 27 selected. Inspect placement, readability, click/pinch targets and card transition timing. Run LEAF tests, record a genuine full-flow Lens Studio SPECS preview video under three minutes, post video to YouTube, then submit the actual public repo and video through Devpost before the deadline.
