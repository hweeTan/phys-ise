class Base {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.ctx = context;
    this.draw = this.draw.bind(this);
    this.drawPath = this.drawPath.bind(this);
  }

  checkMousePosition = (x, y, path, transformFunc) => {
    let pointOnPath = this.ctx.isPointInPath(path, x, y);

    if (transformFunc) {
      this.ctx.save();
      transformFunc();
      pointOnPath = this.ctx.isPointInPath(path, x, y);
      this.ctx.restore();
    }

    return pointOnPath;
  }

  drawPath() {}

  draw() {}
}

export default Base;
