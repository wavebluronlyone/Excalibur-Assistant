import axios from 'axios';

module.exports = async (app, option, next) => {
    app.post('/webhook', async (req, reply) => {
        const event =  req.body;
        const data = event.events[0];
        try {
          await axios.post('https://excaliburbot-rabitqueue-api.herokuapp.com/queue/',{ data });
        } catch(err) {
          console.log(`Error webhook : ${err}`);
        }
        
        reply.status(200).send({ status: 'ok'});
    });
    next();
}