import React, { useState, useEffect } from "react";
import constants from "../constants";

interface Props {
  currentQuestion: any
  quizUpdate(correct: boolean): any
}

const MultipleChoiceQuestion = ({ currentQuestion, quizUpdate }: Props) => {
  const [mcUserAnswer, setmcUserAnswer] = useState("");
  const [choices, setChoices] = useState([])
  const correctAnswer = currentQuestion.correct_answer;

  useEffect(setChoicesHelper, [currentQuestion])

  function setChoicesHelper() {
    if (currentQuestion.type === constants.QUESTION_TYPE.MULTIPLE) {
      const randomIndex = Math.round(Math.random() * currentQuestion.incorrect_answers.length);
      let choicesCopy = [...currentQuestion.incorrect_answers];
      choicesCopy.splice(randomIndex, 0, currentQuestion.correct_answer)
      setChoices(choicesCopy)
    }
    else if (currentQuestion.type === constants.QUESTION_TYPE.BOOLEAN) {
      setChoices(['True', 'False'])
    }
  }

  // on form submit for multiple choice question, checks whether answer is right/wrong
  function submitAnswer(e: any) {
    e.preventDefault();

    if (!mcUserAnswer) {
      alert("You have not selected a choice");
      return;
    }

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