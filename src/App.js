import React, { useState, useEffect } from "react";
import Axios from "axios";
import sanitizeHtml from "sanitize-html"; // need this to help with the format of the API, still get some weird issues with amperands though
import Starter from "./components/Starter.js";
import Answer from "./components/Answer.js";
import Check from "./components/Check.js";
import Complete from "./components/Complete.js";
import { nanoid } from "nanoid";

// API - https://opentdb.com/api_config.php
// https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple

function App() {
  const [start, setStart] = useState(false);

  const [quiz, setQuiz] = useState([]);

  const [clickCheckAnswers, setClickCheckAnswers] = useState(false);

  const [correctCount, setCorrectCount] = useState(0);

  const [again, setAgain] = useState(0);

  function isStart() {
    setStart(true);
  }

  const starterElements = !start && <Starter isStart={isStart} />;

  // this is going to help us immediately fetch the quiz so there's no delay when we hit the start Quiz
  // I moved getQuiz inside here because useEffect kept giving me an error in linux console, even though it still worked properly
  // each time again is incremented, we will fetch a new quiz
  useEffect(() => {
    const getQuiz = () => {
      Axios.get("https://opentdb.com/api.php?amount=5").then((response) => {
        const data = response.data.results;
        setQuiz(processData(data));
      });
    };
    getQuiz();
  }, [again]);

  // process the Data to make it a lot easier to work as answers will be objects
  function processData(data) {
    // helper function to make our answers into an array, add additional properties, and shuffles the arrays
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
        // *this line shuffles array elements so that the correct answer is not always on the same spot
        // I initially tried using a shuffle function and that caused all kinds of issue with state, pretty sure I needed to use uesEffect but this is easier
      ].sort(() => (Math.random() > 0.5 ? 1 : -1));
    }

    // each question itself will also have it's own id, each answer has it's own id
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
            <h1 className="questions">{sanitizeHtml(item.question)}</h1>
            <div className="answers-container">
              {item.answers.map((answer) => (
                <Answer
                  checkAnswers={clickCheckAnswers}
                  key={answer.id}
                  correct={answer.correct}
                  value={answer.answer}
                  selected={answer.selected}
                  clickAnswer={() => clickAnswer(item.id, answer.id)}
                />
              ))}
            </div>
            <hr className="horizontal-line"></hr>
          </div>
        </div>
      );
    });

  // need to check for questionId here so that we can select an answer on a per question basis
  function clickAnswer(questionId, answerId) {
    setQuiz((prevValues) => {
      return prevValues.map((item) => {
        if (item.id === questionId) {
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

  // flip our clickCheckAnswers then uses find to go through all of the elements and checks for selected and correct then updates our correctCount state variable
  // ? not sure if this is the correct way of doing things
  function compareAnswers() {
    setClickCheckAnswers((value) => !value);
    quiz.find((question) => {
      return question.answers.find((answer) => {
        if (answer.correct && answer.selected) {
          setCorrectCount((prevValue) => prevValue + 1);
        }
        return answer.invalid; // ? find function expects a return value so I just set it to something that doesn't exist
      });
    });
  }

  // uses again in state so that useEffect can help track this, so we just add 1
  // flip clickCheckAnswers back and also reset our correctCount
  function playAgain() {
    setAgain((prevValue) => prevValue + 1);
    setClickCheckAnswers((value) => !value);
    setCorrectCount(0);
  }

  // conditional rendering for our buttons and display at the end
  const checkElements = () => {
    if (start && !clickCheckAnswers) {
      return <Check click={compareAnswers} />;
    } else if (start && clickCheckAnswers) {
      return <Complete count={correctCount} playAgain={playAgain} />;
    }
  };

  return (
    <div className="App">
      {starterElements}
      {quizElements}
      {checkElements()}
    </div>
  );
}

export default App;
