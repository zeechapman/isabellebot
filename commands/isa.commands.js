const Discord = require('discord.js');

// As soon as the app starts, get the time it was first booted.
let date = new Date();
let hour = date.getHours();
let minutes = date.getMinutes();
let month = date.getMonth() + 1;
let day = date.getDate();

let isaCommands = [
    "- !sa help --- To bring up the commands list!",
    "- !sa sendhelp -- If you, or someone is feeling down, I can provide resources to help!",
    "- !sa update --- Patch notes for the latest update.",
    "- !sa info --- Info about me, and credits!"
]

let regCommands = [
    "- !caw --- Caw caw, baby!",
    "- !badum --- Ba dum tss",
    "- !fliptable --- For mobile users that want to flip a table.",
    "- !fixtable --- For mobile users that want to fix a table.",
    "- !phil --- Needs more Phil",
    "- !rip --- Press F to pay respects",
    "- !trip --- Pay respects for Josh Jrs' typo",
    "- !nani --- NANI??",
    "- !hug <person> --- Give someone a hug! \u{1F495}",
    "- !isawthat --- Call out a ninja edit.",
    "- !8ball <question> --- Consult the magic 8Ball! (30 sec cooldown)",
    "- !stab --- **28 STAB WOUNDS** (one min cooldown)",
    "- !stop --- It's time to stop!",
    "- !cati --- Summon the Illumicati!",
    "- !snap --- Don't do it \u{1F628}",
    "- !happy --- Get a happy song! Feel like you're missing out? It will DM you the list too!"
]

let update = {
    date: "05/04/19",
    description:
        "**Psst...update! (again)**\n" +
        "- `!happy` is temporarily disabled to make it better. Don't worry, you'll be getting your happy soon.\n" +
        "- *(That was not planned)*"
}

exports.module = {
    "help": {
        fn: msg => {
            let isaList = '';
            let regList = '';

            for (let i = 0; i < isaCommands.length; i++)
                isaList += isaCommands[i] + '\n';

            for (let i = 0; i < regCommands.length; i++)
                regList += regCommands[i] + '\n';

            let embed = new Discord.RichEmbed().setTitle("Oh, hello!").setDescription("Hello, I'm Isabelle Bot, here to help! I can do all sorts of commands, such as:\n" + isaList).setColor(0xb7ab01);
            let embed2 = new Discord.RichEmbed().setTitle("Oh, I almost forgot!").setDescription("Other commands I know are:\n" + regList);

            msg.channel.send(embed);
            setTimeout(() => {
                msg.channel.startTyping();
                setTimeout(() => {
                    msg.channel.stopTyping();
                    msg.channel.send(embed2);
                }, 500);
            }, 1500);
        }

    },
    "update": {
        fn: msg => {
            let embed = new Discord.RichEmbed().setTitle(update.date).setDescription(update.description).setColor(0x19bc00);
            msg.channel.send(embed);
        }
    },
    "sendhelp": {
        fn: msg => {
            let str = "Oh my!  Are you okay?  I'll do my best to help!  Please refer to these resources:\n- Suicide prevention hotline: 1-800-273-8255\n- Crisis Text Line: Text HOME to 751-751, or for more options, go to https://www.crisistextline.org/faq\n- https://suicidepreventionlifeline.org/\n- http://www.takethis.org/mental-health-resources/\n- https://www.imalive.org/\n- https://drive.google.com/file/d/0B6A2F5ky9SELU0Zfd05YMEpyNUk/view\n- http://philome.la/jace_harr/you-feel-like-shit-an-interactive-self-care-guide\n- https://checkpoint.org.au/global/\nYou are very much loved, and I apperciate you being here.  We all do! \u{1F495}";
            let embed = new Discord.RichEmbed().setTitle("Need Help?").setColor(0xE7525D).setDescription(str);
            msg.channel.send(embed);
        }
    },
    "info": {
        fn: msg => {
            let embed = new Discord.RichEmbed().setTitle("Info? About me?").setDescription("I was developed by <@518190826933977099>, aka Bound. The Twitch version? That's Lady Goggles. If you're the curious type and want to see behind the scenes on me, checkout: https://github.com/zeechapman/isabellebot").setColor(0xb7ab01).setThumbnail('https://raw.githubusercontent.com/zeechapman/isabellebot/dev/img/isabelle-pic.png');
            msg.channel.send(embed);
        }
    },
    "test": {
        fn: msg => {
            let bootDay = month + "/" + day;
            let bootTime = hour + ":" + minutes;
            msg.channel.send("I've been running since:\n" + bootDay + " at " + bootTime);
        }
    }
}
