import styled from 'styled-components'

import colors from 'src/styles/colors'

const ToolContentWrapper = styled.div`
  position: relative;
  border-top: 1px solid ${colors.gray2};
  padding: .6rem 1rem;
  min-height: 4.8rem;
  align-items: center;
  display: flex;
  flex-wrap: wrap;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: .9rem;
    background-color: ${({ color }) => color};
  }

  input[type="number"],
  input[type="text"] {
    border-color: ${({ color }) => color};
  }

  .custom-checkbox {
    margin-left: 1rem;
    vertical-align: middle;

    [type="checkbox"]:checked + label:after {
      background-color: ${({ color }) => color};
    }
  }

  .custom-select {
    margin-left: 1rem;
  }
`

export default ToolContentWrapper
