import PropTypes from 'prop-types'

import { useVideoSettings } from '../../selectors'
import Input from '../Input'
import ToolContentWrapper from './ToolContentWrapper'

function VideoSettingsContent(props) {
  const {
    frameRate,
    startEnd: { start, end },
    updateFrameRate,
    changeStartEnd,
  } = props
  const { color } = useVideoSettings()

  return (
    <ToolContentWrapper color={color}>
      <Input
        type="text"
        name="frameRate"
        value={frameRate}
        onChange={(e) => updateFrameRate(e.target.value)}
      />
      <Input
        name="start"
        value={start}
        onChange={(e) =>
          changeStartEnd({ name: 'start', value: e.target.value })
        }
      />
      <Input
        name="end"
        value={end}
        onChange={(e) => changeStartEnd({ name: 'end', value: e.target.value })}
      />
    </ToolContentWrapper>
  )
}

VideoSettingsContent.propTypes = {
  frameRate: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  startEnd: PropTypes.object.isRequired,
  updateFrameRate: PropTypes.func.isRequired,
  changeStartEnd: PropTypes.func.isRequired,
}

export default VideoSettingsContent
