/*
    [ ] - Condense code by adding functions for some actions
    [ ] - Condense code by adding cooldown function control
    [ ] - Remove references when platformed on Heroku (express, Procfile, etc)
    [X] - Try to make being able to tell from ! and !sa in one function instead of seperating it (not possible at the moment)
    [ ] - Try to automate the process of adding commands.
    [ ] - Incorporate MongoDB
*/
const Discord = require('discord.js');
const client = new Discord.Client();
const isaCommands = require('./commands/isa.commands');
const regCommands = require('./commands/reg.commands');
const token = require('./data');

// When the bot is on, prepare
client.on('ready', () => {
    console.log("Isabelle Bot is on, and ready to go!");
    client.user.setActivity("the mayor", { type: "LISTENING" });
});

// Whenever a message is sent
client.on('message', (msg) => {
    // Do not allow the bots to respond to themselves.
    // The world will be in ruin if they do
    if (msg.author === client.user) {
        return;
    }

    if (msg.content.startsWith("!sa ")) {
        processCommand(msg, 4, isaCommands);
    } else if (msg.content.startsWith("!")) {
        processCommand(msg, 1, regCommands);
    }

});

function processCommand(msg, length, commandGroup) {
    let fullCmd = msg.content.substr(length);
    let splitCmd = fullCmd.split(" ");
    let primaryCmd = splitCmd[0];
    let args = splitCmd.slice(1);

    let argJoin = args.join().replace(/,/g, ' ');

    commandGroup.module[primaryCmd].fn(msg);

}

// Login
client.login(token);

// Scheme: Get the inputted command, then perform said command
// commands.module["test"].fn();