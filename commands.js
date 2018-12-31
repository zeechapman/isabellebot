const Discord = require('discord.js');
const client = new Discord.Client(); // Just in case I need this.  Looked cute, but might delete later

// Global variables
let isabelle = "<@523039317036368105>"; // Identify itself
let chara = false;
let critHappened = false;

module.exports = {
    // ---!sa commands
    /**
     * Show a list of commands
     */
    showCommands: function (msg) {
        let str = "\n\n- !sa help --- A list of commands.  I'm sorry, I'm a bit repetitve sometimes!  Haha\n- !sa sendhelp --- If you or someone is feeling a bit down, I'll do what I can to help!\n- !sa info --- Information about me!"
        let footer = "There's this weird blue guy that took my exclamation, so remember to use \"!sa\" at the start to call me!";
        let embed = new Discord.RichEmbed().setTitle("Oh, hello!").setDescription("Good to see you!  I'm Isabelle, and I'm here to help when you need it!\nWhenever you need me, you can always say:" + str).setColor(0xB5E8F2).setFooter(footer);
        let embed2 = new Discord.RichEmbed().setColor(0xB5E8F2).setTitle("Oh, I almost forgot!  You can also use:\n").setDescription("- !caw --- Caw caw, baby! :bird:\n- !fliptable --- For mobile users who need to flip a table, or a person (not for real please)\n- !fixtable --- Fix a flipped table\n- !phil --- Needs more Phil\n- !poke <person> --- Poke your friends!  Or me \u{1F628}\n- !rip --- Press F to pay respects\n- !trip --- Pay respects for Josh Jrs' typo\n- !nani --- NANI??\n- !rave --- Summon a quick rave (careful with it...)\n- !hug <person> --- Give someone a hug! \u{1F495}\n- !isawthat --- Call out a ninja edit.").setFooter("The blue man didn't take those, thank goodness.");
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
            .setTitle("Oh, info?  About me? \u{1F495}")
            .setDescription("I'm from Lady Goggle's lovely stream, here to help out the best that I can!  I was developed by <@518190826933977099> (aka Bound).  Enjoying my company?  I'm glad!")
            .setThumbnail("https://raw.githubusercontent.com/zeechapman/isabellebot/master/isabelle-pic.png");
        msg.channel.send(embed);
    },
    update: function(msg) {
        let str =   '**New commands!**\n' +
                    '- *!sa update* --- The command you\'re reading right now!  Shows last (major) update\n' +
                    '- *!isawthat* or *!sawthat* --- Call out on a ninja edit ( ͡~ ͜ʖ ͡°)\n' +
                    '**Updated commands**\n' +
                    '- *!tableflip* --- Now you can flip a person...which I don\'t recomend, please!  Also, random chance for special flips added (1 in 6 chance, same as criticals)\n' +
                    ''
        let embed = new Discord.RichEmbed()
            .setTitle("Updates!")
            .setDescription(str)
            .setColor(0x00b300);
        msg.channel.send(embed);
    },
    // Normal commands.  Usually reflects Goggle's stream

    // Caw caw, baby! \u{1F426}
    cawCaw: function (msg) {
        msg.channel.send("Caw caw, baby! <:caw:477160191029280769>");
    },
    // Table flip (anger)
    flipTable: function (msg, arg) {
        let faces = ['(╯˘ ᵕ˘）╯︵ ┻━┻', '(╯˘꒳˘）╯︵ ┻━┻', '(/¯◡ ‿ ◡)/¯ ~ ┻━┻', '┬─┬ ︵ /(.□. ﾉ）\n(wait wut)']; // Extra faces
        let num = Math.floor(Math.random() * 6);
        let num2 = Math.floor(Math.random() * 3); // Need to rename these variables
        let numFace = Math.floor(Math.random() * faces.length); // Random face picker
        let sender = msg.member;

        if (num === 5) {
            critHappened = true;
            msg.channel.send("**CRIT**\n┻━┻ ︵ヽ(`Д´)ﾉ︵ ┻━┻");
        } else {
            if (arg.length === 0) {
                if (num2 === 2) {
                    msg.channel.send(faces[numFace]); // Fancy faces
                }
                else {
                    msg.channel.send("(╯°□°）╯︵ ┻━┻");
                }
            } else if (arg.toString() === sender.toString()) {
                msg.channel.send("**SHADOW COUNTER**\n┬─┬ ︵ /(.□. ﾉ)");
            } else {
                msg.channel.send(sender + ' flips ' + arg + ' over.\n' + sender + ' (╯°Д°）╯︵ /(.□ . \) '  + arg);
            }
        }
    },
    // Table flip (reverse anger)
    fixTable: function (msg) {
        let num = Math.floor(Math.random() * 6);
        if (critHappened === true) {
            msg.channel.send("**COUNTER**\n┬──┬ ︵ヽ( ゜- ゜)ﾉ︵ ┬──┬");
            critHappened = false;
        } else {
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
    // Inside joke sort of
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
        let emotes = ["<:LadyG:426153954703835137>", "<:caw:477160191029280769>", "<:pusheenblob:406307734267494410>", "<:halo:491761775440560138>", "<:grump:491761231711961120>", "<:frisk:467196742438354969>", "<:Isabelle:512143594187128832>", "<:bongo:505545336274550806>", "<:derp:406307417584959489>", "<:chara:524041640948531210>"];
        let ran = Math.floor(Math.random() * emotes.length); // Randomly generate a number between 0 and (length of emotes array)
        // If Frisk is the picked emote, then replace with nothing as he's dead
        if (ran === 5 && chara === true) {
            msg.channel.send(left + right + "\n*but nobody came...*");
        } else {
            msg.channel.send(left + emotes[ran] + right);
        }
        // If Chara is picked, plant the seed
        if (ran === 9 && chara === false) {
            chara = true; // The seed
            setTimeout(() => {
                // Warn the user
                emb = new Discord.RichEmbed().setColor(0x8D0000).setDescription("The seed...has been planted...").setImage('https://raw.githubusercontent.com/zeechapman/isabellebot/dev/chara-wide.png');
                msg.channel.send(emb);
            }, 1000);
        }
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
    iSawThat: function(msg) {
        let preMsg = ['I saw that edit! ', 'Is that a...NINJA EDIT? ', 'Nice edit you did there...'];
        let lennys = ['(͠≖ ͜ʖ͠≖)', '( ͡~ ͜ʖ ͡°)', '( ͡◉ ͜ʖ ͡◉)', '( ͡° ͜ʖ ͡°)']
        let pre = Math.floor(Math.random() * preMsg.length);
        let len = Math.floor(Math.random() * lennys.length);
        msg.channel.send(preMsg[pre] + lennys[len]);
    }
}