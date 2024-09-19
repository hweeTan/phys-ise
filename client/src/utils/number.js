import { round, isNull, maxBy, minBy } from 'lodash'

export const roundNum = (num) => (isNull(num) ? '' : round(num, 3))

export const baseLog = (x, y) => Math.log(y) / Math.log(x)

export const minMax = (points) => {
  const maxX = maxBy(points, (pt) => pt.x)
  const minX = minBy(points, (pt) => pt.x)
  const maxY = maxBy(points, (pt) => pt.y)
  const minY = minBy(points, (pt) => pt.y)

  return {
    x: {
      max: maxX,
      min: minX,
    },
    y: {
      max: maxY,
      min: minY,
    },
  }
}
