import 'babel-polyfill';
import cors from 'cors';
import config from './config';
import { MongoClient } from 'mongodb';
import fastify from 'fastify';


const port = config.port;
const mongoUrl = config.mongoUrl;


MongoClient.connect(`${mongoUrl}`, { useNewUrlParser: true })
  .then((client) => {
    const app = new fastify();
    app.use(cors());
    app.register(require('./routes/Webhook'))
       .register(require('fastify-mongodb'), { client });
    
    app.get('/api/healthcheck', (req, reply) => {
      reply.status(200).send({ status: 'ok'});
    });

    app.get('/', (req, reply) => {
      reply.send('Excalibur Bot');
    });

    app.listen(port, '0.0.0.0', (err) => {
      if (err) throw err;
      console.log(`Excalibur Bot Running on ${port}`);
    });
  })
  .catch((err) => {
    throw err
  })
