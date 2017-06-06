
import _ from 'lodash';


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

    if (splitData.length === 5 && splitData[0] === 'd') {
      const key = `${splitData[1]}-${splitData[2]}`;

      wifiDevices[key] = {
        mcuId: splitData[1],
        mac: splitData[2],
        signal: splitData[3],
        lastSeen: splitData[4],
        timeStamp: new Date(),
      };
    }
  },

  getDevices() {
    return wifiDevices;
  },

};

export default wifiCore;
