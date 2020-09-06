import React, { useEffect, useState } from "react";
import Question from "./Question";
import Results from "./Results";

export const App = () => {
  const [quizState, setQuizState] = useState({
    questions: [],
    questionNum: 0,
    correct: 0,
    wrong: 0,
    questionBank: [],
  });

  // upon load, we will make an api call and retrieve questions and store in state
  useEffect(() => {
    (async function getData() {
      const allQuestions = await fetch(
        "http://localhost:4000/api/questions"
      ).then((result) => result.json());
      await getRandomQuestions(allQuestions.results);
    })();
  }, []);

  // helper function to generate 3 random questions
  function getRandomQuestions(data: any) {
    const indexes: any = [];
    const randomQuestions: any = [];

    while (randomQuestions.length < 3) {
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

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Lucid</h1>
      <h2>Welcome to UI Team code assessment!</h2>

      {/* Conditionally render either Results Component or Question component on whether they're questions left in the pool */}
      {quizState.questions.length > 0 ? (
        quizState.questionNum > quizState.questions.length - 1 ? (
          <Results
            quizState={quizState}
            getRandomQuestions={getRandomQuestions}
            setQuizState={setQuizState}
          />
        ) : (
          <Question quizState={quizState} setQuizState={setQuizState} />
        )
      ) : null}
    </div>
  );
};

// we want to make fetch request to get questions
// we store questions in state

// we want to only display 3 questions randomly, one question at a time
// after all questions finished, we display results

// endpoint for questions : /api/questions

// http://localhost:4000/api/questions
