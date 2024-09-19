import styled from 'styled-components'

const OverlayWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 9;

  svg {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`

export default OverlayWrapper
