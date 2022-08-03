import React from "react";

function Starter(props) {
  return (
    <div className="starter-container">
      <h1>Quizzical</h1>
      <button className="starter-button" onClick={props.isStart}>
        Start quiz
      </button>
    </div>
  );
}

export default Starter;
