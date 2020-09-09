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
  const [type, setType] = useState(null)

  // Check if question is a text/mc/true or false
  useEffect(setQuestionType, [currentQuestion])

  function setQuestionType() {
    if (currentQuestion.type === constants.QUESTION_TYPE.TEXT) {
      setType(true)
    } else if (currentQuestion.type === constants.QUESTION_TYPE.MULTIPLE) {
      setType(false)
    } else if (currentQuestion.type === constants.QUESTION_TYPE.BOOLEAN) {
      setType(false)
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
      {type
        ? <TextQuestion quizUpdate={quizUpdate} currentQuestion={currentQuestion} />
        : <MultipleChoiceQuestion currentQuestion={currentQuestion} quizUpdate={quizUpdate} />}
    </div>
  );
};

export default Question;


