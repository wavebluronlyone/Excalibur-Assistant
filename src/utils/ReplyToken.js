import config from '../../config';

const channelToken = config.channelToken;

function reply(reply_token) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer {${channelToken}}`
    }
    const body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
            type: 'text',
            text: 'Hello'
        },
        {
            type: 'text',
            text: 'How are you?'
        }]
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}
export default {
    reply
}