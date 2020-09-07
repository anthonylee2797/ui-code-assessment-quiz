import React, { useState } from "react";

const MultipleChoiceQuestion = (props: any) => {
  const [mcUserAnswer, setmcUserAnswer] = useState("");

  // on form submit for multiple choice question, checks whether answer is right/wrong
  function submitAnswer(e: any) {
    e.preventDefault();

    if (!mcUserAnswer) {
      alert("You have not selected a choice");
      return;
    }

    const isAnswerCorrect = mcUserAnswer === props.correctAnswer;
    props.quizUpdate(isAnswerCorrect);

    // resets radio buttons
    Array.from(document.querySelectorAll("input")).forEach(
      (el) => (el.checked = false)
    );
  }

  return (
    <form onSubmit={submitAnswer}>
      {props.choices.map((choice: any, index: Number) => (
        <div key={`c${index}`}>
          <label>
            <input
              name="choice"
              onClick={(e) => { setmcUserAnswer(e.currentTarget.value) }}
              className="radio-button"
              value={choice}
              type="radio"
            />
            {choice}
          </label>
        </div>
      ))}
      <button type="submit">Next</button>
    </form>
  )
};

export default MultipleChoiceQuestion