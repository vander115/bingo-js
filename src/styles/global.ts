'use client';

import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
:root {
  --background: #e0e0e0;
  --gray500: #2C2C2C;
  --grayGradientBold: linear-gradient(267.13deg, #2C2C2C -2.96%, #707070 102.67%);
  --grayGradientLight: linear-gradient(145deg, #f0f0f0, #cacaca);
  --boxShadow: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff;
  --innerBoxShadow: inset 20px 20px 60px #bebebe, inset -20px -20px 60px #ffffff;
  --smallBoxShadow:  4px 4px 8px #bebebe, -4px -4px 8px #ffffff;
  --smallInnerBoxShadow: inset 4px 4px 8px #bebebe, inset -4px -4px 8px #ffffff;
}
body {
  width: 100%;
  height: 100%;
  background: var(--background);
}

input, button, textarea {
  background: none;
  border: none;
  outline: none;
}

`;
