import React, { useState, useEffect } from "react";
import MultipleChoiceQuestion from './mcQuestion';
import TextQuestion from './textQuestion';
import constants from "./constants";

export const Question = (props: any) => {
  const quizState = props.quizState;
  const currentQuestion = quizState.questions[quizState.questionNum];
  const correctAnswer = currentQuestion.correct_answer;

  // state
  const [type, setType] = useState(null)
  const [choices, setChoices] = useState([])

  // Check if question is a text/mc/true or false
  useEffect(randomizeChoices, [currentQuestion])

  function randomizeChoices() {
    if (currentQuestion.type === constants.QUESTION_TYPE.TEXT) {
      setType(true)
    } else if (currentQuestion.type === constants.QUESTION_TYPE.MULTIPLE) {
      setType(false)
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
      props.setQuizState({
        ...quizState,
        questionNum: quizState.questionNum + 1,
        correct: quizState.correct + 1,
      });
    } else {
      props.setQuizState({
        ...quizState,
        questionNum: quizState.questionNum + 1,
        wrong: quizState.wrong + 1,
      });
    }
  }

  // condtionally render either a multiple choice question or text question
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />
      {type ? <TextQuestion quizUpdate={quizUpdate} correctAnswer={correctAnswer} /> : <MultipleChoiceQuestion choices={choices} correctAnswer={correctAnswer} quizUpdate={quizUpdate} />}
    </div>
  );
};

export default Question;


