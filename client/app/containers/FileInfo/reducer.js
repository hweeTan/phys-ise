import { fromJS } from 'immutable';
import {
  SET_FILE,
  TOGGLE_MODAL,
  SET_LIST_FILE,
} from './constants';

const initialState = fromJS({
  mssv: '',
  filename: '',
  openFile: false,
  saveFile: false,
  listVideo: false,
  listFile: [],
});

function fileInfoReducer(state = initialState, action) {
  switch (action.type) {
    case SET_FILE:
      return state.set('filename', action.filename);

    case TOGGLE_MODAL:
      return state.update(action.modal, (prev) => !prev);

    case SET_LIST_FILE:
      return state.set('listFile', action.files);

    default:
      return state;
  }
}

export default fileInfoReducer;
