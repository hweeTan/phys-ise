import { useRef, useEffect, useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { forEach, ceil } from 'lodash'

import constants from 'src/settings/constants'
import { getOffset } from 'src/utils/helpers'
import { baseLog } from 'src/utils/number'
import poster from 'src/images/poster.jpg'

import {
  useCalculatedCollision,
  useRuler,
  useAxis,
  usePoint,
  useCollision,
} from 'src/containers/Toolbox/selectors'
import {
  ToggleForce,
  UpdateTool,
  UpdatePoint,
  UpdateVector,
} from 'src/containers/Toolbox/reducer'

import TrackerWrapper from './styled-components/TrackerWrapper'
import { radToDeg } from './utils/angle'
import { trackTransforms } from './utils/canvas'
import CollisionPanel from './components/CollisionPanel'
import Video from './components/Video'
import Ruler from './components/Canvas/Ruler'
import Axis from './components/Canvas/Axis'
import Point from './components/Canvas/Point'
import Collision from './components/Canvas/Collision'
import { useTracker } from './selectors'
import { MarkFrame } from './reducer'

const zoomHandler = (factor, x, y, ctx) => {
  ctx.translate(x, y)
  ctx.scale(factor, factor)
  ctx.translate(-x, -y)
}

export const Tracker = () => {
  const [isTrackerInit, setIsTrackerInit] = useState(false)
  const dispatch = useDispatch()
  const { frameRate, video, start, end, analyzeMode } = useTracker()
  const pointTool = usePoint()
  const rulerTool = useRuler()
  const axisTool = useAxis()
  const collisionTool = useCollision()
  const collisionData = useCalculatedCollision()

  const markFrameEnds = (name, value) => dispatch(MarkFrame({ name, value }))
  const toggleForceVector = () => dispatch(ToggleForce())
  const updatePointPosition = (id, frame, x, y) =>
    dispatch(UpdatePoint({ id, frame, x, y }))
  const updateVectorValue = (setId, value) =>
    dispatch(UpdateVector({ setId, value }))
  const updateCurrentTool = (tool, name, value) =>
    dispatch(UpdateTool({ tool, name, value }))

  const dragstart = useRef(null)
  const dragged = useRef(false)
  const zoomLevel = useRef(1)

  const videoRef = useRef(null)
  const videoLayerRef = useRef(null)
  const canvasRef = useRef(null)

  const lastX = useRef(0)
  const lastY = useRef(0)
  const ctx = useRef(null)
  const videoCtx = useRef(null)
  const videoPosition = useRef(null)

  const ruler = useRef(null)
  const axis = useRef(null)
  const point = useRef(null)
  const collision = useRef(null)

  const beforeDraw = useCallback((ctx) => {
    ctx.save()
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.fillStyle = '#000'
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    ctx.restore()
  }, [])

  const redrawTool = useCallback(() => {
    beforeDraw(ctx.current)

    ruler.current.draw()
    axis.current.draw()
    point.current.draw()
    collision.current.draw()
  }, [beforeDraw])

  const redrawVideo = useCallback(() => {
    beforeDraw(videoCtx.current)

    if (videoPosition.current) {
      const { x, y, width, height } = videoPosition.current
      videoCtx.current.drawImage(videoRef.current, x, y, width, height)
    }
  }, [beforeDraw])

  const redraw = useCallback(() => {
    redrawTool()
    redrawVideo()
  }, [redrawTool, redrawVideo])

  useEffect(() => {
    if (video) {
      initTracker()
    }
  }, [video])

  useEffect(() => {
    if (isTrackerInit) {
      ruler.current.updatePaths(rulerTool)
      redraw()
    }
  }, [rulerTool, isTrackerInit, redraw])

  useEffect(() => {
    if (isTrackerInit) {
      axis.current.updatePaths(axisTool)
      redraw()
    }
  }, [axisTool, isTrackerInit, redraw])

  useEffect(() => {
    if (isTrackerInit) {
      point.current.updatePaths(pointTool)
      redraw()
    }
  }, [pointTool, isTrackerInit, redraw])

  useEffect(() => {
    if (isTrackerInit) {
      collision.current.updatePaths(collisionTool)
      redraw()
    }
  }, [collisionTool, isTrackerInit, redraw])

  const onCanvasClick = (e) => {
    const point = pointTool

    if (point.trackMode) {
      setlastPosition(e)

      const pt = ctx.current.transformedPoint(lastX.current, lastY.current)

      const { currentPoint } = point
      const currentFrame = Number(document.querySelector('#frame-input').value)

      updatePointPosition(currentPoint, currentFrame, pt.x, pt.y)

      setTimeout(() => {
        videoRef.current.currentTime = ceil((currentFrame + 1) / frameRate, 2)
      }, 10)
    }
  }

  const onCanvasDown = (e) => {
    setlastPosition(e)

    const overRuler =
      rulerTool.on && ruler.current.checkMouse(lastX.current, lastY.current)
    const overAxis =
      axisTool.on && axis.current.checkMouse(lastX.current, lastY.current)
    const overCollision = collision.current.checkMouse(
      lastX.current,
      lastY.current,
    )

    const pt = ctx.current.transformedPoint(lastX.current, lastY.current)

    if (!(overRuler || overAxis || overCollision)) {
      dragstart.current = pt
      dragged.current = false
    }

    if (overRuler) {
      ruler.current.setDrag(overRuler)
    }

    if (overAxis) {
      axis.current.setDrag(overAxis)
    }

    if (overCollision) {
      collision.current.setDrag(overCollision)
    }
  }

  const onCanvasMove = (e) => {
    setlastPosition(e)
    dragged.current = true

    const pt = ctx.current.transformedPoint(lastX.current, lastY.current)

    if (dragstart.current) {
      moveHandler(pt.x, pt.y, ctx.current)
      moveHandler(pt.x, pt.y, videoCtx.current)
      redraw()
    } else if (ruler.current.getDrag()) {
      dragRuler(pt)
    } else if (axis.current.getDrag()) {
      dragAxis(pt)
    } else if (collision.current.getDrag()) {
      dragCollision(pt)
    }
  }

  const onCanvasUp = () => {
    dragstart.current = null

    if (ruler.current.getDrag()) {
      ruler.current.setDrag('')

      const paths = ruler.current.getPaths()
      forEach(paths, (path, key) => {
        updateCurrentTool('ruler', key, path)
      })
    }

    if (axis.current.getDrag()) {
      axis.current.setDrag('')

      const paths = axis.current.getPaths()
      forEach(paths, (path, key) => {
        const value = key === 'angle' ? radToDeg(path) : path
        updateCurrentTool('axis', key, value)
      })
    }

    if (collision.current.getDrag()) {
      collision.current.setDrag('')

      const paths = collision.current.getPaths()
      forEach(paths, (path, key) => {
        const value = {
          x: path.origin.x,
          y: path.origin.y,
          x1: path.point1.x,
          y1: path.point1.y,
          x2: path.point2.x,
          y2: path.point2.y,
        }
        updateVectorValue(key, value)
      })
    }
  }

  const onCanvasWheel = (e) => {
    const delta = e.deltaY ? e.deltaY / 100 : 0

    if (delta) {
      zoom(delta)
    }

    return e.preventDefault() && false
  }

  const setlastPosition = (e) => {
    const boundingRect = getOffset(canvasRef.current)

    if (e.touches) {
      const touch = e.touches[0]
      lastX.current = touch.pageX - boundingRect.left
      lastY.current = touch.pageY - boundingRect.top
    } else {
      lastX.current = e.offsetX || e.pageX - boundingRect.left
      lastY.current = e.offsetY || e.pageY - boundingRect.top
    }
  }

  const setZoom = (desiredLevel) => {
    const isZoomIn = desiredLevel > zoomLevel.current
    const factor = isZoomIn
      ? constants.SCALE_FACTOR
      : constants.SCALE_FACTOR ** -1
    const levelToZoom = baseLog(factor, desiredLevel / zoomLevel.current)

    zoom(isZoomIn ? levelToZoom : -levelToZoom)
  }

  const initTracker = () => {
    lastX.current = canvasRef.current.width / 2
    lastY.current = canvasRef.current.height / 2
    ctx.current = canvasRef.current.getContext('2d')
    videoCtx.current = videoLayerRef.current.getContext('2d')
    trackTransforms(ctx.current)
    trackTransforms(videoCtx.current)

    ruler.current = new Ruler(canvasRef.current, ctx.current, rulerTool)
    axis.current = new Axis(canvasRef.current, ctx.current, axisTool)
    point.current = new Point(canvasRef.current, ctx.current, pointTool)
    collision.current = new Collision(
      canvasRef.current,
      ctx.current,
      collisionData,
      collisionTool.mode,
      collisionTool.zoom,
    )

    videoRef.current.addEventListener('canplay', () => {
      const videoRatio =
        videoRef.current.clientWidth / videoRef.current.clientHeight
      const videoHeight = canvasRef.current.width / videoRatio

      videoPosition.current = {
        x: 0,
        y: (canvasRef.current.height - videoHeight) / 2,
        width: canvasRef.current.width,
        height: videoHeight,
      }

      redraw()
    })

    canvasRef.current.addEventListener('mousewheel', onCanvasWheel, {
      passive: false,
    })

    setIsTrackerInit(true)
  }

  const zoom = (level) => {
    const factor = constants.SCALE_FACTOR ** level
    zoomLevel.current *= factor

    const pt = ctx.current.transformedPoint(lastX.current, lastY.current)
    zoomHandler(factor, pt.x, pt.y, ctx.current)
    zoomHandler(factor, pt.x, pt.y, videoCtx.current)
    redraw()
  }

  const dragAxis = useCallback(
    (pos) => {
      axis.current.startDrag(pos.x, pos.y)
      redraw()
    },
    [redraw],
  )

  const dragRuler = useCallback(
    (pos) => {
      ruler.current.startDrag(pos.x, pos.y)
      redraw()
    },
    [redraw],
  )

  const dragCollision = useCallback(
    (pos) => {
      collision.current.startDrag(pos.x, pos.y)
      redraw()
    },
    [redraw],
  )

  const moveHandler = useCallback((x, y, ctx) => {
    ctx.translate(x - dragstart.current.x, y - dragstart.current.y)
  }, [])

  if (!video) {
    return (
      <TrackerWrapper>
        <img
          className="error"
          src={poster}
          alt="thi nghiệm tương tác trên màn hình"
        />
      </TrackerWrapper>
    )
  }

  return (
    <TrackerWrapper>
      <canvas
        className={`video-canvas ${analyzeMode ? 'hidden' : ''}`}
        width="830"
        height="570"
        ref={videoLayerRef}
      />
      <canvas
        className="tool-canvas"
        ref={canvasRef}
        width="830"
        height="570"
        onMouseDown={onCanvasDown}
        onMouseMove={onCanvasMove}
        onMouseUp={onCanvasUp}
        onClick={onCanvasClick}
        onTouchStart={onCanvasDown}
        onTouchMove={onCanvasMove}
        onTouchEnd={onCanvasUp}
      />
      <Video
        ref={videoRef}
        src={video}
        frameRate={parseFloat(frameRate)}
        redraw={redrawVideo}
        setZoom={setZoom}
        markFrame={markFrameEnds}
        start={start}
        end={end}
      />
      {analyzeMode && (
        <CollisionPanel
          {...collision}
          pointData={pointTool.data}
          collisionTool={collisionTool}
          toggleForce={toggleForceVector}
        />
      )}
    </TrackerWrapper>
  )
}
