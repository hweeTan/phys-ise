import {
  CHANGE_TYPE_INFO,
  RESET,
} from './constants';

export function changeType(name, tp, value, extra) {
  return {
    type: CHANGE_TYPE_INFO,
    name,
    tp,
    value,
    extra,
  };
}

export function resetWindows(state) {
  return {
    type: RESET,
    state,
  };
}
