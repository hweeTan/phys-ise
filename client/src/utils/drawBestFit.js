export function drawLine(dataChart) {
  const n = dataChart.length

  let sumX = 0,
    sumY = 0,
    sumXY = 0,
    sumX2 = 0

  for (let i = 0; i < n; i++) {
    const { x, y } = dataChart[i]
    sumX += x
    sumY += y
    sumXY += x * y
    sumX2 += x * x
  }

  const a = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX)
  const b = (sumY - a * sumX) / n
  return [a, b]
}

export function drawParabol(dataChart) {
  const n = dataChart.length

  let sumX = 0,
    sumX2 = 0,
    sumX3 = 0,
    sumX4 = 0,
    sumY = 0,
    sumXY = 0,
    sumX2Y = 0

  for (let i = 0; i < n; i++) {
    const { x, y } = dataChart[i]
    sumX += x
    sumX2 += x * x
    sumX3 += x * x * x
    sumX4 += x * x * x * x
    sumY += y
    sumXY += x * y
    sumX2Y += x * x * y
  }

  const D =
    n * sumX2 * sumX4 +
    2 * sumX * sumX2 * sumX3 -
    (n * sumX3 ** 2 + sumX4 * sumX ** 2 + sumX2 ** 3)
  const a =
    (sumX * sumX3 * sumX2Y +
      sumX2 * sumX3 * sumXY +
      sumY * sumX2 * sumX4 -
      (sumX * sumX4 * sumXY + sumX2Y * sumX2 ** 2 + sumY * sumX3 ** 2)) /
    D
  const b =
    (n * sumX4 * sumXY +
      sumX2 * sumX * sumX2Y +
      sumY * sumX3 * sumX2 -
      (n * sumX3 * sumX2Y + sumXY * sumX2 ** 2 + sumY * sumX * sumX4)) /
    D
  const c =
    (n * sumX2 * sumX2Y +
      sumX * sumX2 * sumXY +
      sumY * sumX * sumX3 -
      (n * sumX3 * sumXY + sumX2Y * sumX ** 2 + sumY * sumX2 ** 2)) /
    D
  return [c, b, a]
}
