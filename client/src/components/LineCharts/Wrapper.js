import styled from 'styled-components'
import colors from 'src/styles/colors'

const Wrapper = styled.div`
  ${({ $isFullscreen }) =>
    $isFullscreen &&
    `
    .line-chart {
      display: inline-block;
    }
  `}

  .analyzing-info {
    max-width: 18.7rem;
  }

  .label-math,
  .title {
    font-size: 2rem;
    color: ${colors.black};
    font-weight: bold;
  }

  .title {
    margin-bottom: 1rem;
  }

  .label-math {
    padding: 0 1.5rem;
    margin-bottom: 1rem;
    background-color: ${colors.gray4};
  }

  .custom-select {
    width: 100%;
    margin-bottom: 2rem;
  }

  .analyzing-info {
    .custom-input {
      width: 100%;

      label,
      input {
        display: inline-block;
      }

      label {
        width: 2.3rem;
        font-size: 1.6rem;
        color: ${colors.black};
      }

      input {
        width: 16rem;
      }
    }
  }

  .auto-btn {
    height: 3rem;
    width: 100%;
    background-color: ${colors.blue};
    margin-top: 1.8rem;
    color: ${colors.white};
    font-size: 1.6rem;

    &:hover {
      opacity: 0.7;
    }
  }
`

export default Wrapper
