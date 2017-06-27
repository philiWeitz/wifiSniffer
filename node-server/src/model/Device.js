
const Device = {

  parseFromCsv(splitData) {
    if (this.isDevice(splitData)) {
      return {
        mcuId: splitData[1],
        mac: splitData[2],
        signal: splitData[3],
        lastSeen: splitData[4],
        timeStamp: new Date(),
      };
    }
    return null;
  },

  createKey(splitData) {
    return `${splitData[1]}-${splitData[2]}`;
  },

  isDevice(splitData) {
    return (splitData.length === 5 && splitData[0] === 'd');
  },

};

export default Device;
