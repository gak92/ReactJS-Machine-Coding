import { useEffect, useState } from "react";
import "./style.css";

export default function TrafficLight({ data }) {
  const dataToShow = getSortedDisplayOrder(data);
  const dataToOrder = getSortedOrder(data);

  const [lightsInDisplayOrder, setLightsInDisplayOrder] = useState(dataToShow);
  const [lightsInOrder, setLightsInOrder] = useState(dataToOrder);
  const [activeLight, setActiveLight] = useState(lightsInOrder[0]);

  function getSortedDisplayOrder(data) {
    return data.toSorted((a, b) => a.displayOrder - b.displayOrder);
  }

  function getSortedOrder(data) {
    return data.toSorted((a, b) => a.order - b.order);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      const currentLightIndex = lightsInOrder.findIndex(
        (light) => light.color === activeLight.color,
      );
      const nextLightIndex = currentLightIndex + 1;
      const nextLight = lightsInOrder[nextLightIndex] || lightsInOrder[0];
      setActiveLight(nextLight);
    }, activeLight.timer);

    return () => clearTimeout(timer);
  }, [activeLight]);

  return (
    <div>
      <div className="traffic-light">
        {lightsInDisplayOrder.map((light) => (
          <Light
            key={light.color}
            color={light.color}
            activeLightColor={activeLight.color}
          />
        ))}
      </div>
    </div>
  );
}

function Light({ color, activeLightColor }) {
  const opacity = color === activeLightColor ? 1 : 0.5;
  return (
    <div className="light" style={{ backgroundColor: color, opacity }}></div>
  );
}
