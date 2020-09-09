import React, { useState, useEffect } from "react";
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import constants from "../constants";
import TextQuestion from './TextQuestion'

interface Props {
  quizState: any
  setQuizState: any
}

export const Question = ({ quizState, setQuizState }: Props) => {
  const currentQuestion = quizState.questions[quizState.questionNum];
  const correctAnswer = currentQuestion.correct_answer;

  const [type, setType] = useState(null)
  const [choices, setChoices] = useState([])

  // Check if question is a text/mc/true or false
  useEffect(randomizeChoices, [currentQuestion])

  function randomizeChoices() {
    if (currentQuestion.type === constants.QUESTION_TYPE.TEXT) {
      setType(true)
    } else if (currentQuestion.type === constants.QUESTION_TYPE.MULTIPLE) {
      setType(false)

      // randomizes choices for multiple choice questions
      const randomIndex = Math.round(Math.random() * currentQuestion.incorrect_answers.length);
      let choicesCopy = [...currentQuestion.incorrect_answers];
      choicesCopy.splice(randomIndex, 0, currentQuestion.correct_answer)
      setChoices(choicesCopy)
    }
    else {
      setType(false)
      setChoices(['True', 'False'])
    }
  }

  // helper function, updating state whether answer is right/wrong
  function quizUpdate(correct: boolean) {
    if (correct) {
      setQuizState({
        ...quizState,
        questionNum: quizState.questionNum + 1,
        correct: quizState.correct + 1,
      });
    } else {
      setQuizState({
        ...quizState,
        questionNum: quizState.questionNum + 1,
        wrong: quizState.wrong + 1,
      });
    }
  }

  // condtionally render either a multiple choice question or text question
  return (
    <div>
      <h3 className='question-name' dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />
      {type ? <TextQuestion quizUpdate={quizUpdate} correctAnswer={correctAnswer} /> : <MultipleChoiceQuestion choices={choices} correctAnswer={correctAnswer} quizUpdate={quizUpdate} />}
    </div>
  );
};

export default Question;


