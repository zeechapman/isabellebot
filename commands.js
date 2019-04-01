// TODO: Make cooldown a function to shorthand everything
const Discord = require('discord.js');

// Global variables
let isabelle = "<@523039317036368105>"; // Identify itself
let chara = false;
let critHappened = false;

let ballCD = false;
let ballDate = new Date();
let ballLast = ballDate.getTime();

let connorCD = false;
let connorDate = new Date();
let connorLast = connorDate.getTime();

let imgPath = 'https://raw.githubusercontent.com/zeechapman/isabellebot/dev/img/stab/';
let stab = Math.floor(Math.random() * 8); // Index of stab image, randomly decided

// APRIL FOOLS DAY
let animalIndex = 0;
let stopCount = 0;

module.exports = {
    // ---!sa commands
    /**
     * Show a list of commands
     */
    showCommands: function (msg) {
        let isaCommands = "- !sa help --- A list of commands" +
            "\n- !sa sendhelp --- If you, or someone is feeling down, I have some resources that might help." +
            // "\n- !sa info --- Information about me!";
            "\n- !sa info --- Information about me...or rather, Isabelle.";

        let commands = "- !caw --- Caw caw, baby <:caw:477160191029280769>" +
            "\n- !fliptable / !tableflip --- For mobile users that want to flip a table. Not for real please." +
            "\n- !fixtable / !tablefix --- For mobile users that want to fix a table. Do it for real please, if one's flipped." +
            "\n- !phil --- Needs more Phil" +
            "\n- !poke <person> --- Poke your friends!  Or me \u{1F628}" +
            "\n- !rip --- Press F to pay respects" +
            "\n- !trip --- Pay respects for Josh Jrs' typo" +
            "\n- !nani --- NANI??" + 
            "\n- !rave --- Summon a quick rave" + 
            "\n- !hug <person> --- Give someone a hug! \u{1F495}" +
            "\n- !isawthat / !sawthat --- Call out a ninja edit." + 
            "\n- !8ball <question> --- Consult the magic 8Ball! (30 sec cooldown)" +
            "\n- !stab --- **28 STAB WOUNDS** (one min cooldown)";
        // let footer = "There's this weird blue guy that is using exclamations, so remember to use \"!sa\" at the start to call me!";
        // let embed = new Discord.RichEmbed().setColor(0xffcc00).setTitle("Oh, hello!").setDescription("Good to see you! I'm Isabelle, and I'm here to help in any way I can! Some commands you can use:\n" + isaCommands);
        // let embed2 = new Discord.RichEmbed().setColor(0xffcc00).setTitle("Oh, by the way!").setDescription("I almost forgot! You can also use:\n" + commands);

        // April Fools
        let embed = new Discord.RichEmbed().setTitle("Oh um...hello!").setDescription("Hello, I'm Digby; Isabelle's brother. She wanted to take a break for a day, so I came in to help. I'll help where I can!\nAccording to my notes, there are a few commands I should mention, such as...\n" + isaCommands).setColor(0xcc0000);
        let embed2 = new Discord.RichEmbed().setTitle("Oh wait!").setDescription("Hold on, these notes were double-sided! Other commands you can do are...\n" + commands).setColor(0xcc0000);
        msg.channel.send(embed);
        setTimeout(() => {
            msg.channel.startTyping();
            setTimeout(() => {
                msg.channel.send(embed2);
                msg.channel.stopTyping();
            }, 1000);
        }, 2000);
    },
    /**
     * Send helpful resources when things are getting bad (depression, suicidal, etc)
     */
    sendHelp: function (msg) {
        let str = "Oh my!  Are you okay?  I'll do my best to help!  Please refer to these resources:\n- Suicide prevention hotline: 1-800-273-8255\n- https://suicidepreventionlifeline.org/\n- http://www.takethis.org/mental-health-resources/\n- https://www.imalive.org/\n- https://drive.google.com/file/d/0B6A2F5ky9SELU0Zfd05YMEpyNUk/view\n- http://philome.la/jace_harr/you-feel-like-shit-an-interactive-self-care-guide\n- https://checkpoint.org.au/global/\nYou are very much loved, and I apperciate you being here.  We all do! \u{1F495}";
        let richEmbed = new Discord.RichEmbed().setTitle("Need Help?").setColor(0xE7525D).setDescription(str);
        msg.channel.send(richEmbed);
    },
    poke: function (msg, arg) {
        // Random phrases
        let phrases = ["Hey, what's up " + arg + "?", "I'm sorry to bug you " + arg + ", but...hi.", "Heeeeyyy, are you paying attention " + arg + "?"];
        let num = Math.floor(Math.random() * phrases.length);

        if (arg.length > 0) {
            msg.channel.send(phrases[num]);
        } else {
            msg.channel.send("You poked me, Isabelle!  It tickeled, haha");
        }
    },
    info: function (msg) {
        let embed = new Discord.RichEmbed()
            .setTitle("Oh, info? About Isabelle?")
            // .setTitle("Oh, info?  About me? \u{1F495}")
            .setDescription("I'm from Lady Goggle's lovely stream, here to help out the best that I can!  I was developed by <@518190826933977099> (aka Bound).  Enjoying my company?  I'm glad!\nIf you're a curious type, you can view how I'm coded here: https://github.com/zeechapman/isabellebot")
            .setThumbnail(imgPath + "isabelle-pic.png");
        msg.channel.send(embed);
    },
    update: function (msg) {
        let str = '** I was...updated? **\n' +
            '*Digby is here!*\n' +
            '- Isabelle needed a break. So I\'m here instead! I...don\'t know who any of you are...\n' +
            '- I went ahead and fixed a few commands:\n' +
            '** FIXED COMMANDS **\n' +
            '- !caw\n' +
            '- !8ball\n' +
            '- !stop *(I guess this was never finished. Notes says it stopped working)*'
        let embed = new Discord.RichEmbed()
            .setTitle("Updates! (04/20/69)")
            .setDescription(str)
            .setColor(0x00b300);
        msg.channel.send(embed);
    },
    // Normal commands.  Usually reflects Goggle's stream
    // Caw caw, baby! \u{1F426}
    cawCaw: function (msg) {
        // msg.channel.send("Caw caw, baby! <:caw:477160191029280769>");
        
        // April Fools
        let outcomes = ['<:caw:477160191029280769> ybab, wac wac', 'Woof woof, baby \u{1F436}', 'Quack quack, baby \u{1F986}', 'Hoot hoot, baby \u{1F989}', 'SCREEEEECH, baby \u{1F985}', '!caw \u{1F99C}'];
        msg.channel.send(outcomes[animalIndex]);
        console.log(animalIndex);
        if (animalIndex < (outcomes.length - 1)) {
            animalIndex++;
        } else {
            animalIndex = 0;
        }
    },
    // Table flip (anger)
    flipTable: function (msg, arg) {
        let faces = ['(╯˘ ᵕ˘）╯︵ ┻━┻', '(╯˘꒳˘）╯︵ ┻━┻', '(/¯◡ ‿ ◡)/¯ ~ ┻━┻', '┬─┬ ︵ /(.□. ﾉ）(wait wut)']; // Extra faces
        let sender = msg.member;

        if (arg.length === 0) {
            // If the user hasn't provided an argument (name)
            let critRoll = Math.floor(Math.random() * 6);
            let faceRoll = Math.floor(Math.random() * 3);
            let numFace = Math.floor(Math.random() * faces.length); // Random face picker
            if (critRoll === 5) {
                // Crit did happen
                critHappened = true;
                msg.channel.send("**CRIT**\n┻━┻ ︵ヽ(`Д´)ﾉ︵ ┻━┻");
            } else if (faceRoll === 2) {
                // If fancy face is rolled
                msg.channel.send(faces[numFace]);
            } else {
                // Just normal flip
                msg.channel.send("(╯°□°）╯︵ ┻━┻");
            }
        } else if (arg.toString() === sender.toString()) {
            // If user tags themselves
            msg.channel.send("**SHADOW COUNTER**\n┬─┬  ︵  /(.□. ﾉ) " + sender);
        } else {
            // If user tags someone else
            msg.channel.send(sender + ' flips ' + arg + ' over.\n' + sender + ' (╯°Д°）╯︵ /(.□ .ﾉ) ' + arg);
        }
    },
    // Table flip (reverse anger)
    fixTable: function (msg) {
        if (critHappened === true) {
            // If a crit had already happened
            msg.channel.send("**COUNTER**\n┬──┬ ︵ヽ( ゜- ゜)ﾉ︵ ┬──┬");
            critHappened = false;
        } else {
            let num = Math.floor(Math.random() * 6);
            if (num === 5) {
                msg.channel.send('┬─────────────┬ ノ( ゜-゜ノ)\n*looong table*');
            } else {
                msg.channel.send("┬──┬ ノ( ゜-゜ノ)");
            }
        }
    },
    // Needs more phill
    phil: function (msg) {
        msg.channel.send("Needs more Phil.");
    },
    // Press F to pay respects
    payRespects: function (msg) {
        msg.channel.send("Press F to pay respects");
    },
    // Inside joke
    tripCommand: function (msg) {
        msg.channel.send("Press T to pay respects for Joshy");
    },
    // NANI????
    naniCommand: function (msg) {
        let phrases = ["steps back in shock*\nNANI??", "surprised, stepped back*\nNANI??", "suddenly tenses up*\nNANI??", "jolts head backwards*\nNANI??"];
        let sender = msg.member;
        let ran = Math.floor(Math.random() * phrases.length);
        msg.channel.send("*" + sender + " " + phrases[ran]);
    },
    raveCommand: function (msg) {
        // Glowsticks
        let left = "<:glo1:524424654065238026>";
        let right = "<:glo2:524424686122041365>";
        // List of emojis in the server
        let emotes = ["<:LadyG:426153954703835137>", "<:caw:477160191029280769>", "<:pusheenblob:406307734267494410>", "<:halo:491761775440560138>", "<:grump:491761231711961120>", "<:frisk:467196742438354969>", "<:Isabelle:512143594187128832>", "<:bongo:505545336274550806>", "<:derp:406307417584959489>"];
        let ran = Math.floor(Math.random() * emotes.length); // Randomly generate a number between 0 and (length of emotes array)
        msg.channel.send(left + emotes[ran] + right);
    },
    hugCommand: function (msg, arg) {
        let sender = msg.member;
        if (arg.length === 0) {
            // If nothing was entered
            msg.channel.send("You open your arms for a big hug \u{1F495}");
        } else if (arg.toString() === isabelle) {
            // If user tries to hug the bot
            msg.channel.send("You hug me!! \u{1F495}");
        } else if (arg.toString() === sender.toString()) {
            // If the user tries to hug themselves
            msg.channel.send("You wrap your arms around yourself.  Silly \u{1F495}");
        }
        // Easter egg time
        else if (arg.toString() === "toriel") {
            msg.channel.send("You hug the goat mom! \u{1F495}");
        } else if (arg.toString() === "asriel") {
            msg.channel.send("You hug the goat boy! \u{1F495}");
        } else if (arg.toString() === "ralsei") {
            msg.channel.send("You hug the fluffy boy! \u{1F495}")
        } else if (arg.toString() === "frisk") {
            msg.channel.send("You try to hug Frisk, but Toriel came in and beat you to it.  How sweet \u{1F495}");
        } else if (arg.toString() === "chara") {
            msg.channel.send("You hug...is that a knife?")
            setTimeout(() => {
                msg.channel.send("a̸͚̙͇̓ͭ͠ȁ̧̹͕̗̬͎̜̯͉̼ͤ̍̽͗͐ͤ̾a͔̝̼͊̽̊ͫͮ̆̏a̵̧̺̝̫͍̥̳͔͍̞ͥ̏ͩ̋̆̍͜a̡̱̳̙̰̓ͮ́̇̃͌͌͌ȃ̴̱̜͔̣͚̺̱͓̾̓͊̒͟͝a̴͚ͩ̍̍ͪ̎̓͆ͪ̿͢a̧̯̠̘̻̽̏ͯͥͭͫͯ̚ͅǎ̵̛̠͍̽͋͑̌̿̓ͦ́á̟̠̲̺̄̑̋̈́ͧͨ̾͐͘͘a̦̯̝͍̫͌ͥ͒̎̈́͜͞ạ̣̟͙̭ͧ̌̄͊̊́̚͜ͅả̴̯̤̙̤̱̀͌̄a̶̡̽̾ͫͩ͏͙̦a͖͕̝̠͍̺͍̅̿͋ͫ͂͋͜ͅă͉̻̜̱̟̹͉̮ͩ̌̇a͖̝̪͖͚̥̮̫̤̐̃̊ͤ̔̌̽ͯͮ̕a̧̨̺̻͖̟̹̻̞͛̈́͊ͮ̈́̋͗ȃ̭̺̙̩ą̗͎͓̺̖̺͚̗̩͆a̛̼͖̲ͫͦ̿̅́͝"); // Sorry
            }, 1000)
        }
        else {
            // If the user uses it to actually hug a person
            msg.channel.send(sender + " gives a big hug to " + arg + " \u{1F495}");
        }
    },
    // Call out someone ninja-editing their posts
    iSawThat: function (msg) {
        let preMsg = ['I saw that edit! ', 'Is that a...NINJA EDIT? ', 'Nice edit you did there...'];
        let lennys = ['(͠≖ ͜ʖ͠≖)', '( ͡~ ͜ʖ ͡°)', '( ͡◉ ͜ʖ ͡◉)', '( ͡° ͜ʖ ͡°)']
        let pre = Math.floor(Math.random() * preMsg.length);
        let len = Math.floor(Math.random() * lennys.length);
        msg.channel.send(preMsg[pre] + lennys[len]);
    },
    // Fire (this is fine dog) fire
    thisIsFine: function (msg) {
        let dog = "<:thisisfine:467198644823654402>";
        let fire = ":fire:";
        msg.channel.send(fire + dog + fire);
    },
    // Diceroll (with optional number choices)
    diceRoll: function (msg, arg) {
        let droll;
        // If nothing is put in for the arg, then have it be a d6 by default
        if (arg.length === 0) {
            droll = 6;
            let ran = Math.floor(Math.random() * droll + 1);
            msg.channel.send("You rolled a " + ran);
        } else {
            if (isNaN(arg) || arg <= 1) {
                msg.channel.send("Not a number, or too small!  Please try again.");
            } else {
                droll = arg;
                let ran = Math.floor(Math.random() * arg + 1);
                msg.channel.send("You rolled a " + ran);
            }
        }
    },
    eBall: function (msg, arg) {
        // Most 8 Balls don't have this many outcomes, so this may be changed in the future.
        // let outcomes = {
        //     "pos": [
        //         "It is certain.",
        //         "It is decidedly so.",
        //         "Without a doubt.",
        //         "Yes - definitely.",
        //         "You may rely on it.",
        //         "As I see it, yes.",
        //         "Most likely.",
        //         "Outlook good.",
        //         "Yes.",
        //         "Signs point to yes."],
        //     "neu": [
        //         "Reply hazy, try again.",
        //         "Ask again later.",
        //         "Better not tell you now.",
        //         "Cannot predict now.",
        //         "Concentrate and ask again."],
        //     "neg": [
        //         "Don't count on it.",
        //         "My reply is no.",
        //         "My sources say no.",
        //         "Outlook not so good.",
        //         "Very doubtful."]
        // };

        // APRIL FOOLS
        let outcomes = {
            'pos': [
                "Yeah, it looks like it.",
                "Wait, M. Bison says \"YESSSSSS\""
            ],
            "neu": [
                "I dunno. ¯\\_(ツ)_/¯",
                "Ummm...ask again in 30 seconds."
            ],
            "neg": [
                "Negative Option #22",
                "Signs point to a stop sign"
            ]
        }

        let command = () => {
            ballCD = true;
            ballLast = date.getTime(); // Get the time the command was initiated and set it globally
            // Generate a random number between 0 and 7
            let ran = Math.floor(Math.random() * 12);

            let desc = ""; // Blank on purpose

            if (ran <= 4) { // If number is between 0 and 1
                let i = Math.floor(Math.random() * outcomes.pos.length);
                desc = outcomes.pos[i];
            } else if (ran >= 5 && ran <= 9) { // If number is between 2 and 3
                let i = Math.floor(Math.random() * outcomes.neu.length);
                desc = outcomes.neu[i];
            } else if (ran >= 10 && ran <= 11) { // If number is between 4 and 5
                let i = Math.floor(Math.random() * outcomes.neg.length);
                desc = outcomes.neg[i];
            }
            let pre = arg.toString();
            msg.channel.send("\"" + arg + "\"\n8-Ball says: *" + desc + "*");
        };

        /* Cooldown control */
        let date = new Date();
        let ballNow = date.getTime();
        let ballBetween = ballNow - ballLast;
        if (arg.length === 0) { // If user didn't ask anything
            msg.channel.send("You got to ask the 8-Ball a question, silly!\n\`!8ball <Question>\`");
        } else {
            if (ballCD === false) {
                command();
            } else if (ballCD === true) {
                if (ballBetween <= 30000) {
                    // Something is not correct here in terms of seconds vs MS, so I will have to come back later and fix it
                    let timeRemaining = 30000 - ballBetween;
                    let timeStr = timeRemaining.toString();
                    if (timeRemaining <= 10000) {
                        msg.channel.send("The Magic 8-Ball needs time to cool down.\nTime remaining: " + timeStr.substring(0, 1) + " seconds.");
                    } else {
                        msg.channel.send("The Magic 8-Ball needs time to cool down.\nTime remaining: " + timeStr.substring(0, 2) + " seconds.");
                    }
                } else {
                    command();
                }
            }
        }
    },
    // Detroit: Become Human commands
    stabWounds: function (msg) {
        // Maybe one of these days, I will find 28 pictures to do
        let img = ['pic0.png', 'pic1.gif', 'pic2.png', 'pic3.png', 'pic4.png', 'pic5.gif', 'pic6.png', 'pic7.gif'];
        let date = new Date();
        let command = () => {
            connorLast = date.getTime();
            connorCD = true;
            let rich = new Discord.RichEmbed().setImage(imgPath + img[stab]).setDescription("**28 STAB WOUNDS**");
            if (stab < img.length - 1) {
                stab++; // Increment the stab image index counter
            } else stab = 0;
            msg.channel.send(rich);
        }
        let connorNow = date.getTime();
        let connorBetween = connorNow - connorLast;
        if (connorCD === false) {
            command();
        } else if (connorCD === true) {
            if (connorBetween <= 60000) {
                let timeRemaining = 60000 - connorBetween;
                let timeStr = timeRemaining.toString();

                if (timeRemaining < 10000) {
                    msg.channel.send("I can't *PRESSURE* too much. Just wait a bit.\n*Time remaining: " + timeStr.substring(0, 1) + " seconds*");
                } else {
                    msg.channel.send("I can't *PRESSURE* too much. Just wait a bit.\n*Time remaining: " + timeStr.substring(0, 2) + " seconds*");
                }
            } else {
                command();
            }
        }
    },
    // APRIL FOOLS
    thisDoesNotWork: () => {
        stopCount++;
    },
    countTheStops: (msg) => {
        msg.delete(); // Assuming Goggle's did give Isabell--I mean Digby administrator privellages
        msg.channel.send("April Fools day, everyone!\nEveryone in chat: IT'S TIME TO STOP! *x" + stopCount + "*\n");
    }
}
