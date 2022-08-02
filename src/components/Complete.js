import React from "react";

function Complete(props) {
  return (
    <div>
      You scored {props.count}/5 correct answers
      <button onClick={props.playAgain}>Play again</button>
    </div>
  );
}

export default Complete;
