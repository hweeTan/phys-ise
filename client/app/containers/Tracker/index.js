import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { isEqual, forEach } from 'lodash';

import constants from 'settings/constants';
import { getOffset, isTouchDevice } from 'utils/helpers';
import { baseLog } from 'utils/number';
import makeSelectToolbox, { makeSelectCollision } from 'containers/Toolbox/selectors';
import { updateTool, updatePoint, updateVector, toggleForce } from 'containers/Toolbox/actions';
import poster from 'images/poster.png';

import TrackerWrapper from './styled-components/TrackerWrapper';
import { radToDeg } from './utils/angle';
import { trackTransforms } from './utils/canvas';
import CollisionPanel from './components/CollisionPanel';
import Video from './components/Video';
import Ruler from './components/Canvas/Ruler';
import Axis from './components/Canvas/Axis';
import Point from './components/Canvas/Point';
import Collision from './components/Canvas/Collision';
import makeSelectTracker from './selectors';
import { markFrame } from './actions';

export class Tracker extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.isTrackerInit = false;
    this.dragstart = null;
    this.dragged = false;
    this.zoomLevel = 1;
    this.isTouchDevice = isTouchDevice();
  }

  componentDidMount() {
    if (this.props.Tracker.video) {
      this.initTracker();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.isTrackerInit) {
      if (!isEqual(nextProps.Toolbox.ruler, this.props.Toolbox.ruler)) {
        this.ruler.updatePaths(nextProps.Toolbox.ruler);
        this.redraw();
      } else if (!isEqual(nextProps.Toolbox.axis, this.props.Toolbox.axis)) {
        this.axis.updatePaths(nextProps.Toolbox.axis);
        this.redraw();
      } else if (!isEqual(nextProps.Toolbox.point, this.props.Toolbox.point)) {
        this.point.updatePaths(nextProps.Toolbox.point);
        this.redraw();
      }

      if (!isEqual(nextProps.collision, this.props.collision)) {
        this.collision.updatePaths(nextProps.collision);
        this.redraw();
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.Tracker.video !== prevProps.Tracker.video) {
      this.initTracker();
    }
  }

  onCanvasClick = (e) => {
    const { point } = this.props.Toolbox;

    if (point.trackMode) {
      this.setlastPosition(e);

      const pt = this.ctx.transformedPoint(this.lastX, this.lastY);

      const { currentPoint } = point;
      this.props.updatePointPosition(currentPoint, this.video.getFrameNumber(), pt.x, pt.y);
      setTimeout(this.video.onNextFrame, 10);
    }
  }

  onCanvasDown = (e) => {
    // document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';
    this.setlastPosition(e);

    const { ruler, axis } = this.props.Toolbox;

    const overRuler = ruler.on && this.ruler.checkMouse(this.lastX, this.lastY);
    const overAxis = axis.on && this.axis.checkMouse(this.lastX, this.lastY);
    const overCollision = this.collision.checkMouse(this.lastX, this.lastY);

    const pt = this.ctx.transformedPoint(this.lastX, this.lastY);

    if (!(overRuler || overAxis || overCollision)) {
      this.dragStart = pt;
      this.dragged = false;
    }

    if (overRuler) {
      this.ruler.setDrag(overRuler);
    }

    if (overAxis) {
      this.axis.setDrag(overAxis);
    }

    if (overCollision) {
      this.collision.setDrag(overCollision);
    }
  }

  onCanvasMove = (e) => {
    this.setlastPosition(e);
    this.dragged = true;

    const pt = this.ctx.transformedPoint(this.lastX, this.lastY);

    if (this.dragStart) {
      this.moveHandler(pt.x, pt.y, this.ctx);
      this.moveHandler(pt.x, pt.y, this.videoCtx);
      this.redraw();
    } else if (this.ruler.getDrag()) {
      this.dragRuler(pt);
    } else if (this.axis.getDrag()) {
      this.dragAxis(pt);
    } else if (this.collision.getDrag()) {
      this.dragCollision(pt);
    }
  }

  onCanvasUp = () => {
    this.dragStart = null;

    if (this.ruler.getDrag()) {
      this.ruler.setDrag('');

      const paths = this.ruler.getPaths();
      forEach(paths, (path, key) => {
        this.props.updateCurrentTool('ruler', key, path);
      });
    }

    if (this.axis.getDrag()) {
      this.axis.setDrag('');

      const paths = this.axis.getPaths();
      forEach(paths, (path, key) => {
        const value = key === 'angle' ? radToDeg(path) : path;
        this.props.updateCurrentTool('axis', key, value);
      });
    }

    if (this.collision.getDrag()) {
      this.collision.setDrag('');

      const paths = this.collision.getPaths();
      forEach(paths, (path, key) => {
        const value = {
          x: path.origin.x,
          y: path.origin.y,
          x1: path.point1.x,
          y1: path.point1.y,
          x2: path.point2.x,
          y2: path.point2.y,
        };
        this.props.updateVectorValue(key, value);
      });
    }
  }

  onCanvasWheel = (e) => {
    const delta = e.deltaY ? e.deltaY / 100 : 0;

    if (delta) {
      this.zoom(delta);
    }

    return e.preventDefault() && false;
  }

  setlastPosition = (e) => {
    const boundingRect = getOffset(this.canvas);

    if (e.touches) {
      const touch = e.touches[0];
      this.lastX = touch.pageX - boundingRect.left;
      this.lastY = touch.pageY - boundingRect.top;
    } else {
      this.lastX = e.offsetX || (e.pageX - boundingRect.left);
      this.lastY = e.offsetY || (e.pageY - boundingRect.top);
    }
  }

  setZoom = (desiredLevel) => {
    const isZoomIn = desiredLevel > this.zoomLevel;
    const factor = isZoomIn ? constants.SCALE_FACTOR : constants.SCALE_FACTOR ** (-1);
    const levelToZoom = baseLog(factor, desiredLevel / this.zoomLevel);

    this.zoom(isZoomIn ? levelToZoom : -levelToZoom);
  }

  initTracker = () => {
    this.lastX = this.canvas.width / 2;
    this.lastY = this.canvas.height / 2;
    this.ctx = this.canvas.getContext('2d');
    this.videoCtx = this.videoLayer.getContext('2d');
    trackTransforms(this.ctx);
    trackTransforms(this.videoCtx);

    this.videoElement = this.video.getVideo();

    const {
      ruler,
      axis,
      point,
      collision: {
        mode,
        zoom,
      },
    } = this.props.Toolbox;
    const { collision } = this.props;
    this.ruler = new Ruler(this.canvas, this.ctx, ruler);
    this.axis = new Axis(this.canvas, this.ctx, axis);
    this.point = new Point(this.canvas, this.ctx, point);
    this.collision = new Collision(this.canvas, this.ctx, collision, mode, zoom);

    this.videoElement.addEventListener('canplay', () => {
      const videoRatio = this.videoElement.clientWidth / this.videoElement.clientHeight;
      const videoHeight = this.canvas.width / videoRatio;

      this.videoPosition = {
        x: 0,
        y: (this.canvas.height - videoHeight) / 2,
        width: this.canvas.width,
        height: videoHeight,
      };

      this.redraw();
    });

    this.canvas.addEventListener('mousewheel', this.onCanvasWheel, { passive: false });

    this.isTrackerInit = true;
  }

  zoom = (level) => {
    const factor = constants.SCALE_FACTOR ** level;
    this.zoomLevel *= factor;

    const pt = this.ctx.transformedPoint(this.lastX, this.lastY);
    this.zoomHandler(factor, pt.x, pt.y, this.ctx);
    this.zoomHandler(factor, pt.x, pt.y, this.videoCtx);
    this.redraw();
  }

  zoomHandler = (factor, x, y, ctx) => {
    ctx.translate(x, y);
    ctx.scale(factor, factor);
    ctx.translate(-x, -y);
  }

  dragAxis = (pos) => {
    this.axis.startDrag(pos.x, pos.y);
    this.redraw();
  }

  dragRuler = (pos) => {
    this.ruler.startDrag(pos.x, pos.y);
    this.redraw();
  }

  dragCollision = (pos) => {
    this.collision.startDrag(pos.x, pos.y);
    this.redraw();
  }

  moveHandler = (x, y, ctx) => {
    ctx.translate(x - this.dragStart.x, y - this.dragStart.y);
  }

  redraw = () => {
    this.redrawTool();
    this.redrawVideo();
  }

  redrawTool = () => {
    this.beforeDraw(this.ctx);

    this.ruler.draw();
    this.axis.draw();
    this.point.draw();
    this.collision.draw();
  }

  redrawVideo = () => {
    this.beforeDraw(this.videoCtx);

    const { x, y, width, height } = this.videoPosition;
    this.videoCtx.drawImage(this.videoElement, x, y, width, height);
  }

  beforeDraw = (ctx) => {
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = '#000';
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.restore();
  }

  render() {
    const { frameRate, video, start, end, analyzeMode } = this.props.Tracker;
    const { point, collision: collisionTool } = this.props.Toolbox;
    const { markFrameEnds, collision, toggleForceVector } = this.props;
    if (!video) {
      return (
        <TrackerWrapper>
          <img
            className="error"
            src={poster}
            alt="thi nghiệm tương tác trên màn hình"
          />
        </TrackerWrapper>
      );
    }

    return (
      <TrackerWrapper>
        <canvas
          className={`video-canvas ${analyzeMode ? 'hidden' : ''}`}
          width="830"
          height="570"
          ref={(node) => { this.videoLayer = node; }}
        />
        <canvas
          className="tool-canvas"
          ref={(node) => { this.canvas = node; }}
          width="830"
          height="570"
          onMouseDown={this.onCanvasDown}
          onMouseMove={this.onCanvasMove}
          onMouseUp={this.onCanvasUp}
          onClick={this.onCanvasClick}
          // onWheel={this.onCanvasWheel} commented due to passive event
          onTouchStart={this.onCanvasDown}
          onTouchMove={this.onCanvasMove}
          onTouchEnd={this.onCanvasUp}
        />
        <Video
          ref={(node) => { this.video = node; }}
          src={video}
          frameRate={parseFloat(frameRate)}
          redraw={this.redrawVideo}
          setZoom={this.setZoom}
          markFrame={markFrameEnds}
          start={start}
          end={end}
        />
        {analyzeMode &&
          <CollisionPanel
            {...collision}
            pointData={point.data}
            collisionTool={collisionTool}
            toggleForce={toggleForceVector}
          />
        }
      </TrackerWrapper>
    );
  }
}

Tracker.propTypes = {
  updateVectorValue: PropTypes.func.isRequired,
  updateCurrentTool: PropTypes.func.isRequired,
  updatePointPosition: PropTypes.func.isRequired,
  Toolbox: PropTypes.object.isRequired,
  Tracker: PropTypes.object.isRequired,
  markFrameEnds: PropTypes.func.isRequired,
  collision: PropTypes.object.isRequired,
  toggleForceVector: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  Tracker: makeSelectTracker(),
  Toolbox: makeSelectToolbox(),
  collision: makeSelectCollision(),
});

function mapDispatchToProps(dispatch) {
  return {
    updateVectorValue: (setId, value) => dispatch(updateVector(setId, value)),
    updateCurrentTool: (tool, name, value) => dispatch(updateTool(tool, name, value)),
    updatePointPosition: (id, frame, x, y) => dispatch(updatePoint(id, frame, x, y)),
    markFrameEnds: (name, value) => dispatch(markFrame(name, value)),
    toggleForceVector: () => dispatch(toggleForce()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Tracker);
