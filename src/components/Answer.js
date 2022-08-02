import React from "react";

function Answer(props) {
  function changeColors() {
    if (props.correct && props.checkAnswers) {
      return "#A2CDF5";
    } else if (props.selected) {
      return "#D6DBF5";
    }
  }

  function changeBorder() {
    if (props.selected) {
      return "none";
    } else {
      return ".5px solid";
    }
  }

  const styles = {
    backgroundColor: changeColors(),
    border: changeBorder(),
  };

  return (
    <div>
      <button
        style={styles}
        className="answer-button"
        onClick={props.clickAnswer}
      >
        {props.value}
      </button>
    </div>
  );
}

export default Answer;
