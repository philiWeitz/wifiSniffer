
import { Record } from 'immutable';

const Device = Record({
  mac: '',
  mcuId: '',
  signal: 0,
  lastSeen: null,
  timeStamp: null,
});

Device.build = (data) => new Device(data);

export default Device;
