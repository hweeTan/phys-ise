import { fromJS } from 'immutable';
import { isArray } from 'lodash';
import {
  CHANGE_TYPE_INFO,
  RESET,
} from './constants';

const initialState = fromJS({
  window1: {
    type: 'table',
    currentPoint: 1,
    x: 't',
    y: 'x',
    domainXfrom: 0,
    domainXto: 0,
    domainYfrom: 0,
    domainYto: 0,
    tableCol: ['t', 'x', 'y', 'v', 'a'],
    isSettings: false,
    isFullscreen: false,
    bestFit: '',
    coefficients: [],
  },
  window2: {
    type: 'graph',
    currentPoint: 1,
    x: 't',
    y: 'y',
    tableCol: ['t', 'x', 'y', 'v', 'a'],
    isSettings: false,
    isFullscreen: false,
    bestFit: '',
    coefficients: [],
  },
});

function windowsReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_TYPE_INFO:
      if (action.tp === 'coefficients') {
        if (!isArray(action.value)) {
          const { index, value } = action.value;
          return state.setIn([action.name, action.tp, index], value);
        }

        return state.setIn([action.name, action.tp], fromJS(action.value));
      }
      return state.setIn([action.name, action.tp], action.value);

    case RESET:
      return action.state ? fromJS(action.state) : initialState;

    default:
      return state;
  }
}

export default windowsReducer;
