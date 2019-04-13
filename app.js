const Discord = require('discord.js');
const client = new Discord.Client();
const guild = new Discord.Guild();
const isaCommands = require('./commands/isa.commands');
const regCommands = require('./commands/reg.commands');
const token = require('./data');

// When the bot is on, prepare
client.on('ready', () => {
    console.log("\nIsabelle Bot is on, and ready to go!\n");
    client.user.setActivity("the mayor", { type: "LISTENING" });
});

// Whenever a message is sent
client.on('message', (msg) => {
    // Do not allow the bots to respond to themselves.
    // The world will be in ruin if they do
    if (msg.author === client.user) {
        return;
    }

    // While checking for input for commands, catch any errors (incorrect commands, or errors in general)
    try {
        if (msg.content.startsWith("!sa ")) {
            processCommand(msg, 4, isaCommands);
        } else if (msg.content.startsWith("!")) {
            processCommand(msg, 1, regCommands);
        } else if (msg.content.startsWith("https://clips.twitch.tv")) {
            // If someone posted a clip outside of the clips channel, send it to the clip channel
            let clip = msg.content;
            let sender = msg.author;
            let chName = 'goggles-clips'; // What it's called on Goggle's Discord
            let clipsChannel = msg.guild.channels.find(val => {
                return val.name === 'goggles-clips';
            });

            if (msg.channel.name === chName) {
                // If the channel is the clips channel, do nothing
                return;
            } else {
                // If it is not the clips channel, delete the post, then send it to the correct channel
                clipsChannel.send('Originally posted by ' + sender + '\n' + clip);
                msg.delete();
            }
        }
    } catch (err) {
        console.log("Bad command, or an error has happened.\nError: " + err + "\n");
    }

});

function processCommand(msg, length, commandGroup) {
    let fullCmd = msg.content.substr(length);
    let splitCmd = fullCmd.split(" ");
    let primaryCmd = splitCmd[0];
    let args = splitCmd.slice(1);

    let argJoin = args.join().replace(/,/g, ' ');

    console.log("Command read: " + primaryCmd + "\n----------");

    commandGroup.module[primaryCmd].fn(msg, argJoin);

}

// Login
client.login(token);