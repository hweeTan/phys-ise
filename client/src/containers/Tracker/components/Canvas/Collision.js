import { assign, forEach, set, get } from 'lodash'

import colors from 'src/styles/colors'
import vars from 'src/styles/variables'
import { shadeColor } from '../../../../utils/helpers'

import Base from './Base'

class Collsion extends Base {
  defaultSettings = {
    size: 10,
    lineWidth: 2,
  }

  constructor(canvas, context, options, mode, zoom) {
    super(canvas, context)
    this.ctx = context
    this.mode = mode
    this.zoom = zoom

    const { set1, set2 } = options.data
    this.paths = {
      set1: {
        on: set1.on,
        origin: {
          x: set1.loc.x,
          y: set1.loc.y,
          label: 'p',
        },
        point1: {
          x: set1.loc.x1,
          y: set1.loc.y1,
          p: set1.p1,
          color: set1.color1,
          label: 'p1',
        },
        point2: {
          x: set1.loc.x2,
          y: set1.loc.y2,
          p: set1.p2,
          color: set2.color2,
          label: 'p2',
        },
      },
      set2: {
        on: set2.on,
        origin: {
          x: set2.loc.x,
          y: set2.loc.y,
          label: "p'",
        },
        point1: {
          x: set2.loc.x1,
          y: set2.loc.y1,
          p: set2.p1,
          color: set2.color1,
          label: "p'1",
        },
        point2: {
          x: set2.loc.x2,
          y: set2.loc.y2,
          p: set2.p2,
          color: set2.color2,
          label: "p'2",
        },
      },
    }

    this.settings = assign({}, this.defaultSettings, options)
  }

  getPaths = () => this.paths

  checkMouse = (x, y) => {
    const { set1, set2 } = this.paths

    this.ctx.save()
    let currentPath = ''
    this.transformFunc(set1.origin)
    forEach(this.set1, (path, key) => {
      if (this.checkMousePosition(x, y, path)) {
        currentPath = key
        return false
      }

      return true
    })

    this.ctx.restore()
    if (currentPath) {
      return `set1.${currentPath}`
    }

    this.ctx.save()
    currentPath = ''
    this.transformFunc(set2.origin)
    forEach(this.set2, (path, key) => {
      if (this.checkMousePosition(x, y, path)) {
        currentPath = key
        return false
      }

      return true
    })

    this.ctx.restore()
    return currentPath ? `set2.${currentPath}` : ''
  }

  setDrag = (end) => {
    this.isDragging = end
  }

  getDrag = () => this.isDragging

  startDrag = (x, y) => {
    if (this.isDragging) {
      const draggingArray = this.isDragging.split('.')

      if (draggingArray[1] === 'origin') {
        const path1 = `${draggingArray[0]}.point1`
        const path2 = `${draggingArray[0]}.point2`

        const origin = get(this.paths, `${draggingArray[0]}.origin`)
        const originMovedBy = {
          x: x - origin.x,
          y: y - origin.y,
        }
        const point1 = get(this.paths, path1)
        const point2 = get(this.paths, path2)

        const transformedPoint1 = {
          ...point1,
          x: point1.x + originMovedBy.x,
          y: point1.y + originMovedBy.y,
        }
        const transformedPoint2 = {
          ...point2,
          x: point2.x + originMovedBy.x,
          y: point2.y + originMovedBy.y,
        }

        set(this.paths, path1, transformedPoint1)
        set(this.paths, path2, transformedPoint2)
      }

      set(this.paths, `${this.isDragging}.x`, x)
      set(this.paths, `${this.isDragging}.y`, y)
    }
  }

  updatePaths = (options) => {
    const { set1, set2 } = options.data

    this.mode = options.mode
    this.zoom = options.zoom
    set(this.paths, 'set1.on', set1.on)
    set(this.paths, 'set2.on', set2.on)

    if (this.mode === 'p') {
      set(this.paths, 'set1.point1.color', set1.color1)
      set(this.paths, 'set1.point2.color', set1.color2)
      set(this.paths, 'set1.point1.p', set1.p1)
      set(this.paths, 'set1.point2.p', set1.p2)

      set(this.paths, 'set2.point1.color', set2.color1)
      set(this.paths, 'set2.point2.color', set2.color2)
      set(this.paths, 'set2.point1.p', set2.p1)
      set(this.paths, 'set2.point2.p', set2.p2)
    } else if (this.mode === 'F' || this.mode === 'v') {
      set(this.paths, 'set1.point1.v', set1.v1)
      set(this.paths, 'set1.point2.v', set1.v2)
      set(this.paths, 'set1.point1.color', set1.color)
      set(this.paths, 'set1.point2.color', set1.color)
      set(this.paths, 'set1.origin.m', set1.m)

      set(this.paths, 'set2.point1.v', set2.v1)
      set(this.paths, 'set2.point2.v', set2.v2)
      set(this.paths, 'set2.point1.color', set2.color)
      set(this.paths, 'set2.point2.color', set2.color)
      set(this.paths, 'set2.origin.m', set2.m)
    }

    this.settings = assign({}, this.settings, options)
  }

  transformFunc = (origin) => {
    this.ctx.translate(origin.x, origin.y)
  }

