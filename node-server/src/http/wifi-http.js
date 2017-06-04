
import _ from 'lodash';
import wifiCore from '../core/wifi-core';


const wifiHttp = {

  postData: (req, res) => {
    wifiCore.processWifiData(req.payload);
    res();
  },

  getDevices: (req, res) => {
    const devices = _.values(wifiCore.getDevices());
    res(devices);
  },

};

export default wifiHttp;
