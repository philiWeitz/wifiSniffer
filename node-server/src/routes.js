
import Joi from 'joi';

import wifiHttp from './http/wifi-http';
import healthHttp from './http/health-http';
import nodeMcuHttp from './http/node-mcu-http';

const routes = [
  {
    method: 'GET',
    path: '/health',
    config: {
      description: 'Health check',
      tags: ['api'],
      handler: healthHttp.healthCheck,
    },
  },
  {
    method: 'POST',
    path: '/data',
    config: {
      description: 'Posts client or beacon data',
      tags: ['api'],
      handler: wifiHttp.postData,
    },
  },
  {
    method: 'GET',
    path: '/devices',
    config: {
      description: 'Gets all seen devices',
      tags: ['api'],
      handler: wifiHttp.getDevices,
    },
  },
  {
    method: 'GET',
    path: '/nodemcu/config',
    config: {
      description: 'Gets the NodeMCU configuration',
      tags: ['api'],
      handler: nodeMcuHttp.getConfig,
    },
  },
  {
    method: 'PATCH',
    path: '/nodemcu/config',
    config: {
      description: 'Updates the NodeMCU configuration',
      tags: ['api'],
      handler: nodeMcuHttp.patchConfig,
      validate: {
        payload: {
          rangeStart: Joi.number().integer(),
          rangeStop: Joi.number().integer(),
          writeClients: Joi.boolean(),
          writeBeacons: Joi.boolean(),
          runLoop: Joi.boolean(),
        },
      },
    },
  },
];

module.exports = routes;
