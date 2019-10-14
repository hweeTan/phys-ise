import styled from 'styled-components';

import colors from 'styles/colors';

const CreateFileWrapper = styled.div`
  .form-title {
    display: block;
    font-size: 2rem;
    color: ${colors.white};
    margin-bottom: 1rem;
  }

  .form-group {
    overflow: hidden;
    margin: 0 -1rem;
  }

  .form-input {
    display: block;
    width: 50%;
    float: left;
    padding: 0 1rem;

    input {
      width: 100%;
      padding: .6rem 1rem;
      font-size: 1.5rem;
      color: ${colors.white};
      background-color: ${colors.blue};
      border: 1px solid ${colors.white};

      &::-webkit-input-placeholder { /* Chrome/Opera/Safari */
        color: ${colors.white};
      }

      &::-moz-placeholder { /* Firefox 19+ */
        color: ${colors.white};
      }

      &:-ms-input-placeholder { /* IE 10+ */
        color: ${colors.white};
      }

      &:-moz-placeholder { /* Firefox 18- */
        color: ${colors.white};
      }
    }

    .notice-err {
      font-size: 1.2em;
      font-style: italic;
      display: block;
      color: ${colors.red};
    }
  }

  .btn-close {
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
        opacity: .8;
      }
    }
  }

  .btn-submit {
    display: block;
    width: 100%;
    margin: 1.5rem auto 0;
    padding: .7rem 4rem;
    background-color: ${colors.white};
    color: ${colors.blue};
    font-size: 1.5rem;

    &:hover {
      opacity: .75;
    }
  }
`;

export default CreateFileWrapper;
