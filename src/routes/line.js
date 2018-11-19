const rabitmq = require('../utils/rabitmq');

module.exports = (fastify, Option, next) => {
  fastify.get('/' ,(req,reply) => {
    reply.status(200).send({ status: 'ok' });
  });

  fastify.post('/', async (req, reply) => {
    console.log('[LINE] Event Incomming');
    const event =  req.body;
    const data = event.events[0];
    try {
      await rabitmq.publisher(data, 'line');
      console.log('[LINE] Send Event to queue Success');
      reply.status(200).send({ status: 'ok'});
    } catch(err) {
      console.log(`[LINE] Error webhook : ${err}`);
      reply.status(500).send({error: err});
    }
  });

  next();
}
