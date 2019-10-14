import styled from 'styled-components';

import colors from 'styles/colors';

const SeekerWrapper = styled.div`
  display: inline-block;
  vertical-align: top;
  width: 60rem;
  padding: 0.6rem 2.8rem 0 1.6rem;

  .timeline {
    position: relative;
    height: 1.5rem;
    background-color: ${colors.gray2};
    cursor: pointer;

    &:focus {
      outline: none;
    }
  }

  .timeline-inner {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    background-color: ${colors.gray1};
    pointer-events: none;
  }

  .mark-holder {
    position: relative;
    height: 1.3rem;
  }

  .start-mark,
  .end-mark {
    position: absolute;
    top: 0;
    width: 1.3rem;

    img {
      pointer-events: none;
    }
  }

  .start-mark {
    left: 0;
    transform: translateX(-100%);
  }

  .end-mark {
    left: 100%;
  }
`;

export default SeekerWrapper;
