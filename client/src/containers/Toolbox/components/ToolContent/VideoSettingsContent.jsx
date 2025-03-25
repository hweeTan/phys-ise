import { useDispatch } from 'react-redux'

import { ChangeFramerate, MarkFrame } from 'src/containers/Tracker/reducer'
import { useTracker } from 'src/containers/Tracker/selectors'

import { useVideoSettings } from '../../selectors'
import Input from '../Input'
import ToolContentWrapper from './ToolContentWrapper'

function VideoSettingsContent() {
  const dispatch = useDispatch()
  const changeFramerate = (payload) => dispatch(ChangeFramerate(payload))
  const markFrame = (payload) => dispatch(MarkFrame(payload))

  const { frameRate, start, end } = useTracker()
  const { color } = useVideoSettings()

  return (
    <ToolContentWrapper color={color}>
      <Input
        type="text"
        name="frameRate"
        value={frameRate}
        onChange={(e) => changeFramerate(e.target.value)}
      />
      <Input
        name="start"
        value={start}
        onChange={(e) => markFrame({ name: 'start', value: e.target.value })}
      />
      <Input
        name="end"
        value={end}
        onChange={(e) => markFrame({ name: 'end', value: e.target.value })}
      />
    </ToolContentWrapper>
  )
}

export default VideoSettingsContent
