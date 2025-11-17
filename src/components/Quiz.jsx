import { useState, useCallback } from "react";
import QUESTIONS from "../questions.js";
import Question from "./Question.jsx";
import QuizIsComepleteImg from "../assets/quiz-complete.png";

export default function Quiz() {
  const [answerState, setAnsweredState] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectedAnswer = useCallback(
    function handleSelectedAnswer(selectedAnswer) {
      setUserAnswers((prevAnswers) => {
        return [...prevAnswers, selectedAnswer];
      });
      if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
        setAnsweredState("correct");
      } else {
        setAnsweredState("wrong");
      }

      setTimeout(() => {
        setTimeout(() => {
          setAnsweredState("");
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex]
  );

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={QuizIsComepleteImg} alt="Trophy icon" />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  const handleSkipAnswer = useCallback(
    () => handleSelectedAnswer(null),
    [handleSelectedAnswer]
  );

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        questionText={QUESTIONS[activeQuestionIndex].text}
        answers={QUESTIONS[activeQuestionIndex].answers}
        selectedAnswer={userAnswers[userAnswers.length - 1]}
        answerState={answerState}
        onSkipAnswer={handleSkipAnswer}
        onSelectAnswer={handleSelectedAnswer}
      />
    </div>
  );
}
