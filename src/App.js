import React, { useState, useEffect } from "react";
import Axios from "axios";
import sanitizeHtml from "sanitize-html"; // need this to help with the api format
import Starter from "./components/Starter.js"; // testing asdf

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

  // let answers = quiz.incorrect_answers;
  // console.log(answers);
  // answers.push(quiz.correct_answer);
  // console.log(answers);

  return (
    <div className="App">
      {starterElements}
      <button onClick={getQuiz}>Get Quiz</button>
      {/* map through the array, destructure the elements and render as necessary */}
      {/* {quiz.map(
        ({
          question: question,
          correct_answer: correct_answer,
          incorrect_answers: incorrect_answers,
        }) => (
          <div>
            {console.log(typeof incorrect_answers)}
            <h1>{sanitizeHtml(question)}</h1>
            <h4>{sanitizeHtml(correct_answer)}</h4>
            <h4>{sanitizeHtml(incorrect_answers)}</h4>
          </div>
        )
      )} */}
      <h1> test code</h1>
    </div>
  );
}

export default App;
