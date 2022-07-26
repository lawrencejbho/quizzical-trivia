import React, { useState, useEffect } from "react";
import Axios from "axios";
import sanitizeHtml from "sanitize-html"; // need this to help with the api format
import Starter from "./components/Starter.js"; // testing asdf
import Answer from "./components/Answer.js";
import { nanoid } from "nanoid";

// API - https://opentdb.com/api_config.php
// https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple

function App() {
  // // getting too many rerender issues, pretty sure I need to use useEffect to track changes so we don't keep rerendering
  //   React.useEffect(function() {
  //     setStateAnswers(shuffle(allAnswers))}, [props.result]
  //   })

  // for the starter screen
  const [start, setStart] = useState(false);

  function isStart() {
    setStart(true);
  }

  const starterElements = !start && <Starter isStart={isStart} />;

  // for the quiz API

  const [quiz, setQuiz] = useState([]);

  const getQuiz = () => {
    Axios.get("https://opentdb.com/api.php?amount=5").then((response) => {
      const data = response.data.results;
      setQuiz(data);
    });
  };

  // answers

  const [stateAnswers, setStateAnswers] = useState([]);

  const [chosenAnswers, setChosenAnswers] = useState([]);

  var shuffle = require("shuffle-array");

  // multiple entries, so we map through and grab the correct_answer + incorrect_answers, add both to a new array and then shuffle, then render that resulting array
  const answers = quiz.map(function ({
    question: question,
    correct_answer: correct_answer,
    incorrect_answers: incorrect_answers,
  }) {
    const allAnswers = [];
    incorrect_answers.map((answer) =>
      allAnswers.push(incorrectAnswerObject(answer))
    );
    allAnswers.push(correctAnswerObject(correct_answer));
    shuffle(allAnswers);
    // setStateAnswers(allAnswers);

    return (
      <div>
        <h1>{sanitizeHtml(question)}</h1>
        {allAnswers.map((answer) => (
          <div>
            <Answer
              key={answer.id}
              correct_answer={answer.correct_answer}
              value={answer.value}
              selected_answer={answer.isPressed}
              clickAnswer={() => clickAnswer(answer.id)}
            />
          </div>
        ))}
      </div>
    );
  });

  function clickAnswer(id) {
    console.log("hit");
    setChosenAnswers((prevValues) =>
      prevValues.map((answer) => {
        console.log(answer.id);
        return id === answer.id
          ? { ...answer, isPressed: !answer.isPressed }
          : answer;
      })
    );
  }

  function correctAnswerObject(value) {
    return {
      value: sanitizeHtml(value),
      correct_answer: true,
      id: nanoid(),
      isPressed: false,
    };
  }

  function incorrectAnswerObject(value) {
    return {
      value: sanitizeHtml(value),
      correct_answer: false,
      id: nanoid(),
      isPressed: false,
    };
  }

  return (
    <div className="App">
      {starterElements}
      {answers}
      <button onClick={getQuiz}>Get Quiz</button>
    </div>
  );
}

export default App;
