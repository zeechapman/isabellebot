const Discord = require('discord.js');
const client = new Discord.Client();
const isaCommands = require('./commands/isa.commands');
const regCommands = require('./commands/reg.commands');
const token = require('./data');

// When the bot is on, prepare
client.on('ready', () => {
    console.log('\033cIsabelle Bot is on, and ready to go!\n'); // Clear console
    client.user.setActivity("the mayor", { type: "LISTENING" });

});

// Whenever a message is sent
client.on('message', msg => {
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

/**
 * Whenever a message is deleted, log it
 */
client.on('messageDelete', msg => {
    // Don't log itself
    if (msg.author === client.user) {
        return;
    }

    let chName = 'event-logs';
    let logsChannel = msg.guild.channels.find(val => {
        return val.name === chName;
    });
    let authorOriginal = msg.author.tag;
    let author = authorOriginal.substr(0, authorOriginal.length - 5);

    // There's a weird issue with embedded images.
    // Instead of allowing it to say nothing (original issue),
    // simply let them know that it's a embedded image (or URL)
    if (msg.content === '') {
        logsChannel.send("**__MESSAGE DELETED__**\n\n```It contained an embedded image, or a URL.```" +  author + "\n---------------");
    } else if (msg.content === 'p!next' || msg.content === 'p!back') {
        return; // Do nothing, because it's just Pokecord doing it's thing
    } else {
        logsChannel.send("**__MESSAGE DELETED__**\n\n```" + msg.content + "```" + author + "\n---------------");
    }
});


 
/**
 * Whenever a message is edited, log it
 */
client.on('messageUpdate', (msg, nMsg) => {
    console.log("Edited message");
    if (msg.author === client.user) {
        return;
    }

    // Exclude certain users from logging. Mainly, Pokecord and MEE6
    let exclude = [
        '159985870458322944',
        '365975655608745985'
    ];
    let match = false;
    let chName = 'event-logs';
    let authorOriginal = msg.author.tag;
    let author = authorOriginal.substr(0, authorOriginal.length - 5);
    let logsChannel = msg.guild.channels.find(val => {
        return val.name === chName;
    });

    for (let i = 0; i < exclude.length; i++) {
        if (msg.author.id === exclude[i]) {
            match = true;
        }
    }

    // Discord itself will edit a message to make into a embedded message when a URL is present.
    // Ignore it if it does happen to start with it.
    if (msg.content.startsWith('https://')) {
        return;
    } else {
        if (match)
            return;
        else {
            logsChannel.send(
                "**__EDITED__**\n\n" +
                "**Original**\n" +
                "\`\`\`" + msg.content + "\`\`\`\n" +
                "**UPDATED**\n" +
                "\`\`\`" + nMsg.content + "\`\`\`\n" +
                author + "\n---------------");
        }
    }
});


// Process the commands
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