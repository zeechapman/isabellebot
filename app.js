const Discord = require('discord.js');
const client = new Discord.Client();

const token = require('./token');
const commands = require('./commands');

// Upon start up
client.on('ready', () => {
    console.log(`${client.user.tag} is online`);
    client.user.setActivity('the mayor', { type: "LISTENING" }); // Now listening to: the mayor
});

// When a message is sent on the server
client.on('message', (msg) => {
    // Prevent bot from responding to itself
    if (msg.author === client.user) {
        return;
    }
    if (msg.content.startsWith('!')) {
        // proccessCmd()
    }
});
/**
 * Process message as a command
 * @param {string} msg 
 */
async function proccessCmd(msg) {
    let full = msg.substr(1); // Remove the '!'
    let split = full.split(" "); // Split each part of a string by the space and store into array
    let cmd = split[0]; // Ex: '!caw' will be 'caw'
    let args = split.slice(1); // For commands like !hug, it will take the stuff after the command as an argument (ex: '!hug John the Destroyer' to 'John the Destoryer')
    // let argsJoin = args.join().replace(/,/g, ' ');
    let argsJoin = args.join().replace(/,{2}/g, ', ').replace(/,\b/g, ' ');

    console.log(`Command read: ${cmd}\n----------`);

    // console.log(commands[cmd]());
    console.log(full);
    console.log(split);
    console.log(cmd);
    console.log(args);
    console.log(argsJoin);
}

proccessCmd('!test Hey, did anyone catch the game last night?');

// Token is required to log in
client.login(token);