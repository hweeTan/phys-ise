import { combineReducers } from 'redux-immutable';

import fileInfo from 'containers/FileInfo/reducer';
import windows from 'containers/Windows/reducer';
import toolbox from 'containers/Toolbox/reducer';
import tracker from 'containers/Tracker/reducer';
import homePage from 'containers/HomePage/reducer';

export default function createReducer() {
  return combineReducers({
    fileInfo,
    windows,
    toolbox,
    tracker,
    homePage,
  });
}
