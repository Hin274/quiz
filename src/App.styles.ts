import styled, { createGlobalStyle } from 'styled-components';
import BGImage from './images/questionbackground.jpg';

export const GlobalStyle = createGlobalStyle`
html {
    height:100%;

}

body {
    background-image:url(${BGImage});
    background-size: cover;
    margin: 0;
    padding: 0 20px;
    display: flex;
    justify-content: center;
}
*{
    box-sizing: border-box;
    font-family: 'Catamaran',sans-serif;
}
`;

export const Wrapper = styled.div`
  p,
  label {
    color: #fff;
    margin: 10px;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .score {
    color: #fff;
    font-size: 2rem;
    margin: 0;
  }
  h1 {
    font-family: Fascinate Impact, Haettenschweiler, 'Arial Narrow Bold',
      sans-serif;
    background-image: linear-gradient(180deg, #fff, #d14144);
    background-size: 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
    filter: drop-shadow(2px 2px #af2726);
    font-size: 70px;
    font-weight: 400;
    text-align: center;
    margin: 20px;
  }

  .start,
  .next,
  input,
  select {
    cursor: pointer;
    background: linear-gradient(180deg, #fff, #d14144);
    border: 2px solid #af2726;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    font-size: 1rem;
    padding: 0 5px;
  }

  input {
    text-align: center;
  }

  .start {
    padding: 10px 20px;
    align-self: center;
  }
`;
