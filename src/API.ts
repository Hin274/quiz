import { useEffect } from 'react';
import { shuffleArray } from './utils';
import axios from 'axios';

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export type QuestionState = Question & { answers: string[] };

export enum Difficulty {
  ANY = '',
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

export enum Type {
  ANY = '',
  MULTIPLE = 'multiple',
  BOOLEAN = 'boolean',
}

export const fetchQuizQuestions = async (
  amount: number,
  difficulty: Difficulty,
  type: Type
) => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=${type}`;
  const data = await (await fetch(endpoint)).json();
  return data.results.map((question: Question) => ({
    ...question,
    answers: shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer,
    ]),
  }));
};

// export const FetchQuizQuestions = (
//   amount: number,
//   difficulty: Difficulty,
//   type: Type
// ) => {
//   useEffect(() => {
//     axios
//       .get(
//         `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=${type}`
//       )
//       .then((res) => {
//         return res.data.results.map((question: Question) => ({
//           ...question,
//           answers: shuffleArray([
//             ...question.incorrect_answers,
//             question.correct_answer,
//           ]),
//         }));
//       });
//   }, []);
// };
