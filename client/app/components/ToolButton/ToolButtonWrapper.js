import styled from 'styled-components';

import colors from 'styles/colors';

const ToolButtonWrapper = styled.button`
  position: relative;
  padding: 1.2rem;
  transition: background-color .3s ease;

  &:hover {
    background-color: ${(props) => props.backgroundColor};

    .image {
      transform: translateY(0);
    }

    .tooltip {
      visibility: visible;
    }
  }

  .image-holder {
    position: relative;
    display: block;
    width: 2.7rem;
    height: 2.7rem;
    overflow: hidden;
  }

  .image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    transform: translateY(-2.7rem);
    transition: transform .5s ease;
  }

  .tooltip {
    position: absolute;
    top: 100%;
    left: 50%;
    padding: .8rem 1rem;
    background-color: ${(props) => props.backgroundColor};
    color: ${colors.white};
    font-size: 1.6rem;
    white-space: nowrap;
    visibility: hidden;
  }

  &.active {
    background-color: ${(props) => props.backgroundColor};

    .image {
      transform: translateY(0);
    }
  }
`;

export default ToolButtonWrapper;
