
import _ from 'lodash';

const intervalIds = {};

const intervalUtil = {

  FETCH_DEVICES: 'FETCH_DEVICES_INTERVAL',

  addInterval: (key, func, interval, initialCall = true) => {
    if (!(key in intervalIds)) {
      if (initialCall) {
        func();
      }
      intervalIds[key] = setInterval(func, interval);
    }
  },

  cancelInterval: (key) => {
    if (!(key in intervalIds)) {
      clearInterval(intervalIds[key]);
    }
  },

  cancelAllIntervals: () => {
    _(intervalIds).values().map(intervalId => {
      return clearInterval(intervalId);
    });
  },

};

export default intervalUtil;
