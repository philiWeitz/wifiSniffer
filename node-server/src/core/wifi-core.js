
const wifiDevices = {};

const wifiCore = {

  processWifiData(wifiData) {
    console.log(wifiData);
    const splitData = wifiData.split(',');

    if (splitData.length === 5 && splitData[0] === 'd') {
      const key = `${splitData[1]}-${splitData[2]}`;

      wifiDevices[key] = {
        mcuId: splitData[1],
        mac: splitData[2],
        signal: splitData[3],
        lastSeen: splitData[4]
      };
    }
  },

  getDevices() {
    return wifiDevices;
  },

};

export default wifiCore;
