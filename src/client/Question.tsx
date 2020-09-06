import React, { useRef, createRef } from "react";

export const Question = (props: any) => {
  const quizState = props.quizState;
  let answerInput: String;
  let currentQuestion = quizState.questions[quizState.questionNum];
  let choices = [currentQuestion.correct_answer].concat(
    currentQuestion.incorrect_answers
  );
  let currentAnswer = currentQuestion.correct_answer;

  // updates quizState whether question submitted is correct or wrong
  function quizUpdate(correct: boolean) {
    if (correct) {
      props.setQuizState({
        ...props.quizState,
        questionNum: props.quizState.questionNum + 1,
        correct: props.quizState.correct + 1,
      });
    } else {
      props.setQuizState({
        ...props.quizState,
        questionNum: props.quizState.questionNum + 1,
        wrong: props.quizState.wrong + 1,
      });
    }
  }

  // Check if question is a text question
  let text = false;
  if (currentQuestion.type === "text") {
    text = true;
  } else {
    text = false;
  }

  let textAnswer = React.createRef<HTMLInputElement>();

  // on form submit for multiple choice question
  function submitAnswer(e: any) {
    e.preventDefault();

    // if choice is correct
    if (answerInput === currentAnswer) {
      quizUpdate(true);
      // if choice is wrong
    } else {
      quizUpdate(false);
    }

    // resets radio buttons
    Array.from(document.querySelectorAll("input")).forEach(
      (el) => (el.checked = false)
    );
  }

  // on form submit for text question
  function submitTextAnswer(e: any) {
    e.preventDefault();
    const answer = textAnswer.current.value;
    if (answer === currentAnswer) {
      quizUpdate(true);
    } else {
      quizUpdate(false);
    }
  }

  // multipleChoiceQuestion
  const multipleChoiceQuestion = (
    <div>
      {currentQuestion.question}
      <form>
        {choices.map((choice: any) => (
          <div>
            <input
              name="choice"
              onClick={(e) => {
                answerInput = e.currentTarget.value;
              }}
              className="radio-button"
              value={choice}
              type="radio"
            />
            <label>{choice}</label>
          </div>
        ))}
        <button onClick={submitAnswer}>Next</button>
      </form>
    </div>
  );

  // text question
  const textQuestion = (
    <div>
      {currentQuestion.question}
      <form onSubmit={submitTextAnswer}>
        <input ref={textAnswer} type="text"></input>
        <button type="submit">Next</button>
      </form>
    </div>
  );

  // condtionally render either a multiple choice question or text question
  return <div>{text ? textQuestion : multipleChoiceQuestion}</div>;
};

export default Question;
