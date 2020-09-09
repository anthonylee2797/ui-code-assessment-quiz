import React, { useState } from "react";

interface Props {
  choices: Array<String>,
  correctAnswer: String,
  quizUpdate(correct: boolean): any
}

const MultipleChoiceQuestion = ({ choices, correctAnswer, quizUpdate }: Props) => {
  const [mcUserAnswer, setmcUserAnswer] = useState("");

  // on form submit for multiple choice question, checks whether answer is right/wrong
  function submitAnswer(e: any) {
    e.preventDefault();

    if (!mcUserAnswer) {
      alert("You have not selected a choice");
      return;
    }

    console.log(mcUserAnswer, correctAnswer)
    const isAnswerCorrect = mcUserAnswer === correctAnswer;
    quizUpdate(isAnswerCorrect);


    // resets radio buttons & choice
    Array.from(document.querySelectorAll("input")).forEach(
      (el) => (el.checked = false)
    );

    setmcUserAnswer('')
  }

  function handleUserInputChange(e: any) {
    setmcUserAnswer(e.currentTarget.value)
  }

  return (
    <form className='question-form' onSubmit={submitAnswer}>
      {choices.map((choice: any, index: Number) => (
        <div key={`c${index}`}>
          <label>
            <input
              name="choice"
              onClick={handleUserInputChange}
              className="radio-button"
              value={choice}
              type="radio"
            />
            <span dangerouslySetInnerHTML={{ __html: choice }} />
          </label>
        </div>
      ))}
      <button type="submit">Next</button>
    </form>
  )
};

export default MultipleChoiceQuestion