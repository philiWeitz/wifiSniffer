
const Hapi = require('hapi');
const routes = require('./routes');
const boomDataPayloadEvent = require('./hapi/events/boom-event');

const server = new Hapi.Server();

server.connection({
  port: 8080,
  host: '0.0.0.0',
  routes: {
    cors: true,
  },
});

server.route(routes);

server.ext('onPreResponse', boomDataPayloadEvent);

server.start((err) => {
  if (err) {
    throw err;
  }
  console.log(`Server running at: ${server.info.uri}`);
});
