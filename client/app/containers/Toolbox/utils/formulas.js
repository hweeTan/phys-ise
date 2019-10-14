import { map, forEach, isUndefined, mapValues } from 'lodash';

import physics from 'settings/physics';

const velocity = (axis) => (pt1, pt2) => {
  if (isUndefined(pt1) || isUndefined(pt2)) {
    return null;
  }

  return {
    v: (pt2[axis] - pt1[axis]) / (pt2.t - pt1.t),
    t: (pt2.t + pt1.t) / 2,
  };
};

const acceleration = (axis) => (pt1, pt2, pt3) => {
  if (isUndefined(pt1) || isUndefined(pt2) || isUndefined(pt3)) {
    return null;
  }

  const v1 = velocity(axis)(pt1, pt2);
  const v2 = velocity(axis)(pt2, pt3);

  if (v1 && v2) {
    return {
      a: (v2.v - v1.v) / (v2.t - v1.t),
      t: pt2.t,
    };
  }

  return null;
};


const momentum = (axis) => (pt1, pt2) => {
  const v = velocity(axis)(pt1, pt2);
  return v ? v.v * pt1.m : null;
};

const getV = (axis) => (pt1, pt2) => {
  if (!axis) {
    const vx = velocity('x')(pt1, pt2);
    const vy = velocity('y')(pt1, pt2);
    return vx && vy ? Math.sqrt(vx.v ** 2 + vy.v ** 2) : null;
  }

  const v = velocity(axis)(pt1, pt2);
  return v ? v.v : null;
};

const getA = (axis) => (pt1, pt2, pt3) => {
  if (!axis) {
    const ax = acceleration('x')(pt1, pt2, pt3);
    const ay = acceleration('y')(pt1, pt2, pt3);
    return ax && ay ? Math.sqrt(ax.a ** 2 + ay.a ** 2) : null;
  }

  const a = acceleration(axis)(pt1, pt2, pt3);
  return a ? a.a : null;
};

const getF = () => (pt1, pt2, pt3) => {
  const a = getA()(pt1, pt2, pt3);
  return a ? a * pt2.m : null;
};

const getP = (axis) => (pt1, pt2) => {
  if (!axis) {
    const px = momentum('x')(pt1, pt2);
    const py = momentum('y')(pt1, pt2);
    return px && py ? Math.sqrt(px ** 2 + py ** 2) : null;
  }

  const p = momentum(axis)(pt1, pt2);
  return p;
};

const getEp = () => (pt) => pt.y * pt.m * physics.g;

const getEk = () => (pt1, pt2) => {
  const v = getV()(pt1, pt2);
  return v ? v ** 2 * pt1.m / 2 : null;
};

const getE = () => (pt1, pt2, pt3) => {
  if (isUndefined(pt1) || isUndefined(pt2) || isUndefined(pt3)) {
    return null;
  }

  const ep = pt2.Ep || getEp()(pt2);
  const ek = pt2.Ek || getEk()(pt1, pt3);
  return ep + ek;
};

const getE2 = () => (pt1, pt2, pt3) => {
  if (isUndefined(pt1) || isUndefined(pt2) || isUndefined(pt3)) {
    return null;
  }

  const ep = pt2.Wdh || getWdh()(pt2);
  const ek = pt2.Ek || getEk()(pt1, pt3);
  return ep + ek;
};

const getAngle = () => (pt1, pt2) => {
  if (isUndefined(pt1) || isUndefined(pt2)) {
    return null;
  }

  const deltaY = pt2.y - pt1.y;
  const deltaX = pt2.x - pt1.x;
  const angle = Math.atan2(deltaY, deltaX);
  return angle * 180 / Math.PI;
};

const getWdh = () => (pt) => (pt.x ** 2 * pt.k) / 2;

class Formulas {
  constructor() {
    this.formulas = [
      {
        id: 'vx',
        func: getV('x'),
        params: 2,
      },
      {
        id: 'vy',
        func: getV('y'),
        params: 2,
      },
      {
        id: 'v',
        func: getV(),
        params: 2,
      },
      {
        id: 'ax',
        func: getA('x'),
        params: 3,
      },
      {
        id: 'ay',
        func: getA('y'),
        params: 3,
      },
      {
        id: 'a',
        func: getA(),
        params: 3,
      },
      {
        id: 'F',
        func: getF(),
        params: 3,
      },
      {
        id: 'px',
        func: getP('x'),
        params: 2,
      },
      {
        id: 'py',
        func: getP('y'),
        params: 2,
      },
      {
        id: 'p',
        func: getP(),
        params: 2,
      },
      {
        id: 'Ep',
        func: getEp(),
        params: 1,
      },
      {
        id: 'Ek',
        func: getEk(),
        params: 2,
      },
      {
        id: 'Wdh',
        func: getWdh(),
        params: 1,
      },
      {
        id: 'E',
        func: getE(),
        params: 3,
      },
      {
        id: 'E2',
        func: getE2(),
        params: 3,
      },
      {
        id: 'angle',
        func: getAngle(),
        params: 2,
      },
    ];
  }

  calculate = (type) => (...args) => (
    this.formulas[type](...args)
  )

  calculatePoint = (pointData) => {
    if (!pointData.length) {
      return pointData;
    }

    const result = map(pointData, (item, index) => {
      const newItem = { ...item };

      forEach(this.formulas, ({ id, func, params }) => {
        let args;

        switch (params) {
          case 2:
            args = [pointData[index - 1], pointData[index + 1]];
            break;
          case 3:
            args = [
              pointData[index - 2],
              pointData[index],
              pointData[index + 2],
            ];
            break;
          default:
            args = [pointData[index]];
            break;
        }

        newItem[id] = func(...args);
      });

      return newItem;
    });

    return result;
  }

  calculateAll = (allPoints) => (
    mapValues(allPoints, (pointData) => this.calculatePoint(pointData))
  )
}

export default new Formulas();
