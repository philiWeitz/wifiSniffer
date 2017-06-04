
import _ from 'lodash';
import nodeMcuDefaultConfig from '../static/node-mcu-default-config.json';

let nodeMcuConfig = nodeMcuDefaultConfig;

const nodeMcuCore = {

  getConfig: () => {
    return _.join(_.values(nodeMcuConfig), ',');
  },

  patchConfig: (config) => {
    nodeMcuConfig = _.merge(nodeMcuConfig, config);
    return nodeMcuConfig;
  },

};

export default nodeMcuCore;
