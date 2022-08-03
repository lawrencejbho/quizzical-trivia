import React from "react";

function Complete(props) {
  return (
    <div className="complete-container">
      <h3 className="complete-score">
        You scored {props.count}/5 correct answers
      </h3>
      <button className="complete-answer" onClick={props.playAgain}>
        Play again
      </button>
    </div>
  );
}

export default Complete;
