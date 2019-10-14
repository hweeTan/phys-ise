import styled from 'styled-components';

import colors from 'styles/colors';

const ListFilesWrapper = styled.div`
  .form-title {
    display: block;
    font-size: 2rem;
    color: ${colors.white};
    margin-bottom: 1rem;
  }

  .btn-close {
    position: absolute;
    right: 2rem;
    top: 2rem;
    width: 2rem;
    height: 2rem;

    &:before,
    &:after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      height: 1.3rem;
      width: 3px;
      background-color: ${colors.gray1};
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
  }

  .list-files {
    list-style: none;
    padding: 0;
    margin: 0;
    overflow-y: auto;
    max-height: 24rem;

    li {
      border-top: 1px solid ${colors.white};

      &:first-child {
        border-top: 0;
      }

      &:hover {
        background-color: rgba(255, 255, 255, .3);
      }
    }

    a {
      position: relative;
      display: block;
      padding: .8rem .5rem .8rem 2rem;
      font-size: 1.5rem;
      color: ${colors.white};
      text-decoration: none;
      word-break: break-all;

      img {
        position: absolute;
        left: .5rem;
        top: 1.3rem;
        max-width: 1rem;
      }
    }
  }
`;

export default ListFilesWrapper;
