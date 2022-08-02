import React from "react";

function Answer(props) {
  function changeColors() {
    if (props.correct && props.checkAnswers) {
      return "#A2CDF5";
    } else if (props.selected) {
      return "#D6DBF5";
    }
  }

  const styles = {
    backgroundColor: changeColors(),
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
