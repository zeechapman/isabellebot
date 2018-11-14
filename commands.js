const Discord = require('discord.js');
const client = new Discord.Client(); // Just in case I need this.  Looked cute, but might delete later
const counter = require('./counter');

module.exports = {
    // ---!sa commands
    /**
     * Show a list of commands
     */
    showCommands: function (msg) {
        let str = "\n\n- !sa help --- A list of commands.  I'm sorry, I'm a bit repetitve sometimes!  Haha\n- !sa sendhelp --- If you or someone is feeling a bit down, I'll do what I can to help!\n- !sa info --- Information about me!"
        let footer = "There's this weird blue guy that took my exclamation, so remember to use \"!sa\" at the start to call me!";
        let embed = new Discord.RichEmbed().setTitle("Oh, hello!").setDescription("Good to see you!  I'm Isabelle, and I'm here to help when you need it!\nWhenever you need me, you can always say:" + str).setColor(0xB5E8F2).setFooter(footer);
        let embed2 = new Discord.RichEmbed().setColor(0xB5E8F2).setTitle("Oh, I almost forgot!  You can also use:\n").setDescription("- !caw --- Caw caw, baby! :bird:\n- !fliptable --- For mobile users who need to flip a table (not for real please)\n- !fixtable --- Fix a flipped table\n- !phil --- Needs more Phil\n- !poke --- Poke your friends!  Or me \u{1F628}\n- !rip --- Press F to pay respects\n- !nani --- NANI??\n- !rave --- Summon a quick rave").setFooter("The blue man didn't take those, thank goodness.");
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
            .setDescription("I'm from Lady Goggle's lovely stream, here to help out the best that I can!  I was developed by < not bound > (aka Bound).  Enjoying my company?  I'm glad!")
            .setThumbnail("https://raw.githubusercontent.com/zeechapman/isabellebot/master/isabelle-pic.png");
        msg.channel.send(embed);
    },
    // Normal commands.  Usually reflects Goggle's stream
    // Caw caw, baby! \u{1F426}
    cawCaw: function (msg) {
        msg.channel.send("Caw caw, baby! <:caw:477160191029280769>");
    },
    // Table flip (anger)
    flipTable: function (msg) {
        msg.channel.send("(╯°□°）╯︵ ┻━┻");
    },
    // Table flip (reverse anger)
    fixTable: function (msg) {
        msg.channel.send("┬──┬ ノ( ゜-゜ノ)");
    },
    // Needs more phill
    phil: function (msg) {
        msg.channel.send("Needs more Phil.");
    },
    // Press F to pay respects, with the ability to count how many "F's" there are.
    payRespects: function (msg) {
        msg.channel.send("Press F to pay respects");
    },
    naniCommand: function(msg) {
        let phrases = ["*steps back in shock*\nNANI??", "*surprised, stepped back*\nNANI??", "*suddenly tenses up*\nNANI??", "*jolts head backwards*\nNANI??"];
        let ran = Math.floor(Math.random() * phrases.length);
        msg.reply(phrases[ran]);
    },
    raveCommand: function(msg) {
        // Glowsticks
        let left = "<:glo1:512309043671597066>";
        let right = "<:glo2:512309060461264897>";
        // List of emojis in the server
        let emotes = ["<:LadyG:426153954703835137>", "<:caw:477160191029280769>", "<:pusheenblob:406307734267494410>", "<:halo:491761775440560138>", "<:grump:491761231711961120>", "<:frisk:467196742438354969>", "<:Isabelle:512143594187128832>", "<:bongo:505545336274550806>", "<:derp:406307417584959489>"];
        let ran = Math.floor(Math.random() * emotes.length); // Randomly generate a number between 0 and (length of emotes array)
        msg.channel.send(left + emotes[ran] + right);
    }
}