import React from 'react';
import PropTypes from 'prop-types';
import { padStart, ceil, map } from 'lodash';

import { getOffset } from 'utils/helpers';
import Select from 'components/Select';
import zoomLevels from 'settings/zoomLevels';

import PlayButton from './PlayButton';
import Seeker from './Seeker';
import VideoWrapper from './VideoWrapper';
import FrameControl from './FrameControl';

const getCurrentTimeRatio = (e) => {
  const boundingRect = getOffset(e.target);
  const leftOffset = e.offsetX || (e.pageX - boundingRect.left);
  return leftOffset / e.target.offsetWidth;
};

export class Video extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
      // currentFrame: 0,
      duration: 0,
    };
  }

  componentDidMount() {
    this.timeline = this.wrapper.querySelector('.timeline-inner');
    this.frameInput = this.wrapper.querySelector('#frame-input');

    this.video.addEventListener('loadedmetadata', () => {
      this.setState({ duration: this.video.duration });
    });
  }

  onChangeFrame = (frameNumber) => {
    this.video.currentTime = ceil(frameNumber / this.props.frameRate, 2);
  }

  onPlay = () => {
    this.setState({
      isPlaying: true,
    });

    window.requestAnimationFrame(this.step);
  }

  onPause = () => {
    this.setState({
      isPlaying: false,
    });
  }

  onSeekerClick = (e) => {
    this.video.pause();
    const currentTime = getCurrentTimeRatio(e);
    this.video.currentTime = currentTime * this.video.duration;
  }

  onTimeUpdate = () => {
    if (this.video.paused) {
      this.step();
    }
  }

  onNextFrame = () => {
    this.onChangeFrame(parseInt(this.frameInput.value, 10) + 1);
  }

  onPrevFrame = () => {
    this.onChangeFrame(parseInt(this.frameInput.value, 10) - 1);
  }

  getProgress = () => {
    const { video } = this;
    return video.currentTime * 100 / video.duration;
  }

  getVideo = () => this.video

  getFrameNumber = () => parseInt(this.frameInput.value, 10)

  play = () => {
    const { start, end, frameRate } = this.props;
    const currentTime = this.video.currentTime;

    const startTime = start / frameRate;
    const endTime = end / frameRate;
    if ((start && currentTime < startTime) || (end && currentTime > endTime)) {
      this.video.currentTime = startTime;
    }

    this.video.play();
  }

  pause = () => this.video.pause()

  step = () => {
    const { end, frameRate, redraw } = this.props;
    const currentTime = this.video.currentTime;

    redraw();

    this.timeline.style.width = `${this.getProgress()}%`;

    const frameNumber = Math.floor(currentTime * frameRate);
    // this.setState({ currentFrame: frameNumber });
    this.frameInput.value = padStart(frameNumber, 3, '0');

    if (end) {
      const endTime = end / frameRate;

      if (currentTime >= endTime) {
        this.video.pause();
      }
    }

    if (!this.video.paused && !this.video.ended) {
      window.requestAnimationFrame(this.step);
    }
  }

  render() {
    const { isPlaying, duration } = this.state;
    const { src, setZoom, markFrame, start, end, frameRate } = this.props;

    return (
      <VideoWrapper innerRef={(node) => { this.wrapper = node; }}>
        <video
          className="real-video"
          ref={(node) => { this.video = node; }}
          src={src}
          controls
          muted
          type="video/mp4"
          onPlay={this.onPlay}
          onPause={this.onPause}
          onSeeked={this.onTimeUpdate}
        />
        <div className="control">
          <PlayButton
            isPlaying={isPlaying}
            onClickPlay={this.play}
            onClickPause={this.pause}
          />
          <Seeker
            onClick={this.onSeekerClick}
            duration={duration}
            markFrame={markFrame}
            frameRate={frameRate}
            start={start}
            end={end}
          />
          <FrameControl
            onChangeFrame={this.onChangeFrame}
            onNextFrame={this.onNextFrame}
            onPrevFrame={this.onPrevFrame}
          />
          <Select
            id="video-zoom"
            onChange={(e) => setZoom(e.target.value)}
          >
            {map(zoomLevels, (level, index) => (
              <option
                key={index}
                value={level.value}
              >
                {level.text}
              </option>
            ))}
          </Select>
        </div>
      </VideoWrapper>
    );
  }
}

Video.propTypes = {
  src: PropTypes.string,
  frameRate: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  redraw: PropTypes.func.isRequired,
  setZoom: PropTypes.func.isRequired,
  markFrame: PropTypes.func.isRequired,
  start: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  end: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};

Video.defaultProps = {
  src: '',
  frameRate: 25,
};

export default Video;
