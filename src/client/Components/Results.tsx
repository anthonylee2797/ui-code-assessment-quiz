import React from "react";

interface Props {
  quizState: any
  getRandomQuestions(Array: Object): any
}

export const Results = ({ quizState, getRandomQuestions }: Props) => {

  const score = Math.round((quizState.correct / quizState.questions.length) * 100)

  // gets 3 random questions from question bank and resets state
  function reset() {
    getRandomQuestions(quizState.questionBank);
  }

  return (
    <div className='results'>
      <h1>Summary</h1>
      <h3>Correct: {quizState.correct} </h3>
      <h3>Wrong: {quizState.wrong} </h3>
      <h3>Questions answered: {quizState.questions.length} </h3>
      <h3>Final Score: {score}%</h3>
      <button className='reset-quiz' onClick={reset}>Restart Quiz</button>
    </div>
  );
};

export default Results;
