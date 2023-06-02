import React, { FormEvent } from 'react';

type Props = {
  isGameOver: boolean;
  startTrivia: (e: FormEvent) => void;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  formData: {
    totalQuestions: number;
    difficulty: string;
    type: string;
    category: string;
  };
};

const HomePage: React.FC<Props> = ({
  isGameOver,
  startTrivia,
  handleChange,
  formData,
}) => {
  const { totalQuestions, difficulty, type, category } = formData;

  const triviaCategories = [
    { id: 8, name: '' },
    { id: 9, name: 'General Knowledge' },
    { id: 10, name: 'Entertainment: Books' },
    { id: 11, name: 'Entertainment: Film' },
    { id: 12, name: 'Entertainment: Music' },
    { id: 13, name: 'Entertainment: Musicals & Theatres' },
    { id: 14, name: 'Entertainment: Television' },
    { id: 15, name: 'Entertainment: Video Games' },
    { id: 16, name: 'Entertainment: Board Games' },
    { id: 17, name: 'Science & Nature' },
    { id: 18, name: 'Science: Computers' },
    { id: 19, name: 'Science: Mathematics' },
    { id: 20, name: 'Mythology' },
    { id: 21, name: 'Sports' },
    { id: 22, name: 'Geography' },
    { id: 23, name: 'History' },
    { id: 24, name: 'Politics' },
    { id: 25, name: 'Art' },
    { id: 26, name: 'Celebrities' },
    { id: 27, name: 'Animals' },
    { id: 28, name: 'Vehicles' },
    { id: 29, name: 'Entertainment: Comics' },
    { id: 30, name: 'Science: Gadgets' },
    { id: 31, name: 'Entertainment: Japanese Anime & Manga' },
    { id: 32, name: 'Entertainment: Cartoon & Animations' },
  ];

  return (
    <>
      <h1>React Quiz</h1>
      <form onSubmit={startTrivia}>
        <div>
          <label htmlFor='totalQuestions'>Number of Questions</label>
          <input
            id='totalQuestions'
            type='number'
            min='1'
            max='50'
            step='1'
            value={totalQuestions}
            name='totalQuestions'
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor='difficulty'>Difficulty of Questions</label>
          <select name='difficulty' value={difficulty} onChange={handleChange}>
            <option id='difficulty' value=''>
              Any
            </option>
            <option id='difficulty' value='easy'>
              Easy
            </option>
            <option id='difficulty' value='medium'>
              Medium
            </option>
            <option id='difficulty' value='hard'>
              Hard
            </option>
          </select>
        </div>
        <div>
          <label htmlFor='type'>Type of Questions</label>
          <select name='type' value={type} onChange={handleChange}>
            <option id='type' value=''>
              Any
            </option>
            <option id='type' value='multiple'>
              Multiple Choice
            </option>
            <option id='type' value='boolean'>
              True/False
            </option>
          </select>
        </div>
        <div>
          <label htmlFor='category'>Category of Questions</label>
          <select name='category' value={category} onChange={handleChange}>
            {triviaCategories.map((category) => {
              return (
                <option key={category.id} id='category' value={category.id}>
                  {category.name ? category.name : 'Any'}
                </option>
              );
            })}
          </select>
        </div>

        <button className='start'>{isGameOver ? 'Start' : 'Try again'}</button>
      </form>
    </>
  );
};

export default HomePage;
