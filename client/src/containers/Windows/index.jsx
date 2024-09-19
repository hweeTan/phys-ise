import { useDispatch } from 'react-redux'

import PhysletsInfo from 'src/components/PhysletsInfo'
import { usePoint, usePoints } from 'src/containers/Toolbox/selectors'

import { useWindows } from './selectors'
import { ChangeType } from './reducer'
import WindowsWrapper from './styled-components/WindowsWrapper'

export const Windows = () => {
  const { window1, window2 } = useWindows()
  const point = usePoint()
  const points = usePoints()

  const dispatch = useDispatch()

  const changeType = (name, type, value) =>
    dispatch(ChangeType({ type, name, value }))

  return (
    <WindowsWrapper className="side-windows">
      <PhysletsInfo
        settings={window1}
        changeType={changeType}
        points={points}
        pointSettings={point}
        name="window1"
      />
      <PhysletsInfo
        settings={window2}
        changeType={changeType}
        points={points}
        pointSettings={point}
        name="window2"
      />
    </WindowsWrapper>
  )
}
