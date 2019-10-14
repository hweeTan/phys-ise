import styled from 'styled-components';

import colors from 'styles/colors';

const CloseButton = styled.button`
  position: absolute;
  right: 1.5rem;
  top: 1.5rem;
  width: 2rem;
  height: 2rem;

  &:before,
  &:after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    height: 1.7rem;
    width: 2px;
    background-color: ${colors.white};
  }

  &:before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &:after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }

  &:hover {
    &:before,
    &:after {
      opacity: 0.8;
    }
  }
`;

export default CloseButton;
