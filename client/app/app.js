import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'sanitize.css/sanitize.css';

import HomePage from 'containers/HomePage';

import '!file-loader?name=[name].[ext]!./favicon.ico';

import store from './store';
import './global-styles';

export function getStore() {
  return store;
}

ReactDOM.render(
  <Provider store={store}>
    <HomePage />
  </Provider>,
  document.getElementById('app')
);
