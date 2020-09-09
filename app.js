const Discord = require('discord.js');
const client = new Discord.Client();

const token = require('./token');
const commands = require('./commands');
const { processCmd, getTime, getChannel, getEmoji } = require('./misc');

// Channels
let channels = {
    logs: 'event-logs',
    srs: 'politics-news-and-srs-business'
}

// Upon start up
client.on('ready', () => {
    console.log('\033c'); // Clear console
    console.log(`\x1b[32m${client.user.tag}\x1b[0m is online at \x1b[36m${getTime()}\x1b[0m\n`);
    client.user.setActivity('the mayor', { type: "LISTENING" }); // Now listening to: the mayor
});

// When a message is sent on the server
client.on('message', (msg) => {
    // Prevent bot from responding to itself
    if (msg.author === client.user)
        return;
    try {
        if (msg.content.startsWith('!'))
            processCmd(msg);
    } catch(e) {
        console.log(`\x1b[31mError:\x1b[0m Command not valid \x1b[36m(${msg.content})`);
    }
});

// On deleted message
client.on('messageDelete', (msg) => {
    // Prevent bot from talking about itself
    if (msg.author === client.user)
        return;
    
    let ch = getChannel(msg, channels.logs);

    // Quick check on if message is empty
    let msgChk = msg.content === '' ? '*Message was just an image. For safety (and sanity of developer) the image is not saved.*' : msg.content;
    msgChk = msgChk.replace(/https:\/\//g, ''); // Strip the URL to just the parts after to prevent spamming links in logs
    ch.send(`__MESSAGE DELETED__\n\n${msgChk}\n\nAuthor: ${msg.author.tag}\nChannel: #${msg.channel.name}\n----------`);
});

// On edited message
client.on('messageUpdate', (oldMsg, newMsg) => {
    let ch = getChannel(oldMsg, channels.logs);
    ch.send(`__MESSAGE EDITED__\n\n**Original:**\n${oldMsg.content}\n\n**New:**\n${newMsg.content}\n\nAuthor: ${oldMsg.author.tag}\nChannel: #${oldMsg.channel.name}`);
});

// Token is required to log in
client.login(token);