import React, { useState, useEffect } from "react";
import Axios from "axios";
import sanitizeHtml from "sanitize-html"; // need this to help with the api format
import Starter from "./components/Starter.js"; // testing asdf
import Answer from "./components/Answer.js";
import { nanoid } from "nanoid"; // not sure if I need this, but may need a way to reference incorrect answers with an ID

// API - https://opentdb.com/api_config.php
// https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple

function App() {
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

  // answers array

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

    return (
      <div>
        <h1>{sanitizeHtml(question)}</h1>
        {allAnswers.map((answer) => (
          <div>
            <Answer
              key={answer.id}
              correct_answer={answer.correct_answer}
              value={answer.value}
              select_answer={answer.selected_answer}
              clickAnswer={() => clickAnswer(answer.id)}
            />
          </div>
        ))}
      </div>
    );
  });

  function correctAnswerObject(value) {
    return {
      value: sanitizeHtml(value),
      correct_answer: true,
      id: nanoid(),
      selected_answer: false,
    };
  }

  function incorrectAnswerObject(value) {
    return {
      value: value,
      correct_answer: false,
      id: nanoid(),
      selected_answer: false,
    };
  }

  // function clickAnswer(id) {
  //   setChosenAnswers((previousAnswer) =>
  //     previousAnswer.map((answer) => {
  //       return id === answer.id
  //         ? { ...answer, selected_answer: !answer.selected_answer }
  //         : answer;
  //     })
  //   );
  // }

  console.log(chosenAnswers);

  function clickAnswer(id) {
    setChosenAnswers();
    setChosenAnswers((previousAnswer) =>
      previousAnswer.map((answer) => {
        return id === answer.id
          ? { ...answer, selected_answer: !answer.selected_answer }
          : answer;
      })
    );
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
