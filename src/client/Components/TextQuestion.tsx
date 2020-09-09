import React, { useState } from "react";

interface Props {
  quizUpdate(correct: boolean): any
  currentQuestion: any
}

const TextQuestion = ({ quizUpdate, currentQuestion }: Props) => {
  const [textAnswer, setTextAnswer] = useState("");
  const correctAnswer = currentQuestion.correct_answer;

  // on form submit for text question,, checks whether answer is right/wrong
  function submitTextAnswer(e: any) {
    e.preventDefault();

    if (!textAnswer) {
      alert("You have not written an answer");
      return;
    }

    const isAnswerCorrect = textAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim();
    quizUpdate(isAnswerCorrect);
    setTextAnswer("")
  }

  function handleUserInputChange(e: any) {
    setTextAnswer(e.currentTarget.value)
  }

  return (
    <form className='question-form' onSubmit={submitTextAnswer}>
      <input onChange={handleUserInputChange} type="text" />
      <button type="submit">Next</button>
    </form>
  )
};

export default TextQuestion