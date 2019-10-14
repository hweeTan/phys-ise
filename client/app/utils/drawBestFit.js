import { map } from 'lodash';

export function sum(array) {
  return array.reduce((a, b) => a + b, 0);
}

function sumPow(array, n) {
  return array.reduce((a, b) => a + b ** n, 0);
}

function sumXY(dataChart, n, m) {
  return dataChart.reduce((a, b) => a + b.x ** n * b.y ** m, 0);
}

export function drawLine(dataChart) {
  const length = dataChart.length;
  const arrX = map(dataChart, 'x');
  const arr = map(dataChart, 'y');
  const sumX = sum(arrX);
  const sumY = sum(arr);
  const totalXY = sumXY(dataChart, 1, 1);
  const mX = sumX / arrX.length;
  const mY = sumY / arrX.length;
  const variX = arrX.reduce((a, b) => a + (b - mX) ** 2, 0) / (length - 1);
  const variY = arr.reduce((a, b) => a + (b - mY) ** 2, 0) / (length - 1);
  const stanDeviX = Math.sqrt(variX);
  const stanDeviY = Math.sqrt(variY);
  const r = (totalXY - length * mX * mY) / ((length - 1) * stanDeviX * stanDeviY);
  const a = r * stanDeviY / stanDeviX;
  const b = mY - a * mX;
  return [a, b];
}
export function drawParabol(dataChart) {
  const lng = dataChart.length;
  const arrX = map(dataChart, 'x');
  const arr = map(dataChart, 'y');
  const sumX = sum(arrX);
  const sumY = sum(arr);
  const sumX2 = sumPow(arrX, 2);
  const sumX3 = sumPow(arrX, 3);
  const sumX4 = sumPow(arrX, 4);
  const totalXY = sumXY(dataChart, 1, 1);
  const sumX2Y = sumXY(dataChart, 2, 1);
  const D = (lng * sumX2 * sumX4 + 2 * sumX * sumX2 * sumX3) - (lng * sumX3 ** 2 + sumX4 * sumX ** 2 + sumX2 ** 3);
  const a = ((sumX * sumX3 * sumX2Y + sumX2 * sumX3 * totalXY + sumY * sumX2 * sumX4) - (sumX * sumX4 * totalXY + sumX2Y * sumX2 ** 2 + sumY * sumX3 ** 2)) / D;
  const b = ((lng * sumX4 * totalXY + sumX2 * sumX * sumX2Y + sumY * sumX3 * sumX2) - (lng * sumX3 * sumX2Y + totalXY * sumX2 ** 2 + sumY * sumX * sumX4)) / D;
  const c = ((lng * sumX2 * sumX2Y + sumX * sumX2 * totalXY + sumY * sumX * sumX3) - (lng * sumX3 * totalXY + sumX2Y * sumX ** 2 + sumY * sumX2 ** 2)) / D;
  return [c, b, a];
}
