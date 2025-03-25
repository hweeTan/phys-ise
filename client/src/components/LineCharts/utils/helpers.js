import { isNull } from 'lodash'

const linear = (data, coef) =>
  data.map(({ x, y }) => ({
    x,
    y,
    bestfitY: coef[0] * x + coef[1],
  }))

const parabol = (data, coef) =>
  data.map(({ x, y }) => ({
    x,
    y,
    bestfitY: coef[0] * x ** 2 + coef[1] * x + coef[2],
  }))

const cosine = (data, coef) =>
  data.map(({ x, y }) => ({
    x,
    y,
    bestfitY: coef[0] * Math.cos(coef[1] * x + coef[2]) + coef[3],
  }))

const sine = (data, coef) =>
  data.map(({ x, y }) => ({
    x,
    y,
    bestfitY:
      coef[1] * -1 * coef[0] * Math.cos(coef[1] * x + coef[2]) + coef[3],
  }))

const funcMapping = {
  linear,
  parabol,
  cosine,
  sine,
}

export const normalizeData = (points, x, y) => {
  const values = points.map((point) => ({
    x: point[x],
    y: point[y],
  }))

  const final = values.filter((item) => !isNull(item.x) && !isNull(item.y))

  return final
}

export const getChartData = (points, x, y, bestFit, coefficients) => {
  const values = normalizeData(points, x, y)

  if (values.length < 3) {
    return null
  }

  let result = values.slice()

  if (bestFit && coefficients.length) {
    result = funcMapping[bestFit](result, coefficients)
  }

  return result
}
