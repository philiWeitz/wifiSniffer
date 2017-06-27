
function boomDataPayloadEvent(request, reply) {
  const response = request.response;
  if (!response.isBoom) {
    return reply.continue();
  }
  if (response.data) {
    response.output.payload.data = response.data;
  }
  return reply(response);
}

module.exports = boomDataPayloadEvent;
