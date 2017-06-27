
import _ from 'lodash';
import Device from '../model/Device';

const DEVICE_TIMEOUT = 30 * 1000;

const wifiDevices = {};


function cleanUpClients() {
  _.forIn(wifiDevices, (val, key) => {
    if (val.timeStamp.getTime() + DEVICE_TIMEOUT < new Date().getTime()) {
      delete wifiDevices[key];
    }
  });
}


const wifiCore = {

  processWifiData(wifiData) {
    cleanUpClients();

    console.log(wifiData);
    const splitData = wifiData.split(',');

    if (Device.isDevice(splitData)) {
      const key = Device.createKey(splitData);
      const device = Device.parseFromCsv(splitData);

      if (!device) {
        return null;
      }

      wifiDevices[key] = device;
      return wifiDevices[key];
    }
    return null;
  },

  getDevices() {
    return wifiDevices;
  },

};

export default wifiCore;
