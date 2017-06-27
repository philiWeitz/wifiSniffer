
import _ from 'lodash';
import boom from 'boom';
import wifiCore from '../core/wifi-core';


const wifiHttp = {

  postData: (req, res) => {
    const data = wifiCore.processWifiData(req.payload);
    if (!data) {
      boom.badData('Unable to parse data');
    }
    res(data);
  },

  getDevices: (req, res) => {
    const devices = _.values(wifiCore.getDevices());
    if (!devices) {
      boom.notFound('Devices not found');
    }
    res(devices);
  },

};

export default wifiHttp;
