import "./App.css";
import Accordian from "./05-accordian";

export default function App5() {
  return (
    <div>
      <h1>App5</h1>
      <Accordian heading="Learning React">
        <div>
          <h4>React is a JavaScript library for building user interfaces.</h4>
          <h4>React is a JavaScript library for building user interfaces.</h4>
          <h4>React is a JavaScript library for building user interfaces.</h4>
          <h4>React is a JavaScript library for building user interfaces.</h4>
          <h4>React is a JavaScript library for building user interfaces.</h4>
        </div>
      </Accordian>
      {/* <details>
        <summary>Learing Javascript</summary>
        <div>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus,
            velit ea.
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus,
            velit ea.
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus,
            velit ea.
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus,
            velit ea.
          </p>
        </div>
      </details> */}
    </div>
  );
}

/*
Homework:
1. change the direction to horizontal
2. have a group of accordians.
3. add ability to open all or open one at a time.

*/
