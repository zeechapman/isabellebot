const Discord = require('discord.js');
// Just in case I need this.  Looked cute, but might delete later
const client = new Discord.Client();
module.exports = {
    // ---!sa commands
    /**
     * Show a list of commands
     */
    showCommands: function (msg) {
        let str = "\n\n- !sa help --- A list of commands.  I'm sorry, I'm a bit repetitve sometimes!  Haha\n- !sa sendhelp --- If you or someone is feeling a bit down, I'll do what I can to help!\n- !sa info --- Information about me!"
        let footer = "There's this weird blue guy that took my exclamation, so remember to use \"!sa\" at the start to call me!";
        let embed = new Discord.RichEmbed().setTitle("Oh, hello!").setDescription("Good to see you!  I'm Isabelle, and I'm here to help when you need it!\nWhenever you need me, you can always say:").setColor(0xB5E8F2).setDescription(str).setFooter(footer);
        let embed2 = new Discord.RichEmbed().setColor(0xB5E8F2).setTitle("Oh, I almost forgot!  You can also use:\n").setDescription("- !caw --- Caw caw, baby! :caw:\n- !fliptable --- For mobile users who need to flip a table (not for real please)\n- !fixtable --- Fix a flipped table\n- !phil --- Needs more Phil\n- !poke --- Poke your friends!  Or me \u{1F628}\n- !rip --- Press F to pay respects").setFooter("The blue man didn't take those, thank goodness.");
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
            .setDescription("I'm from Lady Goggle's lovely stream, here to help out the best that I can!  I was developed by < not bound > (aka Bound).\nIf you're one of those programmer types that wants to see how I'm built visit [the Github Repo](https://github.com/zeechapman/isabellebot) (whatever that is).")
            .setThumbnail("https://raw.githubusercontent.com/zeechapman/isabellebot/master/isabelle-pic.png");
        msg.channel.send(embed);
    },
    // --- Normal commands.  Usually reflects Goggle's stream
    // Caw caw, baby! \u{1F426}
    cawCaw: function (msg) {
        msg.channel.send("Caw caw, baby! :caw:");
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
    payRespects: function (msg, rc) {
        msg.channel.send("Press F to pay respects\nTotal respects paid: " + rc);
    }
}