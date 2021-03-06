/**
 * Greetings, curious one. I appreciate you taking the time to look at my code.
 * 
 * As of 08/19/2019, I figured it was time to do yet another clean up of my code.
 * As of right now, there isn't too many issues with what I have down. The big issue
 * is mostly disorganized, and a lot of my code is repeated when I can easily make
 * functions out of a lot of the code. Such as for example, the commonly used
 * ```msg.channel.send()``` line of code.
 * 
 * For the time being though, I just got back into school, and a lot of irl drama
 * is happening with me. It took me at least a couple of days the first time I
 * re-did everything, but this may take a lot more work.
 * 
 * Feel free to browse for now. Just know that I do know that there's a lot I
 * could condense my code down to.
 */

const Discord = require('discord.js');
const database = require('./firebase/firebase');
const songList = require('./songs');

// List of useable emotes
let emotes = {
    'caw': '<:caw:696212943871803393>',
    'thisisfine': '<:this_is_fine:696212488303280209>'
}

let seeds = [
    'Some Blue Jazz.',
    'An Ancient Fruit.',
    'A lovely bunch of coconuts.',
    'A bouquet of Lavender.',
    'Devils Fingers...or is that a Demogorgon?',
    'XP Orb. ' + (Math.floor(Math.random() * 100) * 10) + ' Experience gained!',
    'A...oh, what\'s this? OwO',
    'A Stardew Valley Farming Spreadsheet.',
    'NaN undefined!',
    'Um...Cabbage Patch Kids...?',
    '28 STAB WOUNDS',
    'A thing grew. What grew? A thing grew. What grew? A thing grew. What grew? A thing grew. What grew? A thing grew. What grew? **__Recursion.__**',
    'Lewis\' secret friend gift from Lewis!',
    'A Partridge in a Pear tree!',
    'Exactly ' + Math.floor(Math.random() * 999999999) + ' grains of dirt.',
    'Another watering can...?',
    'A garden! ...wait...',
    'An idea!',
    'A corrupted ███████████████████████████',
    'A copy of E.T. for the Atari 2600',
    'A lost soul. It faded away.',
    'A Rare Candy. Level up!',
    'A Banananana Nut.',
    'Nothing, the water evaporated. ¯\\_(ツ)_/¯',
    'A lost library book.',
    'Nothing, because you forgot to fill your watering can.',
    'A mirror!rorrim A',
    '```Missingno     aaa0\nA?,OK   ;  jbr//\n           POKEDéX```',
    'A square Watermelon!',
    'Walnuts, Peanuts, Pineapple smells, along the rest of the D.K. crew',
    'An Oak Tree. That was fast!',
    'An Alolan Exeggutor. That counts as a tree, right?',
    'Jazzberries!',
    'Snozberries!',
    'A Money Bush! Oh wait, it\'s Monopoly money.',
    'An axe! Someone burried the hatchet, and it came back it seems.',
    'A new leaf!',
    'An invitation...is someone going to be in Smash?',
    '||       ||!',
    'ANOTHER SETTLEMENT NEEDS OUR HELP',
    'An Apple...laptop?',
    'A rock.',
    'Hey, Vsauce! Michael here.',
    'A reference to a game!',
    'A Sunflower!',
    'A Peashooter!',
    'A copy of Plants Vs Zombies!',
    'Animal Crossing!',
    'A...um...let\'s pretend that never was there.',
    'A pun!',
    'A Korok seed!\n(1/900)',
    'A thumb...strangely, it\'s green.',
    'An AOL free trial CD!',
    'Water!',
    'Lavendar! Oh wait, it\'s mispelled.',
    'A stale meme!',
    'A skeleton from Dark Sou--OH GOD, RUN!',
    'A Katamari!',
    'A Tomato. The vegatable...?',
    'Cilantro-scented soap bars!',
    'You water the garden......',
    'A random outcome!',
    'A seed!'
];

let seedIndex = 9999999; // Counts position in seeds[]. Number set high so it can be shuffled initially.

// Dad Bot variables
let dadReroll = () => {
    return Math.floor(Math.random() * 30) + 15;
}
let dadCount = 0; // Number of times a dad joke could initiate 
let dadLimit = dadReroll();
let dadBypass = false; // Certain instances can cause Dad Bot to go off

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

