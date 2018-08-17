import config from '../config';
import * as line from '@line/bot-sdk';
import time from '../utils/time';
import { create } from '../utils/mongodb';

module.exports = async (app, option, next) => {

    const configLine = {
    channelAccessToken: config.channelAccessToken,
    channelSecret: config.channelSecret,
    };

    const client = new line.Client(configLine);
    app.post('/webhook', async (req, reply) => {
        const replyToken = req.body.events[0].replyToken;
        const userId = req.body.events[0].source.userId;
        const incomingMessage = req.body.events[0].message;
        // console.log(incomingMessage)
        let receiveMessage = {};
        // console.log('events[0]', JSON.stringify(req.body.events[0]));

        console.log(`Receive Message from UserID: ${userId}`);
        // console.log(incomingMessage.type)
        switch (incomingMessage.type) {
            case 'text' : {
                console.log('type : text');
                console.log(`"${incomingMessage.text}"`);
                receiveMessage = incomingMessage;
            }
            case 'sticker' : {
                console.log('type : sticker');
                console.log(`Stciker ID: ${incomingMessage.stickerId}`);
                receiveMessage = incomingMessage;
                break;
                
            }
            default: {
                console.log('unknown type');
                receiveMessage = null;
                break;
            }
        };
        
        const replyMessage = {
        type: 'text',
        text: `${incomingMessage.text}`
        };

        const logData = {
            userId,
            receiveMessage,
            replyMessage,
        };

        try {
        await client.replyMessage(`${replyToken}`, replyMessage);
        console.log(`Excalibur Reply to ${userId} with ${JSON.stringify(replyMessage)}`);
        await create(app, 'heroku_c5rxsb5d', 'Logs', logData);

        } catch (error) {
        console.log(error.stack);
        }
        reply.status(200).send({ status: 'ok'});
    });

    next();
}