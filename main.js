const Discord = require('discord.js');
const client = new Discord.Client();
const commands = require('./commands');
const keepAlive = require('./keepAlive');
const express = require('express');
const app = express();

// Check if running on server.  If not, then use a port for local testing
let port = process.env.PORT;
if (port == null || port == '') {
    port = 5000;
}

app.use('/', express.static(__dirname + '/'));
app.listen(port);

// Respects counter
let rc = 0;

// When the bot is on, do some things
client.on('ready', () => {
    console.log("IsabelleBot is a go!");
    client.user.setActivity("the mayor", { type: "LISTENING" }); // Status will be set to "Listening to the mayor"
});

// Checks for each message sent.  Only will respond to !sa and certain bang (!) commands
client.on('message', (msg) => {
    // Bots are not allowed to talk to themselves.
    // They will learn and destory if we don't stop them
    if (msg.author === client.user) {
        return
    }

    // Special commands that were not taken by MEE6 (if present)
    if (msg.content.startsWith("!sa ")) {
        specialCommand(msg);
    }
    // Other ones that are not stolen by MEE6
    else if (msg.content.startsWith("!")) {
        processCmd(msg);
    }
    else if (msg.content === 'F' || msg.content === 'f') {
        rc++;
    }
});

/**
 * Do special commands that begin with "!sa" (get it, Isabelle, !sabelle)
 * @param {string} msg Required to post into channels
 */
function specialCommand(msg) {
    let fullCmd = msg.content.substr(4); // We don't need the "!sa"
    let splitCmd = fullCmd.split(" "); // Split for each space.  That way you can do things like !prank John and it will know to prank John
    let primaryCmd = splitCmd[0]; //The word after the command initializer
    let args = splitCmd.slice(1); // Anything else afterwards is used for arguments (persons name, or a number to spew out for no reason)

    // Debug stuff
    console.log("Command seen: " + primaryCmd);
    console.log("Arguments: " + args + "\n");

    // Begin checking for list of commands

    // Display list of commands
    if (primaryCmd === "help") {
        // msg.channel.send("Oh, hello there!  Is there something I can help you with today? I can do:");
        commands.showCommands(msg);
    }
    // Self care resources
    else if (primaryCmd === "sendhelp") {
        commands.sendHelp(msg);
    }
    // Info about the bot
    else if (primaryCmd === "info") {
        commands.info(msg);
    }
}

/**
 * The commands that are on Goggle's stream mostly
 * @param {string} msg Required to send to channel
 */
function processCmd(msg) {
    let fullCmd = msg.content.substr(1); // We don't need the exclamation mark right now
    let splitCmd = fullCmd.split(" "); // same as the other function
    let primaryCmd = splitCmd[0]; // Yup, still the same
    let args = splitCmd.slice(1); // Look, just take a peek at specialCommand because I don't want to have to re-write it (write a function for it) what was that?

    console.log("Command seen: " + primaryCmd);
    console.log("Arguments: " + args + "\n");

    if (primaryCmd === "caw") {
        commands.cawCaw(msg);
    }
    else if (primaryCmd === "phil") {
        commands.phil(msg);
    }
    else if (primaryCmd === "poke") {
        commands.poke(msg, args);
    }
    else if (primaryCmd === "fliptable") {
        commands.flipTable(msg);
    }
    else if (primaryCmd === "fixtable") {
        commands.fixTable(msg);
    } else if (primaryCmd === "rip") {
        commands.payRespects(msg);
    }
    else if (primaryCmd === "nani") {
        commands.naniCommand(msg);
    }

}

// Grab the token and log in.
let token = process.env.TOKEN;
// Check to see if it's running on the server.  If not, switch to local token
if (token == ''|| token == null) {
    console.info("Switching token");
    const data = require('./data.js');
    token = data.data;
} else {
    // Prevent from idling for too long
    keepAlive.keepAlive();
}

client.login(token); // "I'm in"

