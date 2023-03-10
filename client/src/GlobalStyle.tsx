import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'IBM Plex Sans KR', sans-serif;
  }

  html, body, #root {
    width: 100%;
  }
<<<<<<< HEAD
ol,ul{
  list-style: none;
}
a{
  text-decoration: none;
}
=======

  main {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
>>>>>>> bb87bb1eefc6fa6dfc83cf882e2b25c679489b51
`;
export default GlobalStyle;
