import {
  UPLOAD_DOCUMENT_SUCCESS,
  UPLOAD_DOCUMENT_FAIL,
  SET_LOADING,
} from './constants';

export function uploadSuccess({ url }) {
  return {
    type: UPLOAD_DOCUMENT_SUCCESS,
    url,
  };
}

export function uploadFail(error) {
  return {
    type: UPLOAD_DOCUMENT_FAIL,
    error,
  };
}
export function setLoading() {
  return {
    type: SET_LOADING,
  };
}
