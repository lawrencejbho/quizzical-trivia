import React, { useState, useEffect } from "react";
import Starter from "./components/Starter.js";

function App() {
  const [start, setStart] = useState(false);

  function isStart() {
    setStart(true);
  }

  const starterElements = !start && <Starter isStart={isStart} />;

  return (
    <div className="App">
      {starterElements}
      <h1> test code</h1>
    </div>
  );
}

export default App;
