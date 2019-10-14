import styled from 'styled-components';
import colors from 'styles/colors';

const SelectCustom = styled.div`
  position: relative;
  display: inline-block;
  width: ${({ size }) => size === 'long' ? 15 : 10}rem;
  height: 3.5rem;
  vertical-align: middle;
  border: 1px solid ${colors.gray3};
  background-color: ${colors.white};

  &:before {
    content: "";
    position: absolute;
    top: 50%;
    right: 1rem;
    width: 0.7rem;
    height: 0.7rem;
    transform: translateY(-50%) rotate(-45deg);
    border-left: 1px solid ${colors.black};
    border-bottom: 1px solid ${colors.black};
    margin-top: -0.1rem;
  }

  select {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    padding: 0.5rem 1rem;
    font-size: 1.5rem;
    appearance: none;
  }
`;

export default SelectCustom;
