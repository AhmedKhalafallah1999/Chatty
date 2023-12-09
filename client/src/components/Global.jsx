import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    width: 100%;
    /* min-height: 100vh; */
    background: #fafafa;
    display: block;
    justify-content: center;
    align-items: center;
    overflow-x: hidden;
    margin: 0;
  }
`;

export default GlobalStyles;
