import { assign } from 'lodash'

import colors from 'src/styles/colors'

import Base from './Base'

class Ruler extends Base {
  defaultSettings = {
    size: 10,
    color: colors.blue,
    lineWidth: 2,
  }

  constructor(canvas, context, options) {
    super(canvas, context)
    this.ctx = context
    this.end1 = null
    this.end2 = null

    this.paths = {
      x1: options.x1,
      y1: options.y1,
      x2: options.x2,
      y2: options.y2,
    }

    this.settings = assign({}, this.defaultSettings, options)

    this.isHover = ''

    this.isDragging = ''
  }

  getPaths = () => this.paths

  setDrag = (end) => {
    this.isDragging = end
  }

  getDrag = () => this.isDragging

  checkMouse = (x, y) => {
    if (this.checkMousePosition(x, y, this.end1)) {
      this.isHover = 'end1'
    } else if (this.checkMousePosition(x, y, this.end2)) {
      this.isHover = 'end2'
    } else {
      this.isHover = ''
    }

    return this.isHover
  }

  startDrag = (x, y) => {
    if (this.isDragging === 'end1') {
      this.paths.x1 = x
      this.paths.y1 = y
    } else if (this.isDragging === 'end2') {
      this.paths.x2 = x
      this.paths.y2 = y
    }
  }

  updatePaths = (options) => {
    this.paths = {
      x1: options.x1,
      y1: options.y1,
      x2: options.x2,
      y2: options.y2,
    }

    this.settings = assign({}, this.settings, options)
  }

  drawPath() {
    const { x1, y1, x2, y2 } = this.paths
    const { size } = this.settings
    const halfSize = size / 2

    this.end1 = new Path2D()
    this.end1.rect(x1 - halfSize, y1 - halfSize, size, size)

    this.end2 = new Path2D()
    this.end2.rect(x2 - halfSize, y2 - halfSize, size, size)
  }

  draw() {
    if (this.settings.on) {
      const { color, lineWidth } = this.settings

      this.ctx.save()
      this.ctx.strokeStyle = color
      this.ctx.lineWidth = lineWidth

      this.ctx.beginPath()
      this.ctx.moveTo(this.paths.x1, this.paths.y1)
      this.ctx.lineTo(this.paths.x2, this.paths.y2)
      this.ctx.stroke()
      this.ctx.closePath()

      this.drawPath()
      this.ctx.stroke(this.end1)
      this.ctx.stroke(this.end2)

      this.ctx.restore()
    }
  }
}

export default Ruler
