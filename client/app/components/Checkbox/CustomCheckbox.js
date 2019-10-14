import styled from 'styled-components';
import colors from 'styles/colors';

const CustomCheckbox = styled.span`
  display: inline-block;
  padding: .75rem 0;

  label {
    display: inline-block;
    font-size: 1.5rem;
    line-height: 2rem;
  }

  [type="checkbox"] {
    &:not(:checked),
    &:checked {
      position: absolute;
      left: -9999px;
    }

    &:not(:checked) + label,
    &:checked + label {
      position: relative;
      padding-left: 3rem;
      cursor: pointer;
    }

    &:not(:checked) + label:before,
    &:checked + label:before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 2rem;
      height: 2rem;
      border: 1px solid #ccc;
      background: #fff;
    }

    &:not(:checked) + label:after,
    &:checked + label:after {
      content: "";
      position: absolute;
      top: 0.3rem;
      left: 0.3rem;
      width: 1.4rem;
      height: 1.4rem;
      background-color: ${colors.gray1};
      transition: all .2s;
    }

    &:not(:checked) + label:after {
      opacity: 0;
      transform: scale(0);
    }

    &:checked + label:after {
      opacity: 1;
      transform: scale(1);
    }

    &:disabled:checked + label:after {
      color: #999;
    }

    &:disabled + label {
      color: ${colors.gray3};
    }
  }

`;

export default CustomCheckbox;
