import React from "react";

const TextQuestion = (props: any) => {
  // ref for text answer
  const textInput = React.createRef<HTMLInputElement>();

  // on form submit for text question,, checks whether answer is right/wrong
  function submitTextAnswer(e: any) {
    e.preventDefault();
    const userAnswer = textInput.current.value;

    if (!userAnswer) {
      alert("You have not written an answer");
      return;
    }

    const isAnswerCorrect = userAnswer.toLowerCase().trim() === props.correctAnswer.toLowerCase().trim();
    props.quizUpdate(isAnswerCorrect);
  }

  return (
    <form onSubmit={submitTextAnswer}>
      <input ref={textInput} type="text" />
      <button type="submit">Next</button>
    </form>
  )
};

export default TextQuestion