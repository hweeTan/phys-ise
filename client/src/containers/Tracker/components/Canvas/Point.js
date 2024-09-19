import { cloneDeep, assign, keys } from 'lodash'

import colors from 'src/styles/colors'

import Base from './Base'

class Point extends Base {
  defaultSettings = {
    size: 10,
    color: {
      1: colors.pink,
      2: colors.blue,
      3: colors.green,
    },
    lineWidth: 2,
  }

  constructor(canvas, context, options) {
    super(canvas)
    this.ctx = context
    this.points = {}

    this.settings = assign({}, this.defaultSettings, options)

    this.options = cloneDeep(options)

    this.currentPoint = this.options.currentPoint

    this.paths = this.options.data

    this.isHover = ''

    this.isDragging = ''
  }

  getPaths = () => this.paths

  setDrag = (end) => {
    this.isDragging = end
  }

  getDrag = () => this.isDragging

  updatePaths = (options) => {
    const { data } = options
    this.paths = cloneDeep(options.data)
    this.settings.data = data
  }

  drawPath() {
    const { size, data, lineWidth } = this.settings
    const halfSize = size / 2

    keys(this.paths).forEach((key) => {
      if (data[key].on) {
        this.ctx.strokeStyle = data[key].color
        this.ctx.lineWidth = lineWidth

        keys(this.paths[key].points).forEach((frame) => {
          if (!this.points[key]) {
            this.points[key] = {}
          }
          this.points[key][frame] = new Path2D()
          const { x, y } = this.paths[key].points[frame]

          this.points[key][frame].moveTo(x, y - halfSize)
          this.points[key][frame].lineTo(x + halfSize, y)
          this.points[key][frame].lineTo(x, y + halfSize)
          this.points[key][frame].lineTo(x - halfSize, y)
          this.points[key][frame].closePath()

          this.ctx.stroke(this.points[key][frame])
        })
      }
    })
  }

  draw() {
    this.ctx.save()
    this.drawPath()
    this.ctx.restore()
  }
}

export default Point
