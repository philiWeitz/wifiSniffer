
import _ from 'lodash';
import Immutable from 'immutable';

import { FETCH_DEVICES_START } from './AppReducer';

const AppContainer = {

  mapProsToAppView: (state) => {
    return {
      devices: Immutable.List(_.sortBy(state.app.devices.toArray(), 'mac', 'mcuId')),
    };
  },

  mapDispatchToAppView: (dispatch) => {
    return {
      fetchDevices: () => {
        dispatch(FETCH_DEVICES_START());
      },
    };
  },

};

export default AppContainer;
