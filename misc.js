/**
 * Get the current time in 12 hour format
 */
function getTime() {
    let date = new Date();
    let hrs = date.getHours();
    let min = date.getMinutes();
    min = min < 10 ? '0' + min : min; // If minutes less than 10, then add a digit
    let ampm = hrs >= 12 ? 'PM' : 'AM';
    hrs = hrs % 12;
    hrs = hrs ? hrs : 12; // If 0, then set it to 12
    let time = hrs + ':' + min + ' ' + ampm;

    return time;
}

exports.getTime = getTime;

/**
 * Process message as a command
 * @param {string} msg 
 */
function processCmd(msg) {
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

exports.processCmd = processCmd;

/**
 * Grab the channel name and info
 * @param {*} msg Required for grabbing the channel info
 * @param {string} chName The name of the channel
 */
function getChannel(msg, chName) {
    let channel = msg.guild.channels.cache.find(ch => ch.name === chName);
    return channel;
}

exports.getChannel = getChannel;

/**
 * 
 * @param {*} msg Required
 * @param {*} str The emoji's name (ex: OMEGALUL)
 */
function getEmoji(msg, str) {
    const emo = msg.guild.emojis.cache.find(e => e.name === str);
    return '<:' + emo.name + ':' + emo.id + '>';
}

exports.getEmoji = getEmoji;