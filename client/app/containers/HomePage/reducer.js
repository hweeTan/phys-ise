/*
 *
 * LanguageProvider reducer
 *
 */

import { fromJS } from 'immutable';

import {
  UPLOAD_DOCUMENT_SUCCESS,
  UPLOAD_DOCUMENT_FAIL,
  SET_LOADING,
} from './constants';

const initialState = fromJS({
  url: '',
  errMeg: '',
  hasLoading: false,
});

function homePageReducer(state = initialState, action) {
  switch (action.type) {
    case UPLOAD_DOCUMENT_SUCCESS:
      return state.set('url', action.url);

    case UPLOAD_DOCUMENT_FAIL:
      return state.set('errMeg', action.error);

    case SET_LOADING:
      return state.set('hasLoading', !state.get('hasLoading'));

    default:
      return state;
  }
}

export default homePageReducer;
