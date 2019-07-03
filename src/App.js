import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import { AppNavigator } from 'AppNavigation';
import rootReducer from './redux/reducers';

const loggerMiddleware = createLogger()
const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);

export default class App extends Component {

  render() {

    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}