import React from "react";

function Check(props) {
  return (
    <>
      <button className="check-answer" onClick={props.click}>
        Check Answers
      </button>
    </>
  );
}

export default Check;
