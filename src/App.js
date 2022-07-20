import React, { useState, useEffect } from "react";
import Axios from "axios";
import sanitizeHtml from "sanitize-html"; // need this to help with the api format
import Starter from "./components/Starter.js"; // testing asdf
import Answer from "./components/Answer.js";

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
      console.log(response.data.results[0].incorrect_answers);
      setQuiz(data);
    });
  };

  const answers = quiz.map(
    ({
      question: question,
      correct_answer: correct_answer,
      incorrect_answers: incorrect_answers,
    }) => (
      <div>
        {console.log(typeof incorrect_answers)}
        <h1>{sanitizeHtml(question)}</h1>
        <Answer value={sanitizeHtml(correct_answer)} />
        <Answer value={sanitizeHtml(incorrect_answers)} />
      </div>
    )
  );

  // let answers = quiz.incorrect_answers;
  // console.log(answers);
  // answers.push(quiz.correct_answer);
  // console.log(answers);

  return (
    <div className="App">
      {starterElements}
      {answers}
      <button onClick={getQuiz}>Get Quiz</button>
    </div>
  );
}

export default App;
