import { useEffect, useState } from "react";
import "./style.css";

export default function OverlappingCircle() {
  const [circles, setCircles] = useState([]);

  function getRandomColor() {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomColor.padStart(6, "0")}`;
  }

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  console.log(circles);
  const handleDocumentClick = (e) => {
    console.log(e.clientX, e.clientY);
    const x = e.clientX - 50;
    const y = e.clientY - 50;

    const newCircle = {
      color: getRandomColor(),
      size: "100px",
      position: { top: `${y}px`, left: `${x}px` },
    };

    const newColor = getRandomColor();
    setCircles((prevCircles) => {
      const oldCircles = [...prevCircles];

      // checking if the circle is overlapping
      oldCircles.forEach((circle) => {
        const x1 = parseInt(circle.position.left);
        const y1 = parseInt(circle.position.top);
        const x2 = x;
        const y2 = y;
        const r1 = 50;
        const r2 = 50;
        const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

        if (distance < r1 + r2) {
          newCircle.color = newColor;
          circle.color = newColor;
        }
      });

      oldCircles.push(newCircle);
      return oldCircles;
    });
  };

  return (
    <div>
      {circles.map((circle, index) => (
        <Circle
          key={index}
          color={circle.color}
          size={circle.size}
          position={circle.position}
        />
      ))}
    </div>
  );
}

function Circle({ color, size, position }) {
  return (
    <div
      className="circle-comp"
      style={{
        backgroundColor: color,
        width: size,
        height: size,
        top: position.top,
        left: position.left,
      }}
    ></div>
  );
}
