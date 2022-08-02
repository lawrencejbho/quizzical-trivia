import React from "react";

function Check(props) {
  return (
    <div className="check-answer-container">
      <button className="check-answer" onClick={props.click}>
        Check Answers
      </button>
    </div>
  );
}

export default Check;
