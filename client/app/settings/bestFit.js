import { drawLine, drawParabol } from 'utils/drawBestFit';

export default {
  linear: {
    name: 'bậc 1',
    label: 'Ax + B',
    coefficients: 2,
    labels: ['A', 'B'],
    auto: drawLine,
  },
  parabol: {
    name: 'bậc 2',
    label: 'Ax^2 + Bx + C',
    coefficients: 3,
    labels: ['A', 'B', 'C'],
    auto: drawParabol,
  },
  cosine: {
    name: 'hàm cos',
    label: 'Acos(ωt + φ) + B',
    coefficients: 4,
    labels: ['A', 'ω', 'φ', 'B'],
  },
  sine: {
    name: 'hàm sin',
    label: '-ωAsin(ωt + φ) + B',
    coefficients: 4,
    labels: ['A', 'ω', 'φ', 'B'],
  },
};
