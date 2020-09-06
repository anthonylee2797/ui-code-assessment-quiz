import React, { useRef, createRef } from "react";

export const Question = (props: any) => {
  // variables
  const quizState = props.quizState;
  const currentQuestion = quizState.questions[quizState.questionNum];
  const currentAnswer = currentQuestion.correct_answer;
  let choices = [""];

  // ref for text answer
  let textInput = React.createRef<HTMLInputElement>();
  // multipleChoice answer input
  let radioInput: String;

  // Check if question is a text question or multiple choice quesiton
  let text = false;
  if (currentQuestion.type === "text") {
    text = true;
  } else {
    text = false;
    const randomIndex = Math.round(
      Math.random() * currentQuestion.incorrect_answers.length
    );
    choices = [...currentQuestion.incorrect_answers];
    choices.splice(randomIndex, 0, currentQuestion.correct_answer);
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

  // on form submit for multiple choice question, checks whether answer is right/wrong
  function submitAnswer(e: any) {
    e.preventDefault();

    if (!radioInput) {
      alert("You have not selected a choice");
      return;
    }

    if (radioInput === currentAnswer) {
      quizUpdate(true);
    } else {
      quizUpdate(false);
    }

    // resets radio buttons
    Array.from(document.querySelectorAll("input")).forEach(
      (el) => (el.checked = false)
    );
  }

  // on form submit for text question,, checks whether answer is right/wrong
  function submitTextAnswer(e: any) {
    e.preventDefault();
    const answer = textInput.current.value;

    if (!answer) {
      alert("You have not written an answer");
      return;
    }

    if (answer.toLowerCase().trim() === currentAnswer.toLowerCase().trim()) {
      quizUpdate(true);
    } else {
      quizUpdate(false);
    }
  }

  // multipleChoiceQuestion
  const multipleChoiceQuestion = (
    <div>
      {currentQuestion.question.replace(/&quot;/g, '"').replace(/&#039;/g, "'")}
      <form>
        {console.log(choices, "choices")}
        {choices.map((choice: any) => (
          <div>
            <input
              name="choice"
              onClick={(e) => {
                radioInput = e.currentTarget.value;
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
      {currentQuestion.question.replace(/&quot;/g, '"').replace(/&#039;/g, "'")}
      <form onSubmit={submitTextAnswer}>
        <input ref={textInput} type="text"></input>
        <button type="submit">Next</button>
      </form>
    </div>
  );

  // condtionally render either a multiple choice question or text question
  return <div>{text ? textQuestion : multipleChoiceQuestion}</div>;
};

export default Question;
