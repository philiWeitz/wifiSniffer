
import { combineReducers } from 'redux-loop';
import { routerReducer } from 'react-router-redux';

import AppReducer from '../modules/app/AppReducer';


const combinedReducers = combineReducers({
  app: AppReducer,
  routing: routerReducer,
});

export default combinedReducers;
