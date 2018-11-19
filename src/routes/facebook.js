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
    console.log('[FACEBOOK] Event Incomming');
    try {
      await rabitmq.publisher(req.body, 'facebook');
      console.log('[FACEBOOK] Send Event to queue Success');
      reply.status(200).send('receive message ok!!');
    } catch( error ) {
      console.log(`[FACEBOOK] Error webhook : ${err.stack}`);
      reply.status(500).send({error: error.message});
    }
  });

  next();
}
