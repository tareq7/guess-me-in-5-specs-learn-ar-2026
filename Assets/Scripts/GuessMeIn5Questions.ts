// Guess Me in 5 — Spatial Edition (Learn AR with SPECS 2026)
// Original question set written 2026-11-08 for the new SPECS 27 hackathon Lens.
// Concept only is inspired by the owner's older phone Lens; all wording below is new.
// Deterministic: fixed order, no shuffling, no network.

export interface QuizQuestion {
  prompt: string;
  a: string;
  b: string;
  // The friend's canonical pick for this round (0 = A, 1 = B).
  // The wearer guesses it; matches become the score.
  friend: 0 | 1;
}

export const TOTAL_ROUNDS: number = 5;

export const QUESTIONS: QuizQuestion[] = [
  { prompt: "Pick our next hangout:", a: "Sunset beach", b: "Rooftop city", friend: 0 },
  { prompt: "You win two tickets — choose:", a: "Live concert", b: "Cinema night", friend: 1 },
  { prompt: "Snack run:", a: "Something sweet", b: "Something salty", friend: 0 },
  { prompt: "Free Saturday:", a: "Road trip", b: "Stay in & games", friend: 1 },
  { prompt: "Final one — celebrations:", a: "Big party", b: "Close friends only", friend: 1 },
];
