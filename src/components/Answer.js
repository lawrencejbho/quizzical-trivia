import React from "react";

function Answer(props) {
  function changeColors() {
    if (props.correct && props.checkAnswers) {
      return "#94D7A2"; // change to green
    } else if (props.selected && props.checkAnswers) {
      return "#F8BCBC"; // change to red
    } else if (props.selected) {
      return "#D6DBF5"; // change to blue
    }
  }

  // remove the button border for selected answers and correct answers
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
