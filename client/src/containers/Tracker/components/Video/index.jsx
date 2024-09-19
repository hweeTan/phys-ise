import { forwardRef, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { padStart, ceil, map } from 'lodash'

import { getOffset } from 'src/utils/helpers'
import Select from 'src/components/Select'
import zoomLevels from 'src/settings/zoomLevels'

import PlayButton from './PlayButton'
import Seeker from './Seeker'
import VideoWrapper from './VideoWrapper'
import FrameControl from './FrameControl'

const getCurrentTimeRatio = (e) => {
  const boundingRect = getOffset(e.target)
  const leftOffset = e.offsetX || e.pageX - boundingRect.left
  return leftOffset / e.target.offsetWidth
}

const Video = forwardRef(
  (
    { start, end, frameRate = 25, redraw, setZoom, markFrame, src = '' },
    videoRef,
  ) => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [duration, setDuration] = useState(0)

    const wrapperRef = useRef(null)
    const timelineRef = useRef(null)
    const frameInputRef = useRef(null)

    useEffect(() => {
      timelineRef.current = wrapperRef.current.querySelector('.timeline-inner')
      frameInputRef.current = wrapperRef.current.querySelector('#frame-input')

      videoRef.current.addEventListener('loadedmetadata', () => {
        setDuration(videoRef.current.duration)
      })
    }, [videoRef])

    const onChangeFrame = (frameNumber) => {
      videoRef.current.currentTime = ceil(frameNumber / frameRate, 2)
    }

    const onPlay = () => {
      setIsPlaying(true)

      window.requestAnimationFrame(step)
    }

    const onPause = () => {
      setIsPlaying(false)
    }

    const onSeekerClick = (e) => {
      videoRef.current.pause()
      const currentTime = getCurrentTimeRatio(e)
      videoRef.current.currentTime = currentTime * videoRef.current.duration
    }

    const onTimeUpdate = () => {
      if (videoRef.current.paused) {
        step()
      }
    }

    const onNextFrame = () => {
      onChangeFrame(parseInt(frameInputRef.current.value, 10) + 1)
    }

    const onPrevFrame = () => {
      onChangeFrame(parseInt(frameInputRef.current.value, 10) - 1)
    }

    const getProgress = () => {
      return (videoRef.current.currentTime * 100) / videoRef.current.duration
    }

    const play = () => {
      const currentTime = videoRef.current.currentTime

      const startTime = start / frameRate
      const endTime = end / frameRate
      if (
        (start && currentTime < startTime) ||
        (end && currentTime > endTime)
      ) {
        videoRef.current.currentTime = startTime
      }

      videoRef.current.play()
    }

    const pause = () => videoRef.current.pause()

    const step = () => {
      const currentTime = videoRef.current.currentTime

      redraw()

      timelineRef.current.style.width = `${getProgress()}%`

      const frameNumber = Math.floor(currentTime * frameRate)
      frameInputRef.current.value = padStart(frameNumber, 3, '0')

      if (end) {
        const endTime = end / frameRate

        if (currentTime >= endTime) {
          videoRef.current.pause()
        }
      }

      if (!videoRef.current.paused && !videoRef.current.ended) {
        window.requestAnimationFrame(step)
      }
    }

    return (
      <VideoWrapper ref={wrapperRef}>
        <video
          className="real-video"
          ref={videoRef}
          src={src}
          controls
          muted
          type="video/mp4"
          onPlay={onPlay}
          onPause={onPause}
          onSeeked={onTimeUpdate}
        />
        <div className="control">
          <PlayButton
            isPlaying={isPlaying}
            onClickPlay={play}
            onClickPause={pause}
          />
          <Seeker
            onClick={onSeekerClick}
            duration={duration}
            markFrame={markFrame}
            frameRate={frameRate}
            start={start}
            end={end}
          />
          <FrameControl
            onChangeFrame={onChangeFrame}
            onNextFrame={onNextFrame}
            onPrevFrame={onPrevFrame}
          />
          <Select id="video-zoom" onChange={(e) => setZoom(e.target.value)}>
            {map(zoomLevels, (level, index) => (
              <option key={index} value={level.value}>
                {level.text}
              </option>
            ))}
          </Select>
        </div>
      </VideoWrapper>
    )
  },
)

Video.displayName = 'Video'

Video.propTypes = {
  src: PropTypes.string,
  frameRate: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  redraw: PropTypes.func.isRequired,
  setZoom: PropTypes.func.isRequired,
  markFrame: PropTypes.func.isRequired,
  start: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  end: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

export default Video
