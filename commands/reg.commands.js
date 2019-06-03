const Discord = require('discord.js');
const database = require('./firebase/firebase');
const songList = require('./songs');

// List of useable emotes
let emotes = {
    'caw': '<:caw:477160191029280769>',
    'thisisfine': '<:thisisfine:467198644823654402>'
}

// Cooldowns
let ballCD = {
    onCD: false,
    cdLast: new Date().getTime()
}

let stabCD = {
    onCD: false,
    cdLast: new Date().getTime()
}

let happyCD = {
    onCD: false,
    cdLast: new Date().getTime()
}


let stabIndex = Math.floor(Math.random() * 5); // The index of the current stab image
let songIndex = Math.floor(Math.random() * songList.length);
let critRoll = false;
let imgPath = 'https://raw.githubusercontent.com/zeechapman/isabellebot/dev/img/';

/**
 * Cooldown control
 * @param {Discord.Client()} msg Discord
 * @param {Object} cdObj The object that contains the variables
 * @param {String} cdMsg The message to display if the cooldown is still in effect
 * @param {Number} cdTime (seconds) How long the cooldown lasts
 * @param {function} fn The function to call when everything is okay
 */
function coolDownControl(msg, cdObj, cdMsg, cdTime, fn) {
    let cdNow = new Date().getTime();
    let cdBetween = cdNow - cdObj.cdLast;
    if (cdObj.onCD === false) {
        cdObj.onCD = true;
        fn();
    } else if (cdObj.onCD === true) {
        if (cdBetween <= (cdTime * 1000)) {
            let timeRemaining = (cdTime * 1000) - cdBetween;
            console.log(timeRemaining);
            let timeStr = timeRemaining.toString();

            if (timeRemaining < 10000) {
                // If there's less than 10 seconds, or 10,000 MS
                msg.channel.send(cdMsg + '\nTime remaining: ' + timeStr.substr(0, 1) + " seconds left.");
            } else if (timeRemaining < 100000) {
                // If there's less than 100 seconds, or 100,000 MS
                msg.channel.send(cdMsg + '\nTime remaining: ' + timeStr.substr(0, 2) + " seconds left.");
            } else if (timeRemaining < 1000000) {
                // If there's less than 1000 seconds, or 1,000,000 MS
                msg.channel.send(cdMsg + '\nTime remaining: ' + timeStr.substr(0, 3) + " seconds left.");
            } else {
                // Otherwise, just display the first 4 digits (10,000,000 MS)
                msg.channel.send(cdMsg + '\nTime remaining: ' + timeStr.substr(0, 4) + " seconds left.");
            }
        }
        else {
            cdObj.cdLast = new Date().getTime();
            fn();
        }
    }
}


