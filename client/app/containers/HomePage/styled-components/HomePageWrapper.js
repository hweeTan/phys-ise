import styled from 'styled-components';
import colors from 'styles/colors';

const HomePageWrapper = styled.div`
  max-width: 128rem;
  margin: 0 auto;

  .wrapper {
    position: relative;
    letter-spacing: -5px;
  }

  .tracker-screen {
    display: inline-block;
    vertical-align: top;
    letter-spacing: normal;
    width: calc(100% - 45rem);
    overflow: hidden;
  }

  .list-block {
    li {
      list-style: none;

      a {
        display: block;
        font-size: 1.5rem;
        color: ${colors.black};
        text-decoration: none;

        img {
          display: inline-block;
          vertical-align: middle;
          max-width: 1.2rem;
          margin-right: 1rem;
        }
      }
    }
  }

  @media (max-width: 992px) {
    .tracker-screen {
      width: 100%;
    }

    .side-windows {
      overflow: hidden;
      width: 100%;

      .physlet-item {
        width: 50%;
        float: left;
        padding: 0 1rem;
      }
    }
  }
`;

export default HomePageWrapper;
