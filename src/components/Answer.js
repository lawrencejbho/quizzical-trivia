import React from "react";

function Answer(props) {
  function changeColors() {
    if (props.correct && props.checkAnswers) {
      return "#94D7A2";
    } else if (props.selected) {
      return "#D6DBF5";
    }
  }

  function changeBorder() {
    if (props.selected || (props.correct && props.checkAnswers)) {
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
