import React, { useState } from "react";

import logo from "./logo.svg";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [error, setError] = useState(false);

  return (
    <div data-test="component-app" className="App">
      <h1 data-test="counter-display">
        The counter is currently &nbsp; <span data-test="count">{count}</span>
      </h1>
      <h1
        data-test="error-message"
        className={`error ${error ? "" : "hidden"}`}
      >
        "Error, counter can't go below zero"
      </h1>
      <button onClick={() => setCount(count + 1)} data-test="increment-button">
        Increment counter
      </button>
      <button
        data-test="decrement-button"
        onClick={() => {
          count > 0 ? setCount(count - 1) : setError(true);
        }}
      >
        Decrement Counter
      </button>
    </div>
  );
}

export default App;
