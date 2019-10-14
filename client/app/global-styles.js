import { injectGlobal } from 'styled-components';

import fonts from 'styles/fonts';
import vars from 'styles/variables';
import colors from 'styles/colors';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  ${fonts}

  html,
  body {
    height: 100%;
    width: 100%;
  }

  html {
    font-size: 10px;
  }

  body {
    font-family: ${vars.fontRegular};
    color: ${colors.black};
  }

  #app {
    min-height: 100%;
    min-width: 100%;
    overflow: auto;
  }

  button {
    padding: 0;
    cursor: pointer;

    &:focus {
      outline: none;
    }
  }

  img {
    max-width: 100%;
  }

  p {
    margin: 0;
    font-size: 1.5rem;
  }

  .ReactModal__Overlay--after-open {
    z-index: 1;
  }

  @media (max-width: 1024px) {
    html {
      font-size: 8px;
    }
  }
`;
