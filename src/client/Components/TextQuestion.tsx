import React, { useState } from "react";

interface Props {
  quizUpdate(correct: boolean): any
  correctAnswer: String
}

const TextQuestion = ({ quizUpdate, correctAnswer }: Props) => {
  const [textAnswer, setTextAnswer] = useState("");

  // on form submit for text question,, checks whether answer is right/wrong
  function submitTextAnswer(e: any) {
    e.preventDefault();

    if (!textAnswer) {
      alert("You have not written an answer");
      return;
    }

    const isAnswerCorrect = textAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim();
    quizUpdate(isAnswerCorrect);
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