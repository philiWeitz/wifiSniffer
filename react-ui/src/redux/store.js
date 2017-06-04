
import logger from 'redux-logger';
import { applyMiddleware, compose, createStore } from 'redux';
import { install as installReduxLoop } from 'redux-loop';

import DevTools from './devTools';
import combinedReducers from './reducers';


const middleware = [];

// add additional middleware of not production
if (process.env.NODE_ENV !== 'production') {
  middleware.push(logger);
}

const enhancer = compose(
  installReduxLoop(),
  applyMiddleware(...middleware),
  DevTools.instrument(),
);

// Create the store
const store = createStore(
  combinedReducers,
  enhancer,
);


export default store;
