import React, { useState, useEffect } from "react";
import Axios from "axios";
import sanitizeHtml from "sanitize-html"; // need this to help with the format of the API
import Starter from "./components/Starter.js";
import Answer from "./components/Answer.js";
import { nanoid } from "nanoid";

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
    Axios.get("https://opentdb.com/api.php?amount=2").then((response) => {
      const data = response.data.results;
      setQuiz(processData(data));
    });
  };

  // process the Data to make it a lot easier to work with later on and can assign additional properties

  function processData(data) {
    function formatAnswers(correctAnswer, incorrectAnswers) {
      return [
        {
          id: nanoid(),
          selected: false,
          correct: true,
          answer: sanitizeHtml(correctAnswer),
        },
        ...incorrectAnswers.map((incorrectAnswer) => ({
          id: nanoid(),
          selected: false,
          correct: false,
          answer: sanitizeHtml(incorrectAnswer),
        })),
        // this line shuffles array elements so that the correct answer is not always on the same spot
        // I initially tried using a shuffle function and that caused all kinds of issue with state, pretty sure I needed to use uesEffect but this is easier
      ].sort(() => (Math.random() > 0.5 ? 1 : -1));
    }

    return data.map((item) => {
      return {
        id: nanoid(),
        question: item.question,
        answers: formatAnswers(
          item["correct_answer"],
          item["incorrect_answers"]
        ),
      };
    });
  }

  // when I click on an answer, I'm getting an uncaught type error
  const quizElements = quiz.map((item) => {
    console.log(quiz);
    if (item == undefined) return;
    return (
      <div>
        <div>
          <h1>{sanitizeHtml(item.question)}</h1>
          {item.answers.map((answer) => (
            <Answer
              key={answer.id}
              correct={answer.correct}
              value={answer.answer}
              selected={answer.selected}
              clickAnswer={() => clickAnswer(item.id, answer.id)}
            />
          ))}
        </div>
      </div>
    );
  });

  // we need to check for questionId here so that we can select an answer on a per question basis
  function clickAnswer(questionId, answerId) {
    setQuiz((prevValues) => {
      return prevValues.map((item) => {
        if (item.id == questionId) {
          return {
            ...item, // we need to map inside the return object or we will lose {...item} which will change our original array as we return upwards
            answers: item.answers.map((answer) => {
              return answerId === answer.id
                ? { ...answer, selected: !answer.selected }
                : { ...answer, selected: false }; // if we wanted to multi select, we leave this as answer, this instead makes it so that only one answer can be selected at a time
            }),
          };
        }
        return item;
      });
    });
  }

  return (
    <div className="App">
      {starterElements}
      {quizElements}
      <button onClick={getQuiz}>Get Quiz</button>
    </div>
  );
}

export default App;
