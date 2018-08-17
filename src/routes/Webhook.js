import config from '../config';
import * as line from '@line/bot-sdk';
import { create } from '../utils/mongodb';
import { getProfile } from '../modules/Profile';

module.exports = async (app, option, next) => {

    const configLine = {
    channelAccessToken: config.channelAccessToken,
    channelSecret: config.channelSecret,
    };

    const dbName = config.dbName;

    const client = new line.Client(configLine);
    app.post('/webhook', async (req, reply) => {
        const replyToken = req.body.events[0].replyToken;
        const userId = req.body.events[0].source.userId;
        const incomingMessage = req.body.events[0].message;
        let receiveMessage = {};
        let replyMessage = {};

        console.log(`Receive Message from UserID: ${userId}`);

        switch (incomingMessage.type) {
            case 'text' : {
                console.log('type : text');
                console.log(`"${incomingMessage.text}"`);
                replyMessage = {
                    type: 'text',
                    text: `${incomingMessage.text}`,
                }
                break;
            }
            case 'sticker' : {
                console.log('type : sticker');
                console.log(`Stciker ID: ${incomingMessage.stickerId}`);
                console.log(`Package ID: ${incomingMessage.packageId}`);
                replyMessage = {
                    type: 'sticker',
                    stickerId: `${incomingMessage.stickerId}`,
                    packageId:`${incomingMessage.packageId}`,  
                }
                break;
                
            }
            default: {
                console.log('unknown type');
                receiveMessage = null;
                break;
            }
        };
        

        const logData = {
            userId,
            receiveMessage: incomingMessage,
            replyMessage,
        };

        try {
          await client.replyMessage(`${replyToken}`, replyMessage);
          console.log(`Excalibur Reply to ${userId} with ${JSON.stringify(replyMessage)}`);
          await create(app, dbName, 'Logs', logData);
          await getProfile(client, userId, app);
        } catch (error) {
          console.log(error.stack);
        }
        reply.status(200).send({ status: 'ok'});
    });

    next();
}