import React, { FormEvent, useState } from 'react';
import { fetchQuizQuestions } from './API';
//Components
import QuestionCard from './components/QuestionCard';
//Types
import { QuestionState } from './API';
//styles
import { GlobalStyle, Wrapper } from './App.styles';
import HomePage from './components/HomePage';
import Questions from './components/Questions';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [formData, setFormData] = useState({
    totalQuestions: 5,
    difficulty: '',
    type: '',
    category: '',
  });

  const { totalQuestions, difficulty, type, category } = formData;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const startTrivia = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(
      totalQuestions,
      category,
      difficulty,
      type
    );

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      //users answer
      const answer = e.currentTarget.value;
      // check answer against correct answer
      const correct = questions[number].correct_answer === answer;
      // add score if answer is correct
      if (correct) setScore((prevScore) => prevScore + 1);
      //save answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    //move on to the next question if not the last question
    const nextQuestion = number + 1;
    if (nextQuestion === totalQuestions) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        {gameOver || userAnswers.length === totalQuestions ? (
          <HomePage
            isGameOver={gameOver}
            startTrivia={startTrivia}
            handleChange={handleChange}
            formData={formData}
          />
        ) : null}
        {!gameOver ? (
          <Questions
            loading={loading}
            questions={questions}
            number={number}
            score={score}
            totalQuestions={totalQuestions}
            userAnswers={userAnswers}
            checkAnswer={checkAnswer}
            nextQuestion={nextQuestion}
            gameOver={gameOver}
          />
        ) : null}
      </Wrapper>
    </>
  );
};

export default App;
