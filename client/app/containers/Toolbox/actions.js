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

export function toggleForce() {
  return {
    type: TOGGLE_FORCE,
  };
}

export function updateTool(tool, name, value) {
  return {
    type: UPDATE_TOOL,
    tool,
    name,
    value,
  };
}

export function changeTool(name) {
  return {
    type: CHANGE_TOOL,
    name,
  };
}

export function updatePoint(id, frame, x, y) {
  return {
    type: UPDATE_POINT,
    id,
    frame,
    x,
    y,
  };
}

export function updatePointValue(id, name, value) {
  return {
    type: UPDATE_POINT_VALUE,
    id,
    name,
    value,
  };
}

export function updateVector(setId, value) {
  return {
    type: UPDATE_VECTOR,
    setId,
    value,
  };
}

export function updateVectorValue(setId, name, value) {
  return {
    type: UPDATE_VECTOR_VALUE,
    setId,
    name,
    value,
  };
}

export function resetToolbox(state) {
  return {
    type: RESET,
    state,
  };
}
