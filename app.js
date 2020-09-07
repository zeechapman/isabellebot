const Discord = require('discord.js');
const client = new Discord.Client();

const token = require('./token');
const commands = require('./commands');
const { getTime } = require('./misc');

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
    if (msg.content.startsWith('!')) {
        processCmd(msg);
    }
});

/**
 * Process message as a command
 * @param {string} msg 
 */
function processCmd(msg) {
    // Get time of execution for logging
    let time = new Date();
    let hour = time.getHours();
    let min = time.getMinutes();


    let full = msg.content.substr(1); // Remove the '!'
    let split = full.split(" "); // Split each part of a string by the space and store into array
    let cmd = split[0]; // Ex: '!caw' will be 'caw'

    /*  Get the argument by splitting into an array after the command.
        Ex: !hug John, the Destroyer -> John,,the,Destroyer
        Afterwards, using ReGex, replace twice to make it: John, the Destroyer */
    let args = split.slice(1);
    let argsJoin = args.join().replace(/,{2}/g, ', ').replace(/,\b/g, ' ');

    console.log(`Command read: \x1b[32m${msg.content}\x1b[0m at \x1b[36m${getTime()}`);
    msg.channel.send(commands[cmd]());
}


// Token is required to log in
client.login(token);