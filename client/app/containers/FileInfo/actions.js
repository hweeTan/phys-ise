import {
  SET_FILE,
  TOGGLE_MODAL,
  SET_LIST_FILE,
} from './constants';

export function setFileInfo(mssv, filename) {
  return {
    type: SET_FILE,
    mssv,
    filename,
  };
}

export function toggleModal(modal) {
  return {
    type: TOGGLE_MODAL,
    modal,
  };
}

export function listFile(files) {
  return {
    type: SET_LIST_FILE,
    files,
  };
}
