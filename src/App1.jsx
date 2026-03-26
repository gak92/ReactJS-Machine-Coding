import { useEffect, useState } from "react";
import AutoComplete from "./01-auto-complete";
import "./App.css";

const Suggestions = ["Apple", "Banana", "Kiwi", "Orange", "Grapes"];

function App1() {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    new Promise(function (resolve) {
      setTimeout(() => {
        resolve(Suggestions);
        console.log("Suggestions: ", Suggestions);
      }, 10000);
    }).then((data) => {
      console.log("data: ", data);
      setIsLoading(false);
      setSuggestions(data);
    });
  }, []);

  function onChange(value) {
    console.log("value: ", value);
  }

  return (
    <>
      <AutoComplete
        suggestions={suggestions}
        onChange={onChange}
        isLoading={isLoading}
        debounceInput={true}
      />
    </>
  );
}

export default App1;

// fetch("url")
//   .then((res) => {
//     res.json();
//   })
//   .then((data) => {
//     setSuggestions(data);
//   });
