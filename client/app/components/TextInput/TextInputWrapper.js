import styled from 'styled-components';

import vars from 'styles/variables';

const TextInputWrapper = styled.div`
  display: inline-block;
  width: 3rem;

  input {
    width: 100%;
    font-size: 1.6rem;
    font-family: ${vars.fontRegular};
    border-bottom: ${(props) => props['data-border-color']} 3px solid;
    -moz-appearance: textfield;

    &:focus {
      outline: none;
    }

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`;

export default TextInputWrapper;
