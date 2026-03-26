import "./App.css";
import ProgressBar from "./10-progress-bar";
import { useEffect, useState } from "react";

export default function App10() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((prev) => prev + 10);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  function onStart() {
    console.log("started...");
  }
  function onComplete() {
    console.log("completed...");
  }
  return (
    <div style={{ textAlign: "left" }}>
      <ProgressBar
        value={value}
        max={100}
        onStart={onStart}
        onComplete={onComplete}
      />
    </div>
  );
}
