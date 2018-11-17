const rabitmq = require('../utils/rabitmq');

module.exports = (fastify, Option, next) => {
  const secret = 'whosyourdady';
  fastify.get('/',(req, reply) => {
    if (req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] == secret) {
      reply.send(req.query['hub.challenge']);
    } else {
      reply.status(400);
    }
  });

  fastify.post('/', async (req, reply) => {
    console.log('message incomming ');
    try {
      await rabitmq.publisher(req.body, 'ch1');
      reply.status(200).send('receive message ok!!');
    } catch( error ) {
      console.error(error.stack);
      reply.status(500).send({error: error.message});
    }
  });

  next();
}
