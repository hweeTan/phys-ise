import styled from 'styled-components';

import colors from 'styles/colors';
import vars from 'styles/variables';

const InputWrapper = styled.div`
  display: inline-block;
  vertical-align: middle;
  margin-left: 1rem;
  padding: .35rem 0;

  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }

  input {
    margin-left: 0.5rem;
    width: ${({ styleType }) => styleType === 'small' ? 3 : 6}rem;
    font-size: 1.5rem;
    font-family: ${vars.fontRegular};
    border-bottom: 3px solid ${colors.black};
  }

  label {
    font-size: 1.5rem;
  }
`;

export default InputWrapper;
