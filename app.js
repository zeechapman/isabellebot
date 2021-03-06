const Discord = require('discord.js');
const client = new Discord.Client();
const isaCommands = require('./commands/isa.commands');
const regCommands = require('./commands/reg.commands');
const token = require('./data');

// Global variables
let http = /(https)|(http)/; // Capture if 'https' is in the string or 'http'
// let twitchClipsUrl = /(https:\/\/clips.twitch.tv)/;

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

    // While checking for input for commands, catch any errors (incorrect commands, or errors from a post)
    try {
        if (msg.content.startsWith("!sa ")) {
            processCommand(msg, 4, isaCommands);
        } else if (msg.content.startsWith("!")) {
            processCommand(msg, 1, regCommands);
        
        // } else if (twitchClipsUrl.test(msg.content)) {
        //     // If someone posted a clip outside of the clips channel, send it to the clip channel
        //     let clip = msg.content;
        //     let sender = msg.author;
        //     let chName = 'goggles-clips'; // What it's called on Goggle's Discord
        //     let clipsChannel = msg.guild.channels.find(val => {
        //         return val.name === 'goggles-clips';
        //     });

        //     if (msg.channel.name === chName) {
        //         // If the channel is the clips channel, do nothing
        //         return;
        //     } else {
        //         // If it is not the clips channel, delete the post, then send it to the correct channel, tagging the user
        //         // at the same time.
        //         clipsChannel.send('Originally posted by ' + sender + '\n' + clip);
        //         msg.delete();
        //     }
        // By the power of Necromancy, rise Dad Bot...RIIISE!
        // (also sorry for the large amount of ORs)
        } else if (msg.content.startsWith("im ") || msg.content.startsWith("I'm ") || msg.content.startsWith("i'm ") || msg.content.startsWith('I’m ') || msg.content.startsWith('i’m ') || msg.content.startsWith('i am ') || msg.content.startsWith('I am ')) {
            regCommands.module.dad.fn(msg);
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

    console.log("Deleted");

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
        logsChannel.send("**__MESSAGE DELETED__**\n\n```It contained an embedded image, or a URL.```\nDeleted from: #" + msg.channel.name + "\nAuthor of message: " + author + "\n---------------");
    } else if (msg.content === 'p!next' || msg.content === 'p!back') {
        return; // Do nothing, because it's just Pokecord doing its thing
    } else {
        logsChannel.send("**__MESSAGE DELETED__**\n\n```" + msg.content + "```\nDeleted from: #" + msg.channel.name + "\nAuthor of message: " + author + "\n---------------");
    }
});



/**
 * Whenever a message is edited, log it
 */
client.on('messageUpdate', (msg, nMsg) => {
    // Bot can't respond to itself
    if (msg.author === client.user) {
        return;
    }

    // Exclude certain users from logging. Mainly, Pokecord and MEE6
    let exclude = [
        '159985870458322944', // MEE6
        '365975655608745985', // Pokecord
        '372181371864612864', // Helios
        '204255221017214977'  // Just a Bot
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
    // Ignore it if it does contain a URL
    if (http.test(msg.content)) {
        return;
    } else {
        if (match)
            return;
        else {
            console.log('\nOriginal message:\n' + msg.content);
            console.log('\n\nUpdated:\n' + nMsg.content + '\n');
            logsChannel.send(
                "**__EDITED__**\n\n" +
                "**Original**\n" +
                "\`\`\`" + msg.content + "\`\`\`\n" +
                "**UPDATED**\n" +
                "\`\`\`" + nMsg.content + "\`\`\`\n" +
                "Message from:  #" + msg.channel.name + "\n" +
                author + "\n---------------");
        }
    }
});

// When a user enters the server
client.on('guildMemberAdd', member => {
    // This is going to be a text dump.
    let welcome = "Welcome to Lady Goggles' Starry Night! **This server is 18+.**\n\n**VALUES**\n\nWe're an adult-oriented community where we strive to be positive, friendly, and have as much fun as possible. To that end, this is what we believe:\n\n* We have frank discussions about sensitive subjects, such as mental health, politics, and the like. Discussion is encouraged, as long as civility is forefront\n\n* We treat each other kindly here. Gentle ribbing is okay; insults and bullying are not. Look out for each other, and take care of yourself.\n\n* We're against racism, sexism, homophobia, and other forms of discrimination/prejudice. We don't encourage this behavior; if you witness this, please feel free to speak up in chat, or speak with one of the mods, Squid, or Goggles. RULES * No harassment, doxxing, trolling, or other forms of discrimination are allowed here.\n\m* We have a strike system implemented to avoid trolls and general disruptive behavior. Three strikes and you are banned from the discord.\n\n* Just as a heads up, we log edited and deleted messages for your and our safety.\n\n* No spamming.\n\n* If you are here, it's assumed that you agree to these conditions. If you have any questions, concerns, or suggestions, please contact/DM Lady Goggles herself, SquidCrowPro, or any of our moderators. **You can also submit anonymous feedback here https://forms.gle/yHhpXXML5b1uQXkVA**\n\n*(please note that these rules are subject to change, and I won't be able to update these messages if a change does occur. Announcements will be made on rule changes)*";
    member.send(welcome);
});

// When the bot errors, log it
client.on('error', (err) => {
    let date = new Date();
    console.log("Oops! An error has occured on " + date.getHours() + ":" + date.getMinutes() + ":\n" + err);
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
