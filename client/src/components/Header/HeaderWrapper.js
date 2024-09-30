import styled from 'styled-components'

import colors from 'src/styles/colors'

const HeaderWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  z-index: 1;

  .utility-group {
    display: flex;
  }

  .utility-button {
    padding: 1.2rem 1.5rem;
    transition: all 0.4s;

    &:hover {
      opacity: 0.7;
    }

    img,
    .text {
      display: inline-block;
      vertical-align: middle;
    }

    .text {
      margin-left: 1.2rem;
      font-size: 1.5rem;
      color: ${colors.gray1};
    }

    &.save-file {
      background-color: ${colors.blue};
      margin-left: 1.5rem;
      padding: 1.2rem 2rem;

      .text {
        color: #fff;
      }
    }
  }

  .upload-file {
    position: relative;

    &:hover {
      opacity: 0.7;
    }

    input[type='file'] {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      opacity: 0;
    }

    label {
      display: inline-block;
      position: relative;
      font-size: 1.5rem;
      color: ${colors.gray1};
      cursor: pointer;
    }

    img {
      margin-right: 1.2rem;
    }
  }
`

export default HeaderWrapper
