import styled from 'styled-components'

import colors from 'src/styles/colors'

const CollisionPanelWrapper = styled.div`
  position: absolute;
  top: 0
  left: 0;
  background-color: ${colors.white};
  padding: 2rem;
  border: 1px dashed ${colors.gray1};

  .force-btn {
    margin-top: 1rem;
    padding: .8rem 1.2rem;
    background-color: ${colors.blue};
    color: ${colors.white};
    font-size: 1.6rem;
  }

  .collision-reveal {
    padding: .8rem 1.2rem;
    margin: 1rem 0;
    font-size: 1.6rem;
    color: ${colors.white};
    background-color: ${colors.gray1};
    border: 1px solid ${colors.white};

    &:hover {
      opacity: .7;
    }
  }

  .collision-table {
    width: 100%;

    thead {
      background-color: ${colors.gray1};
      text-align: center;
    }

    td,
    th {
      border: 1px solid ${colors.white};
      padding: .4rem .8rem;
      font-size: 1.6rem;
      text-align: center;
    }

    th {
      color: ${colors.white};
    }

    td:first-child {
      background-color: ${colors.gray1};
      color: ${colors.white};
    }

    tbody {
      text-align: center;

      tr {
        background-color: ${colors.gray3};

        &:last-child {
          td:first-child {
            background-color: ${colors.blue};
            color: ${colors.white};
            font-weight: bold;
          }
        }
      }
    }
  }
`

export default CollisionPanelWrapper
