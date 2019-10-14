import styled from 'styled-components';

import colors from 'styles/colors';

const Wrapper = styled.div`
  width: 100%;
  background-color: ${colors.white};
  overflow: auto;

  .infor-header {
    overflow: hidden;
    background-color: ${colors.gray2};
    padding: .6rem 1.5rem;

    button {
      padding: .5rem;
      outline: 0;

      &:hover {
        background-color: ${colors.white};
      }
    }

    .infor-expand {
      float: right;
    }

    .label {
      margin-left: 1rem;
      font-size: 1.6rem;
      vertical-align: middle;
    }

    .custom-select {
      margin-left: 2rem;
    }
  }

  .infor-body {
    height: 28.6rem;
    padding: 1.5rem;
    overflow: auto;
  }

  ${({ isFullscreen }) => isFullscreen && `
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;

    .infor-body {
      height: auto;
    }
  `}
`;

export default Wrapper;
