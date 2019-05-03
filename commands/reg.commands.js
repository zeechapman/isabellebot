// Discord still needs to be imported here
const Discord = require('discord.js');
const database = require('./firebase/firebase');

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

let stabIndex = Math.floor(Math.random() * 5); // The index of the current stab image
let musicIndex = Math.floor(Math.random() * 2);
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
            let timeStr = timeRemaining.toString();
            if (timeRemaining < 10000) {
                msg.channel.send(cdMsg + '\nTime remaining: ' + timeStr.substr(0, 1));
            } else {
                msg.channel.send(cdMsg + '\nTime remaining: ' + timeStr.substr(0, 2));
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

            coolDownControl(msg, ballCD, 'Sorry, the Magic 8Ball needs time to cool down!', 30, command);
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
                if (args === '') {
                    let staffChannel = msg.guild.channels.find(val => {
                        return val.name === 'staff_room';
                    });
                    msg.delete();
                    staffChannel.send('Oops, looks like a little accident happened! You got to make sure to include a @user when issuing a strike.\nAs a reminder, the command is:\n\`\`\`!strike <@username#0000> Reason (optional).\`\`\`\nAlso, post it in #staff_room so no one can be yelled at specifically for issuing a strike. Thank you :)');

                } else {
                    tag = msg.mentions.users.first().tag;
                    for (let i = 1; i < str.length; i++) {
                        reason += str[i] + ' ';
                    }
                    database.addStrike(msg, id, tag, reason); // Add the strike
                }
            } else {
                setTimeout(() => {
                    // If not, delete the message. Pretend it never happened.
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
            // List of random songs to select from
            let songs = [
                'https://www.youtube.com/watch?v=ZbZSe6N_BXs',
                'https://www.youtube.com/watch?v=L3HQMbQAWRc',
                'https://www.youtube.com/watch?v=wRWq53IFXVQ',
                'https://www.youtube.com/watch?v=V1bFr2SWP1I',
                'https://www.youtube.com/watch?v=s7dTBoW5H9k',
                'https://www.youtube.com/watch?v=n0pezsVK8gQ',
                'https://www.youtube.com/watch?v=tHJbQ5NH2c4'
            ];
            msg.channel.send('Oh! Someone need a happy song? I got one!\n' + songs[musicIndex]);
            if (musicIndex < songs.length - 1)
                musicIndex++;
            else
                musicIndex = 0;
        }
    }
}
