
const healthHttp = {
  healthCheck: (req, res) => {
    const health = {
      health: 'ok',
    };
    res(health);
  },
};

export default healthHttp;
