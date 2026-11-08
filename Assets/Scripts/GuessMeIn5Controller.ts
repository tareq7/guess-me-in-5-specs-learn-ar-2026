// Guess Me in 5 — Spatial Edition (Learn AR with SPECS 2026)
// Lens Studio controller: wires the pure game state (GuessMeIn5State) to
// Spectacles Interaction Kit Interactables and world-space Text components.
// Written 2026-11-08 as new work for the SPECS 27 hackathon entry.
//
// Native scene wiring and the full controller inspector references are now
// serialized in Assets/Scene.scene. Native preview verification is pending.

import { Interactable } from "SpectaclesInteractionKit.lspkg/Components/Interaction/Interactable/Interactable";
import { QUESTIONS } from "./GuessMeIn5Questions";
import { GuessMeIn5Game, resultLabel } from "./GuessMeIn5State";

@component
export class GuessMeIn5Controller extends BaseScriptComponent {
  @input
  @hint("Question prompt text (world-space Text)")
  questionText: Text;

  @input
  @hint("Round indicator text, e.g. Round 2 / 5")
  roundText: Text;

  @input
  @hint("Label on answer button A")
  answerAText: Text;

  @input
  @hint("Label on answer button B")
  answerBText: Text;

  @input
  @hint("Result summary text shown after round 5")
  resultText: Text;

  @input
  @hint("SIK Interactable for answer A (pinch / mouse)")
  answerA: Interactable;

  @input
  @hint("SIK Interactable for answer B (pinch / mouse)")
  answerB: Interactable;

  @input
  @hint("SIK Interactable for the replay button on the result card")
  replayButton: Interactable;

  @input
  @hint("SceneObject group holding the question card (hidden at result)")
  questionGroup: SceneObject;

  @input
  @hint("SceneObject group holding the result card (hidden during play)")
  resultGroup: SceneObject;

  @input
  @hint("Button root for answer A (used for the selected-state pulse)")
  answerARoot: SceneObject;

  @input
  @hint("Button root for answer B (used for the selected-state pulse)")
  answerBRoot: SceneObject;

  private game: GuessMeIn5Game = null;
  private pulseRoot: SceneObject = null;
  private pulseStart: number = -1;

  onAwake() {
    this.game = new GuessMeIn5Game(QUESTIONS);
    this.createEvent("OnStartEvent").bind(() => {
      this.bindButtons();
      this.refresh();
    });
    this.createEvent("UpdateEvent").bind(() => {
      this.tickPulse();
    });
  }

  private bindButtons(): void {
    if (this.answerA) {
      this.answerA.onTriggerStart.add(() => {
        this.onAnswer(0, this.answerARoot);
      });
    } else {
      print("GuessMeIn5: answerA Interactable is not wired.");
    }
    if (this.answerB) {
      this.answerB.onTriggerStart.add(() => {
        this.onAnswer(1, this.answerBRoot);
      });
    } else {
      print("GuessMeIn5: answerB Interactable is not wired.");
    }
    if (this.replayButton) {
      this.replayButton.onTriggerStart.add(() => {
        this.onReplay();
      });
    } else {
      print("GuessMeIn5: replay Interactable is not wired.");
    }
  }

  private onAnswer(choice: number, root: SceneObject): void {
    if (!this.game || this.game.isFinished()) {
      return;
    }
    const accepted: boolean = this.game.answer(choice);
    if (accepted) {
      this.startPulse(root);
      this.refresh();
    }
  }

  private onReplay(): void {
    if (!this.game) {
      return;
    }
    this.game.restart();
    this.pulseRoot = null;
    this.pulseStart = -1;
    this.refresh();
  }

  private refresh(): void {
    if (!this.game) {
      return;
    }
    const finished: boolean = this.game.isFinished();
    if (this.questionGroup) {
      this.questionGroup.enabled = !finished;
    }
    if (this.resultGroup) {
      this.resultGroup.enabled = finished;
    }
    if (finished) {
      const s: number = this.game.score();
      if (this.resultText) {
        this.resultText.text = "You got " + s + " / 5. " + resultLabel(s);
      }
      return;
    }
    const q = this.game.currentQuestion();
    if (!q) {
      return;
    }
    if (this.questionText) {
      this.questionText.text = q.prompt;
    }
    if (this.roundText) {
      this.roundText.text = this.game.roundLabel();
    }
    if (this.answerAText) {
      this.answerAText.text = q.a;
    }
    if (this.answerBText) {
      this.answerBText.text = q.b;
    }
  }

  private startPulse(root: SceneObject): void {
    if (!root) {
      return;
    }
    this.pulseRoot = root;
    this.pulseStart = getTime();
  }

  private tickPulse(): void {
    if (!this.pulseRoot || this.pulseStart < 0) {
      return;
    }
    const DURATION: number = 0.35;
    const t: number = getTime() - this.pulseStart;
    if (t >= DURATION) {
      this.pulseRoot.getTransform().setLocalScale(new vec3(1, 1, 1));
      this.pulseRoot = null;
      this.pulseStart = -1;
      return;
    }
    const k: number = 1 + 0.15 * Math.sin((t / DURATION) * Math.PI);
    this.pulseRoot.getTransform().setLocalScale(new vec3(k, k, k));
  }
}
