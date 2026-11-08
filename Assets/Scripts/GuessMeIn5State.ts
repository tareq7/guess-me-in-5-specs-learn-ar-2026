// Guess Me in 5 — Spatial Edition (Learn AR with SPECS 2026)
// Pure game state machine. No Lens Studio APIs and no runtime imports here,
// so this file is unit testable with Node's built-in test runner
// (erasable TypeScript syntax only; the `import type` below is fully erased).
// Written 2026-11-08 as new work for the SPECS 27 hackathon entry.

import type { QuizQuestion } from "./GuessMeIn5Questions";

export function resultLabel(score: number): string {
  if (score >= 5) return "Basically telepathic!";
  if (score === 4) return "You know the important stuff.";
  if (score === 3) return "Not bad — keep guessing.";
  if (score === 2) return "Are we even friends?";
  return "Who are you?!";
}

export class GuessMeIn5Game {
  private questions: QuizQuestion[];
  private answers: number[];
  private roundIndex: number;

  constructor(questions: QuizQuestion[]) {
    if (!questions || questions.length === 0) {
      throw new Error("At least one question is required");
    }
    this.questions = questions;
    this.answers = [];
    this.roundIndex = 0;
  }

  totalRounds(): number {
    return this.questions.length;
  }

  currentRound(): number {
    return this.roundIndex;
  }

  currentQuestion(): QuizQuestion | null {
    if (this.isFinished()) {
      return null;
    }
    return this.questions[this.roundIndex];
  }

  roundLabel(): string {
    if (this.isFinished()) {
      return "Done";
    }
    return "Round " + (this.roundIndex + 1) + " / " + this.questions.length;
  }

  isFinished(): boolean {
    return this.answers.length >= this.questions.length;
  }

  // Records one answer (0 = A, 1 = B) for the current round.
  // Returns true when the answer was accepted, false when the game is
  // finished (extra taps are ignored).
  answer(choice: number): boolean {
    if (choice !== 0 && choice !== 1) {
      throw new Error("Answer must be 0 (A) or 1 (B)");
    }
    if (this.isFinished()) {
      return false;
    }
    this.answers.push(choice);
    if (this.roundIndex < this.questions.length - 1) {
      this.roundIndex += 1;
    }
    return true;
  }

  score(): number {
    let s: number = 0;
    for (let i: number = 0; i < this.answers.length; i++) {
      if (this.answers[i] === this.questions[i].friend) {
        s += 1;
      }
    }
    return s;
  }

  answerCount(): number {
    return this.answers.length;
  }

  restart(): void {
    this.answers = [];
    this.roundIndex = 0;
  }
}
