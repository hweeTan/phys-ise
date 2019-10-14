import { createStore } from 'redux';
import { fromJS } from 'immutable';

import createReducer from './reducers';

export default createStore(
  createReducer(),
  fromJS({}),
);
