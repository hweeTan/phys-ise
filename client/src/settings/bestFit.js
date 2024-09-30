import { drawLine, drawParabol } from 'src/utils/drawBestFit'

export default {
  linear: {
    name: 'linear',
    label: 'Ax + B',
    coefficients: 2,
    labels: ['A', 'B'],
    auto: drawLine,
  },
  parabol: {
    name: 'parabol',
    label: 'Ax^2 + Bx + C',
    coefficients: 3,
    labels: ['A', 'B', 'C'],
    auto: drawParabol,
  },
  cosine: {
    name: 'cosine',
    label: 'Acos(ωt + φ) + B',
    coefficients: 4,
    labels: ['A', 'ω', 'φ', 'B'],
  },
  sine: {
    name: 'sine',
    label: '-ωAsin(ωt + φ) + B',
    coefficients: 4,
    labels: ['A', 'ω', 'φ', 'B'],
  },
}
