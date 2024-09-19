import { useRef, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { round } from 'lodash'

import { getOffset } from 'src/utils/helpers'
import startMark from 'src/images/start-mark.png'
import endMark from 'src/images/end-mark.png'

import SeekerWrapper from './SeekerWrapper'

const getFrameNumber = (left, duration, frameRate) =>
  round(left * duration * frameRate)

const getCurrentPosition = (e, target, duration, frameRate) => {
  const boundingRect = getOffset(target)
  const leftOffset = e.offsetX || e.pageX - boundingRect.left
  const left = leftOffset / target.offsetWidth

  const percentage =
    getFrameNumber(left, duration, frameRate) / frameRate / duration

  if (percentage > 1) {
    return 100
  } else if (percentage < 0) {
    return 0
  }

  return percentage * 100
}

const getMarkerPosition = (frameNumber, frameRate, duration) => {
  return (frameNumber / frameRate / duration) * 100
}

const Seeker = ({ start, end, frameRate, duration, markFrame, onClick }) => {
  const dragTarget = useRef(null)
  const startRef = useRef(null)
  const endRef = useRef(null)
  const timelineRef = useRef(null)

  const mouseUpHandler = useCallback(() => {
    if (dragTarget.current) {
      const name = dragTarget.current.getAttribute('data-name')

      const targetLeft = getOffset(dragTarget.current).left
      const timeLineTeft = getOffset(timelineRef.current).left
      const resultLeft = targetLeft - timeLineTeft

      const timeLineWidth = timelineRef.offsetWidth
      const ratio = resultLeft / timeLineWidth

      const frame = getFrameNumber(ratio, duration, frameRate)
      const finalFrame = name === 'start' ? frame + 1 : frame

      markFrame(name, finalFrame, 2)
      dragTarget.current = null
    }
  }, [duration, frameRate, markFrame])

  useEffect(() => {
    document.addEventListener('mouseup', mouseUpHandler, false)

    return () => document.removeEventListener('mouseup', mouseUpHandler, false)
  }, [mouseUpHandler])

  useEffect(() => {
    startRef.current.style.left = start
      ? `${getMarkerPosition(start, frameRate, duration)}%`
      : 0
    endRef.current.style.left = end
      ? `${getMarkerPosition(end, frameRate, duration)}%`
      : '100%'
  }, [start, end, frameRate, duration])

  const mouseDownHandler = useCallback((e) => {
    dragTarget.current = e.target
  }, [])

  const mouseMoveHandler = useCallback(
    (e) => {
      if (dragTarget.current) {
        const position = getCurrentPosition(
          e,
          timelineRef.current,
          duration,
          frameRate,
        )
        dragTarget.current.style.left = `${position}%`
      }
    },
    [duration, frameRate],
  )

  return (
    <SeekerWrapper onMouseMove={mouseMoveHandler}>
      <div
        role="button"
        tabIndex="-1"
        className="timeline"
        onClick={onClick}
        ref={timelineRef}
      >
        <div className="timeline-inner" />
      </div>
      <div className="mark-holder">
        <button
          className="start-mark"
          ref={startRef}
          data-name="start"
          onMouseDown={mouseDownHandler}
        >
          <img src={startMark} alt="mark start of video" />
        </button>
        <button
          className="end-mark"
          ref={endRef}
          data-name="end"
          onMouseDown={mouseDownHandler}
        >
          <img src={endMark} alt="mark end of video" />
        </button>
      </div>
    </SeekerWrapper>
  )
}

Seeker.propTypes = {
  onClick: PropTypes.func.isRequired,
  markFrame: PropTypes.func.isRequired,
  duration: PropTypes.number,
  frameRate: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  start: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  end: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

export default Seeker
