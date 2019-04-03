const Discord = require('discord.js');

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
    "- !cati --- Summon the Illumicati!"
]

let update = {
    date: "04/03/19",
    description:
        "**A big update!**\n" +
        "I got **new shoes**! Oh, and I was re-worked a lot behind the scenes. I'll spare the boring details, and share the big changes.\n\n" +
        "**REMOVED COMMANDS**\n\n\`\`" +
        "- !rave --- It just wasn't used that often.\n" +
        "- !diceroll --- Rod took over, and that's okay!\`\`\n\n" +
        "**NEW COMMANDS**\n\n\`\`" +
        "- !badum --- Ba dum, tss.\n" +
        "- !thisisfine --- This is fine...\n" +
        "-- It's been in, but I forgot to mention it. Oops...\`\`\n\n" +
        "So there you have it. You can always view the full list by using \`!sa help\`. Have a good day, everybody!"
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
    }
}
