import React, { FormEvent, useState } from 'react';

type Props = {
  isGameOver: boolean;
  startTrivia: (e: FormEvent) => void;
  // updateTotalQuestions: (newValue: number) => void;
  handleChange: (e: React.ChangeEvent<HTMLFormElement>) => void;
};

const HomePage: React.FC<Props> = ({
  isGameOver,
  startTrivia,
  // updateTotalQuestions,
  handleChange,
}) => {
  // const [inputValue, setInputValue] = useState(10);

  const triviaCategories = [
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

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = Number(e.currentTarget.value);
  //   setInputValue(value);
  // };

  return (
    <>
      <h1>React Quiz</h1>
      <form onSubmit={startTrivia}>
        <div>
          <label htmlFor='amount'>Number of Questions</label>
          <input
            className='input'
            type='number'
            min='1'
            max='50'
            step='1'
            value={10}
            name='amount'
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor='difficulty'>Questions Difficulty</label>
          <select name='selectDifficulty' onChange={handleChange}>
            <option value=''>Any</option>
            <option value='easy'>Easy</option>
            <option value='medium'>Medium</option>
            <option value='hard'>Hard</option>
          </select>
        </div>
        <div>
          <label htmlFor='type'>Type of Questions</label>
          <select name='selectType' onChange={handleChange}>
            <option value=''>Any</option>
            <option value='multiple'>Multiple Choice</option>
            <option value='boolean'>True/False</option>
          </select>
        </div>
        <div>
          <label htmlFor='type'>Question Category</label>
          <select name='selectCategory' onChange={handleChange}>
            {triviaCategories.map((category) => {
              return (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <button
            className='start'
            // onClick={() => {
            //   updateTotalQuestions(inputValue);
            // }}
          >
            {isGameOver ? 'Start' : 'Try again'}
          </button>
        </div>
      </form>
    </>
  );
};

export default HomePage;
