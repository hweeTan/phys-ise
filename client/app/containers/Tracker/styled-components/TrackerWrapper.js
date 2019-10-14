import styled from 'styled-components';
import colors from 'styles/colors';

const TrackerWrapper = styled.div`
  position: relative;

  .video-canvas {
    position: absolute;
    top: 0;
    left: 0;
    background-color: ${colors.gray2};
  }

  .tool-canvas {
    position: relative;
  }

  .hidden {
    visibility: hidden;
  }

  .error {
    width: 100%;
  }
`;

export default TrackerWrapper;
