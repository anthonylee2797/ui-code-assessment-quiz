import React from "react";

export const Results = (props: any) => {
  const quizState = props.quizState;
  const score = Math.round((quizState.correct / quizState.questions.length) * 100)

  // gets 3 random questions from question bank and resets state
  function reset() {
    props.getRandomQuestions(props.quizState.questionBank);
  }

  return (
    <div>
      Results
      <h1>Correct: {quizState.correct} </h1>
      <h1>Wrong: {quizState.wrong} </h1>
      <h1>Questions answered: {quizState.questions.length} </h1>
      <h1>Final Score: {score}%</h1>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default Results;
