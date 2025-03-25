import PropTypes from 'prop-types'

import TextInput from 'src/components/TextInput'
import nextFrameImg from 'src/images/icon-next-frame.png'
import prevFrameImg from 'src/images/icon-prev-frame.png'

import FrameControlWrapper from './FrameControlWrapper'

function FrameControl({ onPrevFrame, onNextFrame, onChangeFrame }) {
  return (
    <FrameControlWrapper>
      <button className="btn btn-prev" onClick={onPrevFrame}>
        <img src={prevFrameImg} alt="previous frame" />
      </button>
      <TextInput
        name="frame"
        id="frame-input"
        defaultValue="0"
        onChange={(e) => onChangeFrame(e.target.value)}
      />
      <button className="btn btn-next" onClick={onNextFrame}>
        <img src={nextFrameImg} alt="next frame" />
      </button>
    </FrameControlWrapper>
  )
}

FrameControl.propTypes = {
  onChangeFrame: PropTypes.func.isRequired,
  onNextFrame: PropTypes.func.isRequired,
  onPrevFrame: PropTypes.func.isRequired,
}

export default FrameControl
