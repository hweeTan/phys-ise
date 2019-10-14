import { createSelector } from 'reselect';
import { mapValues, isNull, reduce } from 'lodash';

import { selectFrameRate, selectStartEnd } from 'containers/Tracker/selectors';

import { getScaleRatio, getLength } from './utils/helpers';
import Formulas from './utils/formulas';

const selectToolboxDomain = () => (state) => state.get('toolbox');

const selectCurrentTool = () => (state) => state.getIn(['toolbox', 'currentTool']);

const makeSelectCollision = () => createSelector(
  selectToolboxDomain(),
  selectFrameRate(),
  (substate, frameRate) => {
    const pointData = substate.getIn(['point', 'data']).toJS();
    const collisionData = substate.get('collision').toJS();
    const { time, data, startTime, endTime, mode } = collisionData;
    const startDuration = (time - startTime) / frameRate;
    const endDuration = (endTime - time) / frameRate;

    const rulerData = substate.get('ruler').toJS();

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    let xform = svg.createSVGMatrix();

    const scale = getScaleRatio(rulerData);

    xform = xform
      .scaleNonUniform(scale, -scale)
      .inverse();

    const result = mapValues(data, (set, key) => {
      if (!set.on) {
        return set;
      }

      const { loc } = set;

      const pt = svg.createSVGPoint();
      pt.x = loc.x;
      pt.y = loc.y;
      const origin = pt.matrixTransform(xform);

      pt.x = loc.x1;
      pt.y = loc.y1;
      const point1 = pt.matrixTransform(xform);

      pt.x = loc.x2;
      pt.y = loc.y2;
      const point2 = pt.matrixTransform(xform);

      const m1 = pointData['1'].mass;
      const m2 = pointData['2'].mass;

      if (mode === 'p') {
        const t = key === 'set1' ? startDuration : endDuration;
        const v1 = getLength(origin, point1) / t;
        const v2 = getLength(origin, point2) / t;

        const vx1 = (point1.x - origin.x) / t;
        const vy1 = (point1.y - origin.y) / t;

        const px1 = m1 * vx1;
        const py1 = m1 * vy1;

        const vx2 = (point2.x - origin.x) / t;
        const vy2 = (point2.y - origin.y) / t;

        const px2 = m2 * vx2;
        const py2 = m2 * vy2;

        const p = Math.sqrt((px1 + px2) ** 2 + (py1 + py2) ** 2);
        const E1 = 0.5 * m1 * v1 ** 2;
        const E2 = 0.5 * m2 * v2 ** 2;

        return {
          ...set,
          m1,
          m2,
          v1,
          v2,
          p1: v1 * m1,
          p2: v2 * m2,
          p,
          color1: pointData['1'].color,
          color2: pointData['2'].color,
          E1,
          E2,
        };
      }

      const v1 = getLength(origin, point1) / startDuration;
      const v2 = getLength(origin, point2) / endDuration;
      const vx1 = (point1.x - origin.x) / startDuration;
      const vy1 = (point1.y - origin.y) / startDuration;
      const vx2 = (point2.x - origin.x) / endDuration;
      const vy2 = (point2.y - origin.y) / endDuration;

      const currentPoint = key.replace('set', '');
      const deltaV = Math.sqrt((vx1 + vx2) ** 2 + (vy1 + vy2) ** 2);
      const a = deltaV * frameRate / 2;
      const m = parseFloat(pointData[currentPoint].mass);

      return {
        ...set,
        v1,
        v2,
        deltaV,
        t: 1 / frameRate * 2,
        m,
        a,
        F: m * a,
        color: pointData[currentPoint].color,
      };
    });

    return {
      ...collisionData,
      data: result,
    };
  }
);

const makeSelectPoints = () => createSelector(
  selectToolboxDomain(),
  selectFrameRate(),
  selectStartEnd(),
  (substate, frameRate, startEnd) => {
    const { start, end } = startEnd;
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    let xform = svg.createSVGMatrix();

    const axisData = substate.get('axis').toJS();
    const rulerData = substate.get('ruler').toJS();
    const pointData = substate.getIn(['point', 'data']).toJS();

    const scale = getScaleRatio(rulerData);

    xform = xform
      .translate(axisData.x, axisData.y)
      .scaleNonUniform(scale, -scale)
      .rotate(axisData.angle)
      .inverse();

    const points = mapValues(pointData, (singlePoint) => (
      reduce(singlePoint.points, (endArray, point, key) => {
        const frameNumber = parseInt(key, 10);

        if ((!isNull(start) && frameNumber < start) || (!isNull(end) && frameNumber > end)) {
          return endArray;
        }

        const pt = svg.createSVGPoint();
        pt.x = point.x;
        pt.y = point.y;
        const transformedPt = pt.matrixTransform(xform);
        endArray.push({
          frame: key,
          pixelX: point.x,
          pixelY: point.y,
          t: frameNumber / frameRate,
          x: transformedPt.x,
          y: transformedPt.y,
          m: singlePoint.mass,
          k: singlePoint.k,
        });

        return endArray;
      }, [])
    ));

    return Formulas.calculateAll(points);
  }
);

const makeSelectToolbox = () => createSelector(
  selectToolboxDomain(),
  (substate) => substate.toJS()
);

export default makeSelectToolbox;
export {
  makeSelectPoints,
  selectToolboxDomain,
  selectCurrentTool,
  makeSelectCollision,
};
