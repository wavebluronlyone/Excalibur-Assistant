import config from '../config';
import * as line from '@line/bot-sdk';
import { create, find } from '../utils/mongodb';
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
        let receiveMessage = incomingMessage;
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
            receiveMessage,
            replyMessage,
        };

        try {
          await create(app, dbName, 'Logs', logData);
          await getProfile(client, userId, app);
        } catch (error) {
          console.log(error.stack);
        }
        reply.status(200).send({ status: 'ok'});
    });

    app.post('/sendmsg/',async (req,reply) => {
      const replyContent = req.body.replycontent;
      const userId = req.query.lineid;
      console.log('to : ',userId);
      console.log(replyContent);

      const logData = {
        userId,
        replyMessage: replyContent,
      };

      try {
        await create(app, dbName, 'Logs', logData);
        await getProfile(client, userId, app);
        await client.pushMessage(userId,replyContent);
        reply.status(200).send({ repsoneMessage : 'sended message' });
      } catch(error) {
        reply.status(500).send({ error : error.stack });
        throw error.stack;
      }
    });

    app.get('/logs/',async (req,reply) => {
      const lineid = req.query.userid;
      let filter = {};

      if(lineid !== undefined) {
        filter = {
          userId : lineid,
        }
        console.log('find logs by lineid', lineid);
      } else {
        console.log('find all logs');
      }
      
      const logs = await find(app, dbName, 'Logs',filter,{ _id : -1 });
      reply.send(logs);
    })

    next();
}