const port = process.env.PORT || 3009;
const queueUrl = 'amqp://yigshbya:gllLerGdvCYeCMga46ChHCzE_qdjAKaM@mosquito.rmq.cloudamqp.com/yigshbya';
const apiUrl = process.env.NODE_ENV === 'production' ? '': 'http://localhost:3001/';

module.exports = {
    port,
    apiUrl,
    queueUrl,
}
