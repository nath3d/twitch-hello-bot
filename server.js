require('dotenv').config();

const delay = 5000;
const tmi = require('tmi.js');
const client = new tmi.Client({
	options: { debug: true, messagesLogLevel: "info" },
	connection: {
		reconnect: true,
		secure: true
	},
	identity: {
		username: process.env.TWITCH_USERNAME,
		password: process.env.TWITCH_OAUTHTOKEN
	},
	channels: [ process.env.TWITCH_CHANNEL ]
});

var processed = [ "streamlabs", "nightbot" ]
var users = process.env.TWITCH_USERS.split(',')

client.connect().catch(console.error);
client.on('message', (channel, tags, message, self) => 
{
    if(tags.username == process.env.TWITCH_USERNAME) return;
    if(!(users.includes(tags.username) || tags.mod)) return;
    if(processed.includes(tags.username)) return;

    processed.push(tags.username);
	var messageToSend = `@${tags.username} bstiBjr`;
	if(tags.mod)
		messageToSend = `@${tags.username} bjr bstiBjr bstiBjr`;
	console.debug(`///////////////////// @${messageToSend}`);
	setTimeout(() => { client.say(channel, messageToSend); }, delay);
});