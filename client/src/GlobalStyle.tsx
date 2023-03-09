import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR&display=swap');
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'IBM Plex Sans KR', sans-serif;
  }

  html, body, #root {
    width: 100%;
  }
`;

export default GlobalStyle;
