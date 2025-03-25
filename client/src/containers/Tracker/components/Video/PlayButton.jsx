import PropTypes from 'prop-types'

import playImg from 'src/images/icon-play.png'
import pauseImg from 'src/images/icon-pause.png'

function PlayButton({ onClickPlay, onClickPause, isPlaying }) {
  return (
    <button
      className="play-btn"
      onClick={isPlaying ? onClickPause : onClickPlay}
    >
      <img
        src={isPlaying ? pauseImg : playImg}
        alt={isPlaying ? 'pause' : 'play'}
      />
    </button>
  )
}

PlayButton.propTypes = {
  onClickPlay: PropTypes.func.isRequired,
  onClickPause: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
}

export default PlayButton
