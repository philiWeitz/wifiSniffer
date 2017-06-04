
import nodeMcuCore from '../core/node-mcu-core';

const nodeMcuHttp = {

  getConfig: (req, res) => {
    res(nodeMcuCore.getConfig());
  },

  patchConfig: (req, res) => {
    res(nodeMcuCore.patchConfig(req.payload));
  },

};

export default nodeMcuHttp;
