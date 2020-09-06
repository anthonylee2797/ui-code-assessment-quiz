import React from "react";

export const Results = (props: any) => {
  let quizState = props.quizState;

  function reset() {
    props.getRandomQuestions(props.quizState.questionBank);
  }

  return (
    <div>
      Results
      <h1>Correct: {quizState.correct} </h1>
      <h1>Wrong {quizState.wrong} : </h1>
      <h1>Questions answered: {quizState.questions.length} </h1>
      <h1>
        Final Score:{" "}
        {Math.round((quizState.correct / quizState.questions.length) * 100)} %
      </h1>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default Results;
