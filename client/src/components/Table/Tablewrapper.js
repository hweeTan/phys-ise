import styled from 'styled-components'

import colors from 'src/styles/colors'

const Tablewrapper = styled.table`
  min-width: 100%;

  td,
  th {
    border: 1px solid ${colors.white};
    padding: 0.4rem 0.8rem;
    font-size: 1.6rem;
  }

  th {
    color: ${colors.white};
  }

  thead {
    background-color: ${colors.gray1};
    text-align: center;
  }

  tbody {
    text-align: center;

    tr {
      background-color: ${colors.gray3};

      &:nth-child(2n) {
        background-color: ${colors.gray2};
      }
    }
  }
`

export default Tablewrapper
