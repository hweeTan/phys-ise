import {
  CHANGE_VIDEO,
  CHANGE_FRAMERATE,
  MARK_FRAME,
  TOGGLE_ANALYZE,
  RESET,
} from './constants';

export function changeVideo(link) {
  return {
    type: CHANGE_VIDEO,
    link,
  };
}

export function changeFrameRate(value) {
  return {
    type: CHANGE_FRAMERATE,
    value,
  };
}

export function markFrame(name, value) {
  return {
    type: MARK_FRAME,
    name,
    value,
  };
}

export function toggleAnalyze() {
  return {
    type: TOGGLE_ANALYZE,
  };
}

export function resetTracker(state) {
  return {
    type: RESET,
    state,
  };
}
