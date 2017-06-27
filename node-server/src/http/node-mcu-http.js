
import boom from 'boom';
import nodeMcuCore from '../core/node-mcu-core';

const nodeMcuHttp = {

  getConfig: (req, res) => {
    const config = nodeMcuCore.getConfig();
    if (!config) {
      boom.notFound('Configuration was not found');
    }
    res(config);
  },

  patchConfig: (req, res) => {
    const patchedConfig = nodeMcuCore.patchConfig(req.payload);
    if (!patchedConfig) {
      boom.notFound('Unable to patch configuration');
    }
    res(patchedConfig);
  },

};

export default nodeMcuHttp;
