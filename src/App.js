import React, { useState, useEffect } from "react";
import Axios from "axios";
import sanitizeHtml from "sanitize-html"; // need this to help with the format of the API
import Starter from "./components/Starter.js";
import Answer from "./components/Answer.js";
import Check from "./components/Check.js";
import { nanoid } from "nanoid";

// API - https://opentdb.com/api_config.php
// https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple

function App() {
  // this is going to help us immediately fetch the quiz so there's no delay when we hit the start Quiz
  useEffect(() => getQuiz(), []);

  // for the starter screen
  const [start, setStart] = useState(false);

  const getQuiz = () => {
    Axios.get("https://opentdb.com/api.php?amount=2").then((response) => {
      const data = response.data.results;
      setQuiz(processData(data));
    });
  };

  function isStart() {
    setStart(true);
  }

  const starterElements = !start && <Starter isStart={isStart} />;

  // for the quiz API

  const [quiz, setQuiz] = useState([]);

  // process the Data to make it a lot easier to work as answers will be objects
  function processData(data) {
    // helper function to add additional properties and shuffle our answers
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

    // after formatting each answer, we'll drop them into a combined answers array.
    // each question itself will also have it's own id
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

  const quizElements =
    start &&
    quiz.map((item) => {
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

  // need to check for questionId here so that we can select an answer on a per question basis
  function clickAnswer(questionId, answerId) {
    setQuiz((prevValues) => {
      return prevValues.map((item) => {
        if (item.id == questionId) {
          return {
            ...item, // need to map inside the return object or it will lose {...item} which will change our original array as we return upwards
            answers: item.answers.map((answer) => {
              return answerId === answer.id
                ? { ...answer, selected: !answer.selected }
                : { ...answer, selected: false }; // if I wanted to multi select, then leave this as answer, this instead makes it so that only one answer can be selected at a time
            }),
          };
        }
        return item;
      });
    });
  }

  function checkAnswers() {
    return;
  }

  const checkElements = quiz == [] && <Check />;

  return (
    <div className="App">
      {starterElements}
      {quizElements}
      {checkElements}
    </div>
  );
}

export default App;
