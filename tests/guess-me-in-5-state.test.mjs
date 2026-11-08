// Node tests for the pure game state of Guess Me in 5 — Spatial Edition.
// Run from the repo root with: node --test tests/
// Covers: one answer per round, 5-round progression, restart, deterministic
// questions, and exact score behaviour. No Lens Studio APIs are touched here.
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { QUESTIONS, TOTAL_ROUNDS } from "../Assets/Scripts/GuessMeIn5Questions.ts";
import { GuessMeIn5Game, resultLabel } from "../Assets/Scripts/GuessMeIn5State.ts";

const FRIEND_KEY = QUESTIONS.map((q) => q.friend);

function freshGame() {
  return new GuessMeIn5Game(QUESTIONS);
}

describe("question set", () => {
  it("has exactly five deterministic rounds", () => {
    assert.equal(TOTAL_ROUNDS, 5);
    assert.equal(QUESTIONS.length, 5);
    for (const q of QUESTIONS) {
      assert.ok(q.prompt.length > 0);
      assert.ok(q.a.length > 0);
      assert.ok(q.b.length > 0);
      assert.ok(q.friend === 0 || q.friend === 1);
    }
  });

  it("keeps a fixed order across games", () => {
    const first = freshGame().currentQuestion();
    const second = freshGame().currentQuestion();
    assert.equal(first.prompt, second.prompt);
    assert.deepEqual(FRIEND_KEY, QUESTIONS.map((q) => q.friend));
  });
});

describe("round progression", () => {
  it("starts on round 1 with no answers", () => {
    const g = freshGame();
    assert.equal(g.currentRound(), 0);
    assert.equal(g.roundLabel(), "Round 1 / 5");
    assert.equal(g.answerCount(), 0);
    assert.equal(g.isFinished(), false);
    assert.equal(g.currentQuestion().prompt, QUESTIONS[0].prompt);
  });

  it("accepts exactly one answer per round", () => {
    const g = freshGame();
    assert.equal(g.answer(0), true);
    assert.equal(g.answerCount(), 1);
    assert.equal(g.currentRound(), 1);
    assert.equal(g.currentQuestion().prompt, QUESTIONS[1].prompt);
  });

  it("advances through all five rounds then finishes", () => {
    const g = freshGame();
    for (let i = 0; i < 5; i++) {
      assert.equal(g.roundLabel(), "Round " + (i + 1) + " / 5");
      assert.equal(g.answer(0), true);
    }
    assert.equal(g.answerCount(), 5);
    assert.equal(g.isFinished(), true);
    assert.equal(g.currentQuestion(), null);
  });

  it("ignores answers after the game is finished", () => {
    const g = freshGame();
    for (let i = 0; i < 5; i++) g.answer(0);
    assert.equal(g.answer(1), false);
    assert.equal(g.answerCount(), 5);
  });

  it("rejects invalid choices", () => {
    const g = freshGame();
    assert.throws(() => g.answer(2), /0.*A.*1.*B/);
    assert.throws(() => g.answer(-1), /0.*A.*1.*B/);
    assert.equal(g.answerCount(), 0);
  });
});

describe("scoring", () => {
  it("scores 5 for a perfect guess run", () => {
    const g = freshGame();
    for (const want of FRIEND_KEY) g.answer(want);
    assert.equal(g.score(), 5);
    assert.equal(resultLabel(g.score()), "Basically telepathic!");
  });

  it("scores 0 when every guess misses", () => {
    const g = freshGame();
    for (const want of FRIEND_KEY) g.answer(want === 0 ? 1 : 0);
    assert.equal(g.score(), 0);
  });

  it("scores partial runs exactly", () => {
    const g = freshGame();
    // Match only rounds 1 and 3.
    const picks = [FRIEND_KEY[0], 1 - FRIEND_KEY[1], FRIEND_KEY[2], 1 - FRIEND_KEY[3], 1 - FRIEND_KEY[4]];
    for (const p of picks) g.answer(p);
    assert.equal(g.score(), 2);
  });
});

describe("restart", () => {
  it("clears score, round and finished flag", () => {
    const g = freshGame();
    for (let i = 0; i < 5; i++) g.answer(0);
    assert.equal(g.isFinished(), true);
    g.restart();
    assert.equal(g.isFinished(), false);
    assert.equal(g.answerCount(), 0);
    assert.equal(g.score(), 0);
    assert.equal(g.currentRound(), 0);
    assert.equal(g.roundLabel(), "Round 1 / 5");
    assert.equal(g.currentQuestion().prompt, QUESTIONS[0].prompt);
  });

  it("stays interactable after restart", () => {
    const g = freshGame();
    for (let i = 0; i < 5; i++) g.answer(0);
    g.restart();
    assert.equal(g.answer(FRIEND_KEY[0]), true);
    assert.equal(g.answerCount(), 1);
  });
});
