import amqplib from 'amqplib';
import axios from 'axios';
import config from '../config';

const urlrmq = process.env.CLOUDAMQP_URL || 'amqp://wllnfrkr:uyRX06ojkn1h-QQ2tuzffjnm1ycSvNtN@chimpanzee.rmq.cloudamqp.com/wllnfrkr';


class rabitmq {
  constructor () {
    this.amqplib = amqplib.connect(urlrmq)
  }

  publisher(content) {
    this.amqplib.then((conn) => {
      let queue =  conn.createChannel();
      queue = queue.then((worker)=> {
        worker.assertQueue('ch1');
        worker.sendToQueue('ch1', new Buffer (content));
      })
      return queue;
    }).then(null, console.warn);
  }

  consumer() {
    this.amqplib.then((conn) => {
      let queue = conn.createChannel();
      queue = queue.then((worker) => {
        worker.assertQueue('ch1');
        worker.consume('ch1',async (msg) => {
          if (msg !== null) {
            console.log(msg.content.toString());
            const content = msg.content;
            const url = config.apiUrl;
            await axios.post(`${url}/messenger/receive/`,{ content });
            worker.ack(msg);
          }
        });
      });
      return queue;
    }).then(null, console.warn);
  }

}

export default new rabitmq();