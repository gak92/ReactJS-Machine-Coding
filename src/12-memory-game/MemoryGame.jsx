// ============================================================
// Memory Game — React Component
// ============================================================
// CONCEPT: Classic card-matching game using 3D CSS flip animation.
//
// KEY REACT CONCEPTS USED:
//   • useState          — managing multiple pieces of game state
//   • Lazy initializer  — useState(fn) runs fn only on first render
//   • Closure in events — handleClick(index) returns a function
//                         so each card captures its own index
//   • Conditional data-* attributes — drive CSS state visually
//   • Array spread      — cloning arrays to avoid direct mutation
// ============================================================

import { useState } from "react";
import "./style.css";

// ── Data ──────────────────────────────────────────────────────
// Source emoji list. Each emoji will appear TWICE on the board
// (one pair). With 5 emojis → 10 cards total (fits a 4-col grid).
const data = ["😎", "😈", "👽", "🤖", "🎃"];

// ── Component ─────────────────────────────────────────────────
export default function MemoryGame() {

  // cards: shuffled array of emojis (10 items — each emoji twice).
  // Passing `prepareCards` (without calling it) as a lazy initializer
  // so React only calls it once on mount, not on every re-render.
  const [cards, setCards] = useState(prepareCards);

  // firstClickIndex: index of the first card the player flipped.
  // null means no card has been selected yet this turn.
  const [firstClickIndex, setFirstClickIndex] = useState(null);

  // secondClickIndex: index of the second card flipped in a turn.
  // Used to keep both cards visible during the 2-second mismatch delay.
  const [secondClickIndex, setSecondClickIndex] = useState(null);

  // turns: counts completed pairs of flips (increments on 2nd click).
  const [turns, setTurns] = useState(0);

  // matchingIndices: array of indices that have been successfully matched.
  // Cards at these indices stay permanently flipped (data-active="true").
  const [matchingIndices, setMatchingIndices] = useState([]);

  // ── prepareCards ────────────────────────────────────────────
  // Creates a shuffled deck by:
  //   1. Duplicating the data array to make pairs → [...data, ...data]
  //   2. Running a Fisher-Yates shuffle (in-place random swap loop)
  //
  // WHY inside the component?
  //   So it can be called again on restart with fresh state context.
  //   It's hoisted as a function declaration, so useState(prepareCards)
  //   above can reference it before the function definition line.
  function prepareCards() {
    // Step 1: Create a 10-item array with each emoji duplicated
    const duplicateCards = [...data, ...data];

    // Step 2: Fisher-Yates shuffle — iterate and swap each element
    // with a random element at or after it in the array.
    for (let i = 0; i < duplicateCards.length; i++) {
      const randomIndex = Math.floor(Math.random() * duplicateCards.length);
      // Swap duplicateCards[i] with duplicateCards[randomIndex]
      const temp = duplicateCards[i];
      duplicateCards[i] = duplicateCards[randomIndex];
      duplicateCards[randomIndex] = temp;
    }
    return duplicateCards;
  }

  // ── handleClick ─────────────────────────────────────────────
  // Returns a new function (closure) bound to the clicked card's index.
  // This pattern avoids creating an inline arrow function in JSX,
  // while still giving each card its own captured `index` value.
  //
  // TURN LOGIC:
  //   • 1st click → store as firstClickIndex (no turn increment yet).
  //   • 2nd click → increment turns, then check for a match.
  //     - MATCH:    clear firstClickIndex, add both indices to matchingIndices.
  //                 If all cards matched → alert win + restart.
  //     - MISMATCH: set secondClickIndex so both cards stay visible,
  //                 then auto-flip back after 2 seconds.
  function handleClick(index) {
    return () => {
      // ── First click of a turn ──
      if (firstClickIndex === null) {
        setFirstClickIndex(index); // remember which card was flipped first
      }

      // ── Second click of a turn ──
      else {
        // Guard: ignore if the player clicks the same card again.
        // Without this, comparing a card to itself would always match!
        if (index === firstClickIndex) return;

        // Only count a full turn when the second card is clicked.
        setTurns((prev) => prev + 1);

        const firstValue = cards[firstClickIndex]; // emoji of 1st card
        const secondValue = cards[index];          // emoji of 2nd card

        // ── MATCH ──
        if (firstValue === secondValue) {
          setFirstClickIndex(null); // reset selection for next turn

          // Add both matched indices to the permanent winners list.
          // Using spread to avoid mutating existing state array.
          const newWinningIndices = [
            ...matchingIndices,
            firstClickIndex,
            index,
          ];
          setMatchingIndices(newWinningIndices);

          // Win condition: all cards have been matched
          if (newWinningIndices.length === cards.length) {
            alert("You win!");
            restartGame(); // reset everything for a new game
          }
          // If not yet a full win, the game continues automatically.

        // ── MISMATCH ──
        } else {
          // Show the second (non-matching) card briefly before flipping back.
          setSecondClickIndex(index);

          // After 2 seconds, flip both cards back face-down.
          // During this window, data-disable-all="true" prevents other clicks.
          setTimeout(() => {
            setFirstClickIndex(null);
            setSecondClickIndex(null);
          }, 2000);
        }
      }
    };
  }

  // ── restartGame ─────────────────────────────────────────────
  // Resets all state to start a brand-new game:
  //   • Re-shuffles cards by calling prepareCards() fresh
  //   • Clears both click indices and all matched indices
  //   • Resets the turn counter to 0
  function restartGame() {
    setCards(prepareCards());      // new shuffled deck
    setFirstClickIndex(null);
    setSecondClickIndex(null);
    setMatchingIndices([]);
    setTurns(0);
  }

  // ── Render ──────────────────────────────────────────────────
  // The grid renders 10 card <div>s. Each card has:
  //   • .front  — the face-down side (grey cover, visible by default)
  //   • .back   — the face-up side (shows emoji, hidden by default)
  //
  // Data attributes drive CSS transforms:
  //   data-toggle="true"      → card is actively selected (1st or 2nd click)
  //   data-active="true"      → card is permanently matched (stays flipped)
  //   data-disabled="true"    → 1st selected card; block re-clicking it
  //   data-disable-all="true" → both cards selected; block ALL clicks
  //                             (prevents interference during mismatch delay)
  return (
    <div className="memory-game">
      {/* Restart button — calls restartGame to reset everything */}
      <button onClick={restartGame}>Restart Game</button>

      {/* Turns counter — shows how many pair-attempts the player has made */}
      <p>Turns: {turns}</p>

      {/* Render each card from the shuffled cards array */}
      {cards.map((emoji, index) => {
        return (
          <div
            // Flip this card if it's the 1st or 2nd selected card this turn
            data-toggle={
              firstClickIndex === index || secondClickIndex === index
            }
            // Keep this card permanently flipped if it has been matched
            data-active={matchingIndices.includes(index)}
            // Disable pointer events on the 1st-clicked card (can't re-click it)
            data-disabled={index === firstClickIndex}
            // Disable ALL card clicks when both 1st and 2nd cards are selected
            // (i.e., during the 2-second mismatch flip-back delay)
            data-disable-all={
              firstClickIndex !== null && secondClickIndex !== null
            }
            onClick={handleClick(index)} // closure that captures this card's index
            className="card"
            key={index}
          >
            {/* Front face: grey cover shown when card is face-down */}
            <div className="front"></div>

            {/* Back face: emoji revealed when card is flipped */}
            <div className="back">{emoji}</div>
          </div>
        );
      })}
    </div>
  );
}
