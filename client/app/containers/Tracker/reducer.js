import { fromJS } from 'immutable';

import {
  CHANGE_VIDEO,
  CHANGE_FRAMERATE,
  MARK_FRAME,
  TOGGLE_ANALYZE,
  RESET,
} from './constants';

const initialState = fromJS({
  frameRate: 25,
  video: '',
  start: null,
  end: null,
  analyzeMode: false,
});

function trackerReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_VIDEO:
      return state
        .set('video', action.link)
        .set('start', null)
        .set('end', null)
      ;

    case MARK_FRAME:
      return state.set(action.name, action.value);

    case CHANGE_FRAMERATE:
      return state.set('frameRate', action.value);

    case TOGGLE_ANALYZE:
      return state.update('analyzeMode', (prev) => !prev);

    case RESET:
      return action.state ? fromJS(action.state) : initialState;

    default:
      return state;
  }
}

export default trackerReducer;