  transformPoint = (point, origin) => {
    const deltaX = point.x - origin.x
    const deltaY = point.y - origin.y

    const length = Math.sqrt(deltaX ** 2 + deltaY ** 2)
    let ratio = 1

    if (this.mode === 'p') {
      ratio = (point.p / length) * this.zoom
    } else if (this.mode === 'F') {
      ratio = point.v ? (point.v / length) * this.zoom : 1
    }

    return {
      x: ratio * deltaX,
      y: ratio * deltaY,
      p: point.p,
    }
  }

  getSquarePath = (x, y) => {
    const { size } = this.settings
    const half = size / 2

    return `M${x - half},${y - half}h${size}v${size}h${-size}Z`
  }

  drawSetPath = (setGroup, data) => {
    const { point1, point2, origin } = data

    this[setGroup] = {
      origin: new Path2D(this.getSquarePath(0, 0)),
      point1: new Path2D(
        this.getSquarePath(point1.x - origin.x, point1.y - origin.y),
      ),
      point2: new Path2D(
        this.getSquarePath(point2.x - origin.x, point2.y - origin.y),
      ),
    }
  }

  drawPath() {
    const { set1, set2 } = this.paths
    if (set1.on) {
      this.drawSetPath('set1', set1)
    }

    if (set2.on) {
      this.drawSetPath('set2', set2)
    }
  }

  drawVector = (pt1, pt2, color, dash, label) => {
    this.ctx.save()

    this.ctx.strokeStyle = color
    if (dash) {
      this.ctx.setLineDash([5, 5])
    }

    this.ctx.beginPath()
    this.ctx.moveTo(pt1.x, pt1.y)
    this.ctx.lineTo(pt2.x, pt2.y)
    this.ctx.stroke()
    this.ctx.closePath()

    const deltaX = pt2.x - pt1.x
    const deltaY = pt2.y - pt1.y
    const angle = Math.atan2(deltaY, deltaX)

    this.ctx.fillStyle = color
    this.drawLabel(pt1.x + deltaX / 2, pt1.y + deltaY / 2, angle, label)

    const arrow = new Path2D('M0,-1 L5,7 L-5,7 z')
    this.ctx.translate(pt2.x, pt2.y)
    this.ctx.rotate(Math.PI / 2 + angle)
    this.ctx.fill(arrow)

    this.ctx.restore()
  }

  drawLabel = (x, y, angle, label) => {
    if (label) {
      this.ctx.save()
      this.ctx.font = `20px ${vars.fontRegular}`
      this.ctx.fillText(label, x, y)
      this.ctx.restore()
    }
  }

  drawGroup = (setGroup, setName) => {
    const { color } = this.settings
    const origin = { x: 0, y: 0 }
    const point1 = this.transformPoint(setGroup.point1, setGroup.origin)
    const point2 = this.transformPoint(setGroup.point2, setGroup.origin)

    const final = {
      x: point1.x + point2.x,
      y: point1.y + point2.y,
    }

    const color1 = setGroup.point1.color
    const color2 = setGroup.point2.color

    if (this.mode === 'p') {
      this.drawVector(origin, point1, color1, false, setGroup.point1.label)
      this.drawVector(origin, point2, color2, false, setGroup.point2.label)

      this.drawVector(point1, final, color2, true)
      this.drawVector(point2, final, color1, true)

      this.drawVector(origin, final, color, false, setGroup.origin.label)
    } else if (this.mode === 'F' || this.mode === 'v') {
      this.drawVector(point1, origin, color1, false, 'v')
      this.drawVector(origin, point2, color2, false, "v'")

      this.drawVector(final, point1, color2, true)
      this.drawVector(point2, final, color1, true)

      if (this.mode === 'F') {
        const forcePoint = {
          x: final.x * setGroup.origin.m,
          y: final.y * setGroup.origin.m,
        }
        this.drawVector(origin, forcePoint, color, false, 'F')
      } else if (this.mode === 'v') {
        this.drawVector(origin, final, color, false, 'Δv')
        if (this.settings.showForce) {
          const forcePoint = {
            x: final.x / 3,
            y: final.y / 3,
          }
          this.drawVector(
            origin,
            forcePoint,
            shadeColor(color1, -20),
            false,
            setName === 'set1' ? 'F' : "F'",
          )
        }
      }
    }
  }

  drawSet = (setName, setGroup) => {
    this.ctx.save()
    this.transformFunc(setGroup.origin)
    this.drawSetPath(setName, setGroup)
    this.drawGroup(setGroup, setName)
    forEach(this[setName], (point, key) => {
      this.ctx.strokeStyle = setGroup[key].color
      this.ctx.stroke(point)
    })
    this.ctx.restore()
  }

  draw() {
    const { lineWidth } = this.settings
    const { set1, set2 } = this.paths

    this.ctx.save()
    this.ctx.lineWidth = lineWidth
    this.ctx.strokeStyle = colors.pink

    if (set1.on) {
      this.drawSet('set1', set1)
    }

    if (set2.on) {
      this.drawSet('set2', set2)
    }

    this.ctx.restore()
  }
}

export default Collsion
