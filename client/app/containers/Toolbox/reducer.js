import { fromJS } from 'immutable';

import colors from 'styles/colors';
import { CHANGE_VIDEO } from 'containers/Tracker/constants';

import {
  UPDATE_TOOL,
  CHANGE_TOOL,
  UPDATE_POINT,
  UPDATE_POINT_VALUE,
  UPDATE_VECTOR,
  UPDATE_VECTOR_VALUE,
  TOGGLE_FORCE,
  RESET,
} from './constants';

const initialState = fromJS({
  ruler: {
    x1: 388,
    y1: 140,
    x2: 388,
    y2: 530,
    length: 1,
    color: colors.blue,
    on: false,
  },
  axis: {
    x: 400,
    y: 530,
    angle: 0,
    color: colors.purple,
    on: false,
  },
  point: {
    currentPoint: 1,
    color: colors.green,
    trackMode: false,
    data: {
      1: {
        name: 'Vật 1',
        mass: 1,
        k: 1,
        points: {},
        color: colors.pink,
        on: true,
      },
      2: {
        name: 'Vật 2',
        mass: 2,
        k: 1,
        points: {},
        color: colors.green,
        on: true,
      },
      3: {
        name: 'Vật 3',
        mass: 3,
        k: 1,
        points: {},
        color: colors.black,
        on: true,
      },
    },
  },
  collision: {
    currentSet: 'set1',
    mode: 'p',
    time: null,
    startTime: null,
    endTime: null,
    zoom: 100,
    showForce: false,
    data: {
      set1: {
        name: 'Trước va chạm',
        loc: {
          x: 50,
          y: 50,
          x1: 100,
          y1: 50,
          x2: 50,
          y2: 100,
        },
        on: false,
      },
      set2: {
        name: 'Sau va chạm',
        loc: {
          x: 50,
          y: 200,
          x1: 100,
          y1: 200,
          x2: 50,
          y2: 250,
        },
        on: false,
      },
    },
    color: colors.gray1,
  },
  videoSettings: {
    color: colors.pink,
  },
  currentTool: 'videoSettings',
});

function toolboxReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_TOOL:
      return state.set('currentTool', action.name);

    case UPDATE_TOOL:
      return state.setIn([action.tool, action.name], action.value);

    case UPDATE_POINT:
      return state.setIn(['point', 'data', `${action.id}`, 'points', `${action.frame}`], fromJS({ x: action.x, y: action.y }));

    case UPDATE_POINT_VALUE:
      return state.setIn(['point', 'data', `${action.id}`, action.name], action.value);

    case UPDATE_VECTOR:
      return state.updateIn(['collision', 'data', action.setId, 'loc'], (prev) => prev.merge(fromJS(action.value)));

    case UPDATE_VECTOR_VALUE:
      return state.setIn(['collision', 'data', action.setId, action.name], action.value);

    case RESET:
      return action.state ? fromJS(action.state) : initialState;

    case CHANGE_VIDEO:
      return initialState;

    case TOGGLE_FORCE:
      return state.updateIn(['collision', 'showForce'], (prevVal) => !prevVal);

    default:
      return state;
  }
}

export default toolboxReducer;
