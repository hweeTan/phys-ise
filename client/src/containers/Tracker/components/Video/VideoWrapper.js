import styled from 'styled-components'
import colors from 'src/styles/colors'

const VideoWrapper = styled.div`
  .play-btn {
    vertical-align: top;
  }

  .control {
    padding: 1rem 0 1rem 1.7rem;

    .custom-select {
      width: 8rem;
      margin-left: 1.5rem;

      &:before,
      &:after {
        content: '';
        position: absolute;
      }

      &:after {
        top: 1.9rem;
        right: 1rem;
        height: 0.5rem;
        width: 1px;
        background-color: ${colors.black};
        transform: rotate(-45deg);
      }

      &:before {
        top: 1rem;
        width: 1.2rem;
        height: 1.2rem;
        border: 1px solid ${colors.black};
        border-radius: 50%;
        transform: none;
      }
    }
  }

  .real-video {
    position: fixed;
    left: -9999px;
    visibility: hidden;
  }
`

export default VideoWrapper