exports.module = {
    'caw': {
        fn: msg => {
            msg.channel.send('Caw caw, baby! ' + emotes.caw);
        }
    },
    'fliptable': {
        fn: msg => {
            let faces = ['(╯°□°）╯︵ ┻━┻', '(╯˘ ᵕ˘）╯︵ ┻━┻', '(╯˘꒳˘）╯︵ ┻━┻', '(/¯◡ ‿ ◡)/¯ ~ ┻━┻', '┬─┬ ︵ /(.□. ﾉ）(wait wut)'];
            let faceChoice = faces[Math.floor(Math.random() * faces.length)]
            msg.channel.send(faceChoice);
        }
    },
    'fixtable': {
        fn: msg => {
            msg.channel.send('┬──┬ ノ( ゜-゜ノ)');
        }
    },
    'phil': {
        fn: msg => {
            msg.channel.send('Needs more Phil');
        }
    },
    'rip': {
        fn: msg => {
            // For now, there is only one channel to blacklist
            let blackListChannels = 'the-soft-space';
            if (msg.channel.name === blackListChannels)
                // If the command is used in one of the blacklisted channels,
                // then delete the message
                msg.delete();
            else
                msg.channel.send('Press F to pay respects');
        }
    },
    'trip': {
        fn: msg => {
            msg.channel.send('Press T to pay respects to Josh Jr.');
        }
    },
    'nani': {
        fn: msg => {
            msg.channel.send('*' + msg.member + ' steps back in shock.*\nNANI??');
        }
    },
    'hug': {
        fn: (msg, args) => {
            if (args.length > 0) {
                msg.channel.send(msg.member + ' gives a big hug to ' + args + '\n(.づ◡﹏◡)づ.');
            } else {
                msg.channel.send(msg.member + ' gives a big hug to everyone!\n(.づ◡﹏◡)づ.');
            }
        }
    },
    'sawthat': {
        fn: msg => {
            let preMsg = ['I saw that edit! ', 'Is that a...NINJA EDIT? ', 'Nice edit you did there...'];
            let lennys = ['(͠≖ ͜ʖ͠≖)', '( ͡~ ͜ʖ ͡°)', '( ͡◉ ͜ʖ ͡◉)', '( ͡° ͜ʖ ͡°)']
            let pre = Math.floor(Math.random() * preMsg.length);
            let len = Math.floor(Math.random() * lennys.length);
            msg.channel.send(preMsg[pre] + lennys[len]);
        }
    },
    'thisisfine': {
        fn: msg => {
            let fire = ':fire:';
            msg.channel.send(fire + emotes.thisisfine + fire);
        }
    },
    'badum': {
        fn: msg => {
            msg.channel.send('Ba dum tss. What a knee slapper! (☞ﾟヮﾟ)☞');
        }
    },
    '8ball': {
        fn: (msg, args) => {
            let outcomes = {
                'pos': [
                    'It is certain.',
                    'It is decidedly so.',
                    'Without a doubt.',
                    'Yes - definitely.',
                    'You may rely on it.',
                    'As I see it, yes.',
                    'Most likely.',
                    'Outlook good.',
                    'Yes.',
                    'Signs point to yes.'],
                'neu': [
                    'Reply hazy, try again.',
                    'Ask again later.',
                    'Better not tell you now.',
                    'Cannot predict now.',
                    'Concentrate and ask again.'],
                'neg': [
                    'Don\'t count on it.',
                    'My reply is no.',
                    'My sources say no.',
                    'Outlook not so good.',
                    'Very doubtful.']
            };

            let command = () => {
                console.log("Command itself ran.")
                let ranIn = Math.floor(Math.random() * 12);
                let desc = '';

                if (ranIn <= 4) { // If number is between 0 and 1
                    let i = Math.floor(Math.random() * outcomes.pos.length);
                    desc = outcomes.pos[i];
                } else if (ranIn >= 5 && ranIn <= 9) { // If number is between 2 and 3
                    let i = Math.floor(Math.random() * outcomes.neu.length);
                    desc = outcomes.neu[i];
                } else if (ranIn >= 10 && ranIn <= 11) { // If number is between 4 and 5
                    let i = Math.floor(Math.random() * outcomes.neg.length);
                    desc = outcomes.neg[i];
                }
                msg.channel.send('"' + args + '"\n8-Ball says: *' + desc + '*');
            }
            if (args.length === 0) {
                msg.channel.send("You need to ask the Magic 8Ball a question, silly!");
            } else {
                console.log("Running cooldown control");
                coolDownControl(msg, ballCD, 'Sorry, the Magic 8Ball needs time to cool down!', 30, command);
            }
        }
    },
    'stab': {
        fn: msg => {
            let imgs = ['pic0.png', 'pic1.gif', 'pic2.png', 'pic3.png', 'pic4.png', 'pic5.gif', 'pic6.png', 'pic7.png'];
            let command = () => {
                let embed = new Discord.RichEmbed().setImage(imgPath + 'stab/' + imgs[stabIndex]);
                if (stabIndex < imgs.length - 1) {
                    stabIndex++;
                } else stab = 0;
                msg.channel.send(embed);
            }
            coolDownControl(msg, stabCD, 'I can\'t PRESSURE too quickly!', 60, command);
        }
    },
    'stop': {
        fn: msg => {
            let embed = new Discord.RichEmbed().setImage(imgPath + 'stop.gif');
            msg.channel.send(embed);
        }
    },
    'cati': {
        fn: msg => {
            let embed = new Discord.RichEmbed().setImage(imgPath + 'illumicati.gif');
            msg.channel.send(embed);
        }
    },
    'strike': {
        /**
         * Give a mentioned user a strike
         */
        fn: (msg, args) => {
            let ids = ['290203577236848640', '166672575915753473', '365970141768450058', '518190826933977099', '266755300206313473']
            let str = args.split(' ');
            let id = str[0];
            let tag;
            let reason = '';
            let match = false;
            for (let i = 0; i < ids.length; i++) {
                if (ids[i] === msg.author.id) {
                    match = true;
                    console.log('Matched');
                }
            }
            // If the user who did the strike matched, allow them to perform the strike
            if (match) {
                let staffChannel = msg.guild.channels.find(val => {
                    return val.name === 'staff_room';
                });
                if (args === '') {
                    
                    msg.delete();
                    staffChannel.send('Oops, looks like a little accident happened! You got to make sure to include a @user when issuing a strike.\nAs a reminder, the command is:\n\`\`\`!strike <@username#0000> <Reason (optional).>\`\`\`');
                } else {
                    try {
                        tag = msg.mentions.users.first().tag;
                        for (let i = 1; i < str.length; i++) {
                            reason += str[i] + ' ';
                        }
                        database.addStrike(msg, id, tag, reason); // Add the strike
                    } catch (err) {
                        console.log("Error with strike: " + err);
                        msg.delete();
                        staffChannel.send("Oops, looks like the user wasn't tagged, or something else happened.\nAs a reminder, the command goes:\n\`\`\`!strike <@user#0000> <Reason (optional>\`\`\`");
                    }

                }
            } else {
                // If not, delete the message. Pretend it never happened.
                setTimeout(() => {
                    msg.delete();
                    console.log('Unauthorized used of !strike. Removing.');
                }, 100);
            }
        }
    },
    'snap': {
        fn: msg => {
            let phrase = 'feelsogood';
            let spaced = '';
            for (let i = 0; i < phrase.length; i++) {
                spaced += phrase[i] + ' '.repeat(i);
            }
            msg.channel.send('Ummm, ' + msg.member + ', I don\'t ' + spaced);
        }
    },
    'happy': {
        fn: msg => {
            // Encapsulate to make sure it stays on cooldown
            let command = () => {
                // This will initiate in any case
                function msgChannel() {
                    let songChoice = songList[songIndex];
                    msg.channel.send("Oh! Happy songs? I got one!\n" + songChoice.song + " - " + songChoice.artist + " (" + songChoice.link + ")");
                    if (songIndex < songList.length - 1)
                        songIndex++;
                    else
                        songIndex = 0;
                }

                // This will run if the user does not exist in the database
                function userDoesNotExist() {
                    msgChannel();
                    msg.author.send("Psst. Here's a list of all of the songs if you're curious:\n" + songList.map(i => {
                        return i.song + " - " + i.artist + " (" + i.link + ")\n"
                    }).join(''));
                }

                database.happyCheck(msg.author, msgChannel, userDoesNotExist);
            }
            coolDownControl(msg, happyCD, "Hey hey, a bit too excited, huh?", 900, command)
        }
    },
    'joy': {
        fn: msg => {
            msg.channel.send("Did you remember to take your J͢ǫ̵y͞ t̛ǫ̕d̵͠ą̶y̷̨͠?̶");
        }
    },
    'waa': {
        fn: msg => {
            msg.channel.send('WAAAAAAAAH!');
        }
    },
    'water': {
        fn: msg => {
            let whiteListChannel = 'secret-garden';
            let seeds = [
                'OwO',
                'Blue Jazz',
                'Ancient Fruit',
                'lovely bunch of coconuts',
                'bouquet of Lavender',
                'Stardew Valley Farming Spreadsheet',
                'Cabbage Patch Kids...?',
                'Starfruit',
                'Roses',
            ];
            let ran = Math.floor(Math.random() * seeds.length);
            if (msg.channel.name === whiteListChannel) {
                msg.channel.send("You water the garden...");
                setTimeout(() => {
                    msg.channel.send("What grew? A " + seeds[ran] + "!");
                }, 1000);
            }
            else {
                return;
            }
        }
    }
}
