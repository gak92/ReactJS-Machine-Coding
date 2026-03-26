import { useEffect, useRef } from "react";
import "./style.css";

const MAX = 100;

export default function ProgressBar({
  value,
  max = MAX,
  onStart = () => {},
  onComplete = () => {},
}) {
  const progressStartRef = useRef(false);

  useEffect(() => {
    if (value >= max) {
      onComplete();
    }

    if (value) {
      if (!progressStartRef.current) {
        onStart();
        progressStartRef.current = true;
      }
    }

    const elem = document.getElementById("status");
    elem.textContent = `Progress is ${value}%`;
  });

  // 1. state --> indeterminate state
  // 2. state --> determinate state
  // 2 mandatory value to pass --> value = 0.0 - 1.0, max = 1.0

  return (
    <div>
      <progress
        aria-label="downloading reactjs"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={`Be patient, we will be ready soon, progress is ${value}%`}
        value={value}
        max={max}
      ></progress>
      <span
        role="status"
        aria-live="polite"
        id="status"
        className="visually-hidden"
      ></span>
    </div>
  );
}

export function ProgressBarBadWay({
  value,
  max = MAX,
  onStart = () => {},
  onComplete = () => {},
}) {
  const progressStartRef = useRef(false);

  useEffect(() => {
    if (value >= max) {
      onComplete();
    }

    if (value) {
      if (!progressStartRef.current) {
        onStart();
        progressStartRef.current = true;
      }
    }
  });

  return (
    <div className="progress-bar">
      {/* <div className="progress-value" style={{ width: `${value}%` }}>
        {value}
      </div> */}
      <div
        className="progress-value"
        style={{ transform: `translateX(${value - 100}%)` }}
      >
        {value}
      </div>
    </div>
  );
}
