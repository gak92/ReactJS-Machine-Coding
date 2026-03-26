import { useState, useRef } from "react";
import "./style.css";

export default function Accordian({ heading, children }) {
  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef(null);

  function handleExpandCollapse() {
    const newValue = !expanded;
    setExpanded(newValue);

    if (newValue) {
      contentRef.current.focus();
    }
  }

  return (
    <div data-expanded={expanded} className="accordian">
      <button
        aria-expanded={expanded}
        onClick={handleExpandCollapse}
        className="heading"
        aria-controls="content-1"
        id="heading-1"
      >
        {heading}
        <span data-expanded={expanded} aria-hidden={true}>
          &gt;
        </span>
      </button>
      <div
        role="region"
        aria-labelledby="heading-1"
        tabIndex={0}
        id="content-1"
        aria-hidden={!expanded}
        className="content"
        ref={contentRef}
      >
        {children}
      </div>
    </div>
  );
}
