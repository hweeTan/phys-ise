import { assign } from 'lodash';

import colors from 'styles/colors';

import { degToRad } from '../../utils/angle';
import Base from './Base';

class Axis extends Base {
  defaultSettings = {
    size: 20,
    color: colors.purple,
    lineWidth: 2,
  }

  constructor(canvas, context, options) {
    super(canvas, context);
    this.ctx = context;
    this.center = null;
    this.xAxis = null;

    this.settings = assign({}, this.defaultSettings, options);

    this.paths = {
      x: options.x,
      y: options.y,
      angle: degToRad(options.angle),
    };

    this.isHover = '';

    this.isDragging = '';
  }

  getPaths = () => this.paths

  setDrag = (end) => {
    this.isDragging = end;
  }

  getDrag = () => this.isDragging;

  checkMouse = (x, y) => {
    if (this.checkMousePosition(x, y, this.center, this.transformFunc)) {
      this.isHover = 'center';
    } else if (this.checkMousePosition(x, y, this.xAxis, this.transformFunc)) {
      this.isHover = 'xAxis';
    } else {
      this.isHover = '';
    }

    return this.isHover;
  }

  startDrag = (x, y) => {
    if (this.isDragging === 'center') {
      this.paths.x = x;
      this.paths.y = y;
    } else if (this.isDragging === 'xAxis') {
      const angle = Math.atan2(y - this.paths.y, x - this.paths.x);
      this.paths.angle = angle;
    }
  }

  updatePaths = (options) => {
    this.paths = {
      x: options.x,
      y: options.y,
      angle: degToRad(options.angle),
    };

    this.settings = assign({}, this.settings, options);
  }

  transformFunc = () => {
    const { x, y, angle } = this.paths;
    this.ctx.translate(x, y);
    this.ctx.rotate(angle);
  }

  drawPath() {
    const { size } = this.settings;
    const halfSize = size / 2;

    this.xAxis = new Path2D();
    this.xAxis.rect(-999, -halfSize, 9999, size);

    this.center = new Path2D();
    this.center.rect(-halfSize, -halfSize, size, size);
  }

  draw() {
    if (this.settings.on) {
      const { x, y, angle } = this.paths;
      const { color, lineWidth, size } = this.settings;
      const halfSize = size / 2;

      this.ctx.save();

      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = lineWidth;

      this.ctx.beginPath();

      this.ctx.translate(x, y);
      this.ctx.rotate(angle);

      this.drawPath();

      this.ctx.moveTo(-999, 0);
      this.ctx.lineTo(999, 0);

      this.ctx.moveTo(0, -999);
      this.ctx.lineTo(0, 999);

      this.ctx.moveTo(size, -halfSize);
      this.ctx.lineTo(size, halfSize);

      this.ctx.stroke();

      this.ctx.restore();
    }
  }
}

export default Axis;
