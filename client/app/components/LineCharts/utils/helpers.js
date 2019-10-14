import { filter, isNull, map, last, first } from 'lodash';

const linear = (data, coef) => {
  const x1 = first(data).x;
  const x2 = last(data).x;

  return [{
    x: x1,
    y: coef[0] * x1 + coef[1],
  }, {
    x: x2,
    y: coef[0] * x2 + coef[1],
  }];
};

const parabol = (data, coef) => map(data, ({ x }) => ({
  x,
  y: coef[0] * x ** 2 + coef[1] * x + coef[2],
}));

const cosine = (data, coef) => map(data, ({ x }) => ({
  x,
  y: coef[0] * Math.cos(coef[1] * x + coef[2]) + coef[3],
}));

const sine = (data, coef) => map(data, ({ x }) => ({
  x,
  y: coef[1] * (-1) * coef[0] * Math.cos(coef[1] * x + coef[2]) + coef[3],
}));

const funcMapping = {
  linear,
  parabol,
  cosine,
  sine,
};

export const normalizeData = (points, x, y, domains) => {
  const values = points.map((point) => ({
    x: point[x],
    y: point[y],
  }));

  const final = filter(values, (item) => !isNull(item.x) && !isNull(item.y));

  const { xfrom, yfrom, xto, yto } = domains;
  if (xfrom || yfrom || xto || yto) {
    const scaledFinal = filter(final, (value) => {
      const { x: valueX, y: valueY } = value;
      const fromX = xfrom ? valueX >= xfrom : true;
      const toX = xto ? valueX <= xto : true;
      const fromY = yfrom ? valueY >= yfrom : true;
      const toY = yto ? valueY <= yto : true;
      return fromX && toX && fromY && toY;
    });

    return scaledFinal;
  }

  return final;
};

export const getChartData = (points, x, y, bestFit, coefficients, domains) => {
  const values = normalizeData(points, x, y, domains);

  if (values.length < 3) {
    return null;
  }

  const result = [{
    name: 'data',
    values: values.map((value) => ({
      x: value.x,
      y: value.y,
    })),
  }];

  if (bestFit && coefficients.length) {
    result.push({
      name: 'bestFit',
      values: funcMapping[bestFit](values, coefficients),
    });
  }

  const { xfrom, yfrom, xto, yto } = domains;
  if (xfrom || yfrom || xto || yto) {
    result.push({
      name: 'domains',
      values: [
        {
          x: xfrom || 0,
          y: yfrom || 0,
        },
        {
          x: xto || 0,
          y: yto || 0,
        },
      ],
    });
  }

  return result;
};