// Pattern check
let lastSeeds = [];
let lastTest = [];
// Channels
let channels = {
    softSpace: 'the-soft-space'
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
            if (cdMsg === '' || cdMsg === null) {
                // Don't do anything if no message was written
                return;
            } else {
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
        }
        else {
            cdObj.cdLast = new Date().getTime();
            fn();
        }
    }
}


/**
 * Shuffle the array using the Fisher-Yates algorithm
 * @param {Array} arr Array to shuffle
 */
function shuffle(arr) {
    let j, x;
    for (let i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = arr[i];
        arr[i] = arr[j];
        arr[j] = x;
    }
    return arr;
}

exports.module = {
    // Because of a special case, Dad Bot is being thrown in here
    // Just posts the message, and checks if it's not in soft-space
    'dad': {
        fn: msg => {
            // let command = () => {
            let str = msg.content.split(' '); // Split the string
            let conStr = ''; // Blank string to 'string' together (ha, get it? Dad joke)
            let result = '';
            let thumbnail = 'dadbot-thumbnail.png';
            let footer = '~Dad';
            let embed = new Discord.RichEmbed();

            // As requested, blacklist Dad Bot from triggering on certain people.
            let blacklist = ['256537367308009473', '262752361959784458'];
            let blMatch = false;

            for (let i = 0; i < blacklist.length; i++) {
                if (blacklist[i] === msg.author.id) {
                    blMatch = true;
                    console.log("\n\nDad Bot: Blacklisted count. Not counted for.\n\n")
                }
            }

            let msgSend = () => {
                msg.channel.send(embed.setThumbnail('https://raw.githubusercontent.com/zeechapman/isabellebot/dev/img/' + thumbnail).setDescription(result).setFooter(footer));
            }

            for (let i = 1; i < str.length; i++) {
                // If the end is reached, don't add a space
                if (i === str.length - 1) {
                    conStr += str[i];
                } else {
                    conStr += str[i] + ' ';
                }
            }

            // Bypassable limit. Will not break current limit or add to it
            if (conStr.toUpperCase() === 'DAD') {
                // If the user types in Dad
                result = "No you're not. I'm Dad!";
                dadBypass = true;
            } else if (conStr.toUpperCase() === 'MOM') {
                // If the user types in Mom
                result = 'MOMMAAAAAAAAAAAA\n*OOOO-OO-OOOOOOO*';
                dadBypass = true;
            } else if (conStr.toUpperCase() === 'ISABELLE') {
                // If the user types in Isabelle
                result = "Hello! I'm Isabelle! Nice to meet you.";
                footer = "~Isabelle Bot";
                // This picture may change later. Can't decide if I want Isabelle on Dad Bot, or Dad Bot on Isabelle
                thumbnail = 'unspeakable.png';
                dadBypass = true;
            } else {
                // Normal result
                result = 'Hello, ' + conStr + ". I'm Dad!";
            }
            if (blMatch) {
                return;
            } else if (msg.channel.name === channels.softSpace) {
                return;
            } else {
                if (dadBypass === false) {
                    dadCount++;
                    console.log("Dad moment happened!\nCount: " + dadCount + "\nLimit: " + dadLimit);
                    if (dadCount > dadLimit) {
                        if (conStr.length > 100) {
                            return;
                        } else {
                            msgSend();
                            dadCount = 0;
                            dadLimit = dadReroll();
                        }
                    }
                } else {
                    msgSend();
                    dadBypass = false;
                }
            }
        }
    },
    // Caw caw, baby
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
            if (msg.channel.name === channels.softSpace)
                // If the command is used in one of the blacklisted channels,
                // then don't allow the bot to do anything
                return;
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
            let ids = ['290203577236848640', '166672575915753473', '365970141768450058', '518190826933977099', '266755300206313473', '184462208426573825', '167438798114914304']
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
                        if (reason.length === 0) {
                            reason = 'N/A';
                        }
                        staffChannel.send("A strike has been given by " + msg.author + " to " + tag + " for the following reason:\n\`\`\`" + reason + "\`\`\`");
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
    'waa': {
        fn: msg => {
            msg.channel.send('WAAAAAAAAH!');
        }
    },
    'water': {
        fn: msg => {
            if (seedIndex >= seeds.length - 1) {
                shuffle(seeds);
                seedIndex = 0;
            }
            msg.channel.send("You water the garden...");
            setTimeout(() => {
                msg.channel.send("What grew?");
                seedIndex++;
                setTimeout(() => {
                    msg.channel.send(seeds[seedIndex]);
                }, 1000);
            }, 1500);
        }
    },
}
