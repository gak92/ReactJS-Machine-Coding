import { useRef, useState } from "react";
import "./style.css";

// ─────────────────────────────────────────────────────────────────────────────
// STEP 1 — Define the mask emoji shown in place of the actual digit.
//           Using a constant so it's easy to change the look later.
// ─────────────────────────────────────────────────────────────────────────────
const MASK_EMOJI = "🔒";

// ─────────────────────────────────────────────────────────────────────────────
// STEP 2 — Component signature
//   Props:
//   • count        — number of OTP input boxes (default: 4)
//   • onOTPComplete — callback fired with the final OTP string when all
//                     digits are filled. Use optional chaining when calling
//                     so it doesn't crash if the prop is not provided.
// ─────────────────────────────────────────────────────────────────────────────
export default function Otp({ count = 4, onOTPComplete }) {

  // STEP 3 — State: actual digit values (hidden from the user)
  //   Start as an empty array; each index holds the digit string or "".
  const [otps, setOtps] = useState([]);

  // STEP 4 — State: visual mask shown inside each input box
  //   Starts as an array of empty strings (one per box).
  //   When a digit is typed, we replace that slot with MASK_EMOJI.
  const [masking, setMasking] = useState(new Array(count).fill(""));

  // STEP 5 — Refs: hold direct DOM references to every <input> element
  //   so we can call .focus() on them programmatically.
  //   useRef with an array lets us index: inputRefs.current[i].focus()
  const inputRefs = useRef(new Array(count).fill(""));

  // STEP 6 — Build the masking array once per render (length = count).
  //   Doing it here (not at module level) keeps it tied to the `count` prop.
  const maskingArray = Array.from({ length: count }, () => MASK_EMOJI);

  // ───────────────────────────────────────────────────────────────────────────
  // STEP 7 — handleClick
  //   When a user clicks an already-filled box the cursor appears after the
  //   emoji character. We force the selection to position 1 (after the emoji)
  //   so that the next keypress correctly replaces the value.
  // ───────────────────────────────────────────────────────────────────────────
  function handleClick(index) {
    return (event) => {
      // Always keep cursor at position 1 (right of the single emoji character)
      event.target.setSelectionRange(1, 1);
    };
  }

  // ───────────────────────────────────────────────────────────────────────────
  // STEP 8 — handlePaste
  //   When the user pastes a full OTP (e.g. from SMS auto-fill):
  //   1. Read clipboard text and trim to `count` characters.
  //   2. Validate that it is entirely numeric.
  //   3. Fill both the real `otps` array and the visual `masking` array.
  //   4. Immediately call onOTPComplete because the OTP is already complete.
  // ───────────────────────────────────────────────────────────────────────────
  function handlePaste(index) {
    return (event) => {
      // Read from clipboard and limit to the expected OTP length
      const pastedData = event.clipboardData.getData("text").slice(0, count);

      // Only proceed if it's a full numeric string of the right length
      if (!isNaN(pastedData) && pastedData.length === count) {
        const digits = pastedData.split("");
        setOtps(digits);
        setMasking(maskingArray);   // mask all boxes with emoji
        onOTPComplete?.(digits.join(""));  // notify parent immediately
      }
    };
  }

  // ───────────────────────────────────────────────────────────────────────────
  // STEP 9 — handleKeyUp
  //   Main keyboard handler. Returns a closure pre-bound to the box `index`.
  //   Cases handled:
  //   • Backspace: clear this box, move focus left
  //   • ArrowRight: navigate right (smart — finds first empty box ahead)
  //   • ArrowLeft: navigate left (simple — previous box)
  //   • Any non-numeric key: ignore
  //   • Digit 0–9: store it, mask it, move focus right, check completion
  // ───────────────────────────────────────────────────────────────────────────
  function handleKeyUp(index) {
    return (event) => {
      const key = event.key;

      // Clone state arrays — never mutate state directly
      const oldOtps = [...otps];
      const oldMasking = [...masking];

      // ── Backspace ──────────────────────────────────────────────────────────
      if (key === "Backspace") {
        oldOtps[index] = "";      // clear the real digit
        oldMasking[index] = "";   // clear the mask emoji
        moveFocusToLeft(index);   // move cursor to previous box
        setOtps(oldOtps);
        setMasking(oldMasking);
        return;
      }

      // ── Arrow navigation ───────────────────────────────────────────────────
      if (key === "ArrowRight") {
        // Pass oldOtps so moveFocusToRight can skip already-filled boxes
        moveFocusToRight(index, oldOtps);
        return;
      }

      if (key === "ArrowLeft") {
        moveFocusToLeft(index);
        return;
      }

      // ── Ignore anything that isn't a digit ─────────────────────────────────
      if (isNaN(key)) return;

      // ── Valid digit typed ──────────────────────────────────────────────────
      oldOtps[index] = key;                    // store real digit
      oldMasking[index] = maskingArray[index]; // replace box with emoji mask
      setOtps(oldOtps);
      setMasking(oldMasking);
      moveFocusToRight(index);   // advance to next box (no oldOtps = simple +1)

      // Check if all boxes are filled (length matches & no empty strings)
      if (oldOtps.length === count && oldOtps.every((d) => d !== "")) {
        onOTPComplete?.(oldOtps.join("")); // fire callback with full OTP string
      }
    };
  }

  // ───────────────────────────────────────────────────────────────────────────
  // STEP 10 — moveFocusToRight
  //   Two modes depending on whether `oldOtps` is provided:
  //
  //   A) Called after typing a digit (no oldOtps):
  //      → Simply focus the next box (index + 1).
  //
  //   B) Called for ArrowRight (oldOtps provided):
  //      → Smart navigation: mark all boxes before current as "*" so
  //        indexOf("") finds the FIRST EMPTY box after the current position.
  //        This lets the user jump straight to the next unfilled slot.
  // ───────────────────────────────────────────────────────────────────────────
  function moveFocusToRight(index, oldOtps) {
    if (index < count - 1) {
      if (oldOtps) {
        // Fill positions 0..index with "*" so they don't appear as "" (empty)
        const trimmedArray = [...oldOtps].fill("*", 0, index + 1);
        const emptyIndex = trimmedArray.indexOf(""); // first empty ahead
        if (emptyIndex !== -1) {
          inputRefs.current[emptyIndex]?.focus();
        }
      } else {
        // Simple case: just go to the next box
        inputRefs.current[index + 1]?.focus();
      }
    }
  }

  // ───────────────────────────────────────────────────────────────────────────
  // STEP 11 — moveFocusToLeft
  //   Always moves to the immediately previous box (if one exists).
  //   Used by: Backspace, ArrowLeft.
  // ───────────────────────────────────────────────────────────────────────────
  function moveFocusToLeft(index) {
    if (index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  // ───────────────────────────────────────────────────────────────────────────
  // STEP 12 — handleChange
  //   React requires an onChange on every controlled <input> to suppress the
  //   "You provided a value without onChange" warning. It also handles the
  //   edge case where the browser autofills all boxes at once (e.g. via SMS
  //   OTP suggestions on Android — the OS writes the full value into one box).
  // ───────────────────────────────────────────────────────────────────────────
  function handleChange(event) {
    const selectedData = event.target.value;
    // If the browser deposited a full OTP string into a single box
    if (selectedData.length === count && !isNaN(selectedData)) {
      setOtps(selectedData.split(""));
      setMasking(maskingArray);
    }
  }

  // ───────────────────────────────────────────────────────────────────────────
  // STEP 13 — Render
  //   Render `count` controlled <input> boxes.
  //   Key props on each:
  //   • ref callback  — stores the DOM node in inputRefs.current[index]
  //   • type="text"   — allows emoji as value (type="number" wouldn't)
  //   • inputMode     — tells mobile keyboard to show numeric pad
  //   • autoComplete  — hints browser/OS to offer SMS OTP autofill
  //   • value         — the MASKED value (emoji or ""), not the real digit
  // ───────────────────────────────────────────────────────────────────────────
  return (
    <div>
      {Array.from({ length: count }, (_, index) => (
        <input
          ref={(iRef) => (inputRefs.current[index] = iRef)} // store DOM ref
          key={index}
          type="text"
          inputMode="numeric"        // numeric keypad on mobile
          autoComplete="one-time-code" // SMS OTP autofill hint
          value={masking[index] ?? ""}  // show mask, not real digit
          onKeyUp={handleKeyUp(index)}
          onClick={handleClick(index)}
          onPaste={handlePaste(index)}
          onChange={handleChange}
        />
      ))}
    </div>
  );
}
