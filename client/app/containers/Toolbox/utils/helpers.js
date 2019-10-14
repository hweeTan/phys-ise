export function getScaleRatio({ x1, y1, x2, y2, length }) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx ** 2 + dy ** 2) / length;
}

export function getLength(pt1, pt2) {
  return Math.sqrt((pt2.x - pt1.x) ** 2 + (pt2.y - pt1.y) ** 2);
}
