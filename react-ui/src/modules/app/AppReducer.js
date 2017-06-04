
import Immutable from 'immutable';
import { loop, Effects } from 'redux-loop';
import { handleActions, createAction } from 'redux-actions';

import Device from '../../model/Device';
import ApiAction from '../../api/apiAction';

export const FETCH_DEVICES_START = createAction('FETCH_DEVICES_START');
export const FETCH_DEVICES_DONE = createAction('FETCH_DEVICES_DONE');
export const FETCH_DEVICES_ERROR = createAction('FETCH_DEVICES_ERROR');


// Initial state
const AppStateRecord = Immutable.Record({
  statusCode: 0,
  devices: Immutable.List([]),
});

const initialState = new AppStateRecord();

const AppReducer = handleActions({

  [FETCH_DEVICES_START]: (state) => loop(
    state,
    Effects.promise(ApiAction.fetchDevices, FETCH_DEVICES_DONE, FETCH_DEVICES_ERROR),
  ),

  [FETCH_DEVICES_DONE]: (state, action) => state.merge({
    statusCode: 200,
    devices: Immutable.List(action.payload.map(Device.build)),
  }),

  [FETCH_DEVICES_ERROR]: (state, action) => state.merge({
    statusCode: action.payload.statusCode ? action.payload.statusCode : 400,
  }),

}, initialState);

export default AppReducer;
