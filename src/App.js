import React, { useState, useEffect } from "react";
import Axios from "axios";
import sanitizeHtml from "sanitize-html"; // need this to help with the api format
import Starter from "./components/Starter.js"; // testing

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
      // console.log(data);
      setQuiz(data);
    });
  };

  return (
    <div className="App">
      {starterElements}
      <button onClick={getQuiz}>Get Quiz</button>
      {/* map through the array, destructure the elements and render as necessary */}
      {quiz.map(
        ({
          category: category,
          question: question,
          correct_answer: correct_answer,
          incorrect_answers: incorrect_answers,
        }) => (
          <div>
            <div>{sanitizeHtml(category)}</div>
            <div>{sanitizeHtml(question)}</div>
          </div>
        )
      )}
      <h1> test code</h1>
    </div>
  );
}

export default App;
