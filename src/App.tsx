import React, { FormEvent, useRef, useState } from 'react';
import { fetchQuizQuestions } from './API';
//Components
import QuestionCard from './components/QuestionCard';
//Types
import { QuestionState, Difficulty, Type } from './API';
//styles
import { GlobalStyle, Wrapper } from './App.styles';

/*
I am having trouble with the Type for use Total_Questions
It is a useRef because it is an input element that I don't want to re-render when I change the number.
Once this is working I will add more input elements for Difficulty, Question Types and Categories.
 */

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
  // const [categories, setCategories] = useState([])

  const TOTAL_QUESTIONS = useRef<HTMLInputElement>(null);

  const startTrivia = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY,
      Type.ANY
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
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>React Quiz</h1>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <form onSubmit={startTrivia}>
            <div>
              <label htmlFor='amount'>Number of Questions</label>
              <input
                className='input'
                type='number'
                id='amount'
                min='1'
                step='1'
                defaultValue={10}
                ref={TOTAL_QUESTIONS}
              />
            </div>
            <div>
              <button className='start'>
                {gameOver ? 'Start' : 'Try again'}
              </button>
            </div>
          </form>
        ) : null}

        {!gameOver && <p className='score'>Score: {score}</p>}
        {loading && <p>Loading Questions ...</p>}
        {!loading && !gameOver && (
          <QuestionCard
            questionNumber={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}
        {!gameOver &&
        !loading &&
        userAnswers.length === number + 1 &&
        number !== TOTAL_QUESTIONS - 1 ? (
          <button className='next' onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}
      </Wrapper>
    </>
  );
};

export default App;
