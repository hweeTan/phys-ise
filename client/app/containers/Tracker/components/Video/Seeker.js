import React from 'react';
import PropTypes from 'prop-types';
import { round } from 'lodash';

import { getOffset } from 'utils/helpers';
import startMark from 'images/start-mark.png';
import endMark from 'images/end-mark.png';

import SeekerWrapper from './SeekerWrapper';

const getFrameNumber = (left, duration, frameRate) => round(left * duration * frameRate);

const getCurrentPosition = (e, target, duration, frameRate) => {
  const boundingRect = getOffset(target);
  const leftOffset = e.offsetX || (e.pageX - boundingRect.left);
  const left = leftOffset / target.offsetWidth;

  const percentage = getFrameNumber(left, duration, frameRate) / frameRate / duration;

  if (percentage > 1) {
    return 100;
  } else if (percentage < 0) {
    return 0;
  }

  return percentage * 100;
};

class Seeker extends React.Component {
  constructor(props) {
    super(props);
    this.dragTarget = null;
  }

  componentDidMount() {
    document.addEventListener('mouseup', this.mouseUpHandler, false);
  }

  componentWillReceiveProps(nextProps) {
    const { start, end } = nextProps;

    if (start !== this.props.start) {
      this.start.style.left = start ? `${this.getMarkerPosition(start)}%` : 0;
    }

    if (end !== this.props.end) {
      this.end.style.left = end ? `${this.getMarkerPosition(end)}%` : '100%';
    }
  }

  getMarkerPosition = (frameNumber) => {
    const { frameRate, duration } = this.props;
    return frameNumber / frameRate / duration * 100;
  }

  mouseDownHandler = (e) => {
    this.dragTarget = e.target;
  }

  mouseMoveHandler = (e) => {
    if (this.dragTarget) {
      const { duration, frameRate } = this.props;
      const position = getCurrentPosition(e, this.timeline, duration, frameRate);
      this.dragTarget.style.left = `${position}%`;
    }
  }

  mouseUpHandler = () => {
    if (this.dragTarget) {
      const { duration, frameRate } = this.props;
      const name = this.dragTarget.getAttribute('data-name');

      const targetLeft = getOffset(this.dragTarget).left;
      const timeLineTeft = getOffset(this.timeline).left;
      const resultLeft = targetLeft - timeLineTeft;

      const timeLineWidth = this.timeline.offsetWidth;
      const ratio = resultLeft / timeLineWidth;

      const frame = getFrameNumber(ratio, duration, frameRate);
      const finalFrame = name === 'start' ? frame + 1 : frame;

      this.props.markFrame(name, finalFrame, 2);
      this.dragTarget = null;
    }
  }

  render() {
    const { onClick } = this.props;

    return (
      <SeekerWrapper onMouseMove={this.mouseMoveHandler}>
        <div
          role="button"
          tabIndex="-1"
          className="timeline"
          onClick={onClick}
          ref={(node) => { this.timeline = node; }}
        >
          <div className="timeline-inner" />
        </div>
        <div className="mark-holder">
          <button
            className="start-mark"
            ref={(node) => { this.start = node; }}
            data-name="start"
            onMouseDown={this.mouseDownHandler}
          >
            <img src={startMark} alt="mark start of video" />
          </button>
          <button
            className="end-mark"
            ref={(node) => { this.end = node; }}
            data-name="end"
            onMouseDown={this.mouseDownHandler}
          >
            <img src={endMark} alt="mark end of video" />
          </button>
        </div>
      </SeekerWrapper>
    );
  }
}

Seeker.propTypes = {
  onClick: PropTypes.func.isRequired,
  markFrame: PropTypes.func.isRequired,
  duration: PropTypes.number,
  frameRate: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  start: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  end: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};

export default Seeker;
