
import { callApi } from './api';

const ApiAction = {

  fetchDevices: (successAction, errorAction) => {
    return callApi('/devices').then(successAction, errorAction);
  },

};

export default ApiAction;
