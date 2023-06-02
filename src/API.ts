import { shuffleArray } from './utils';

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export type QuestionState = Question & { answers: string[] };

// export enum Difficulty {
//   ANY = '',
//   EASY = 'easy',
//   MEDIUM = 'medium',
//   HARD = 'hard',
// }

// export enum Type {
//   ANY = '',
//   MULTIPLE = 'multiple',
//   BOOLEAN = 'boolean',
// }

export const fetchQuizQuestions = async (
  amount: number | string,
  category: number | string,
  difficulty: string,
  type: string
) => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;
  const data = await (await fetch(endpoint)).json();
  return data.results.map((question: Question) => ({
    ...question,
    answers: shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer,
    ]),
  }));
};
