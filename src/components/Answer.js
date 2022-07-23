import React from "react";

function Answer(props) {
  const styles = {
    // backgroundColor: props.correct_answer && "#D6DBF5",
    backgroundColor: props.selected_answer && "#D6DBF5",
  };

  return (
    <div>
      <button style={styles} onClick={props.clickAnswer}>
        {props.value}
      </button>
    </div>
  );
}

export default Answer;
