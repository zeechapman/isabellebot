const Discord = require('discord.js');
const client = new Discord.Client();
const isaCommands = require('./commands/isa.commands');
const regCommands = require('./commands/reg.commands');
const token = require('./data');
const firebase = require('firebase');

// When the bot is on, prepare
client.on('ready', () => {
    console.log('\033c'); // Clear console
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

// When a message is deleted, send it to the logs channel
client.on('messageDelete', msg => {
    // Don't log itself
    if (msg.author === client.user) {
        return;
    }
    
    let delDate = getDateTime();
    let chName = 'event-logs';
    let authorOriginal = msg.author.tag;
    let author = authorOriginal.substr(0, authorOriginal.length - 5);
    let logsChannel = msg.guild.channels.find(val => {
        return val.name === chName;
    });

    let embed = new Discord.RichEmbed().setColor(0xFFD700).setAuthor(author).setDescription(msg.content).setFooter("Message deleted on " + delDate);

    logsChannel.send(embed);
});

// Whenever a message is edited, report the changes
client.on('messageUpdate', msg => {
    let editDate = getDateTime();
    let chName = 'event-logs';
    let authorOriginal = msg.author.tag;
    let author = authorOriginal.substr(0, authorOriginal.length - 5);
    let logsChannel = msg.guild.channels.find(val => {
        return val.name === chName;
    });
    
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

function getDateTime() {
    let date = new Date();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    return month + "/" + day + " " + hour + ":" + minute + " MST";
}

// Login
client.login(token);