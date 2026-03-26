import "./App.css";
import TrafficLight from "./04-traffic-light";

const trafficLightConfig = [
  {
    color: "Red",
    timer: 4000, // in ms (4 seconds)
    order: 1,
    displayOrder: 3,
  },
  {
    color: "Yellow",
    timer: 1000,
    order: 3,
    displayOrder: 1,
  },
  {
    color: "Green",
    timer: 2000,
    order: 2,
    displayOrder: 2,
  },
  {
    color: "aqua",
    timer: 1000,
    order: 5,
    displayOrder: 4,
  },
  {
    color: "fuchsia",
    timer: 1000,
    order: 4,
    displayOrder: 5,
  },
];

export default function App4() {
  return (
    <div>
      <h1>App4</h1>
      <TrafficLight data={trafficLightConfig} />
    </div>
  );
}

/*

{
 COLOR: "Red",
 TIMER: 1000,
 ORDER: 1,
 DISPLAY_ORDER: 1,
}

*/
