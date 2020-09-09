import React, { useEffect, useState } from "react";
import Question from "./Components/Question";
import Results from "./Components/Results";

export const App = () => {
  const [quizState, setQuizState] = useState({
    questions: [],
    questionNum: 0,
    correct: 0,
    wrong: 0,
    questionBank: [],
  });

  const NUMBER_OF_QUESTIONS = 3

  // upon load, we will make an api call and retrieve questions and store in state
  useEffect(() => {
    async function getData() {
      const result = await fetch("http://localhost:4000/api/questions");
      const allQuestions = await result.json();
      getRandomQuestions(allQuestions.results);
    }

    getData();
  }, []);

  // helper function to generate 3 random questions
  async function getRandomQuestions(data: Array<Object>) {
    const indexes: Array<Number> = [];
    const randomQuestions: Array<Object> = [];

    while (randomQuestions.length < NUMBER_OF_QUESTIONS) {
      const index = Math.floor(Math.random() * data.length);
      if (!indexes.includes(index)) {
        indexes.push(index);
        randomQuestions.push(data[index]);
      }
    }

    setQuizState({
      ...quizState,
      questionNum: 0,
      correct: 0,
      wrong: 0,
      questions: randomQuestions,
      questionBank: data,
    });
  }

  if (quizState.questions.length === 0) return null;

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Lucid</h1>
      <h2>Welcome to UI Team code assessment!</h2>

      {/* Conditionally render either Results Component or Question component on whether they're questions left in the pool */}
      {quizState.questionNum > quizState.questions.length - 1 ? (
        <Results
          quizState={quizState}
          getRandomQuestions={getRandomQuestions}
          setQuizState={setQuizState}
        />
      ) : (
          <Question
            quizState={quizState}
            setQuizState={setQuizState}
          />
        )}
    </div>
  );
};
