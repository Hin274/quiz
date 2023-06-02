import React from 'react';
import QuestionCard from './QuestionCard';
import { QuestionState } from '../API';
import { AnswerObject } from '../App';

type Props = {
  loading: boolean;
  questions: React.SetStateAction<QuestionState[]>;
  number: number;
  score: number;
  totalQuestions: number;
  userAnswers: React.SetStateAction<AnswerObject[]>;
  checkAnswer: (e: React.MouseEvent<HTMLButtonElement>) => void;
  nextQuestion: () => void;
  gameOver: boolean;
};

const Questions: React.FC<Props> = ({
  loading,
  questions,
  number,
  score,
  totalQuestions,
  userAnswers,
  checkAnswer,
  nextQuestion,
  gameOver,
}) => {
  return (
    <>
      {!gameOver && <p className='score'>Score: {score}</p>}
      {loading && <p>Loading Questions ...</p>}
      {!loading && !gameOver && (
        <QuestionCard
          questionNumber={number + 1}
          totalQuestions={totalQuestions}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />
      )}
      {!gameOver &&
      !loading &&
      userAnswers.length === number + 1 &&
      number !== totalQuestions - 1 ? (
        <button className='next' onClick={nextQuestion}>
          Next Question
        </button>
      ) : null}
    </>
  );
};

export default Questions;
