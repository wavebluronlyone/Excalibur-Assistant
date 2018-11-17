const fastify = require('fastify')();
const cors = require('cors');
const facebook = require('./routes/facebook');
const port = process.env.PORT || 3002;

fastify.use(cors());

fastify.register(facebook, { prefix: '/webhooks/facebook' });

fastify.get('/healthcheck', (req, reply) => {
  reply.status(200).send({ status: 'ok'});
});

fastify.listen(port, '0.0.0.0', (err) => {
  if (err) throw err;
  console.log(`Excalibur Bot Webhook Running on ${port}`);
});

fastify.ready(() => {
  console.log(fastify.printRoutes());
});
