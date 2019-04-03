// List of useable emotes
let emotes = {
    "caw": '<:caw:477160191029280769>',
    "thisisfine": "<:thisisfine:467198644823654402>"
}

// function coolDownControl(cdBool, cdLast)

let critRoll = false;

exports.module = {
    "caw": {
        fn: msg => {
            msg.channel.send("Caw caw, baby! " + emotes.caw);
        }
    },
    "fliptable": {
        fn: msg => {
            let faces = ['(╯°□°）╯︵ ┻━┻', '(╯˘ ᵕ˘）╯︵ ┻━┻', '(╯˘꒳˘）╯︵ ┻━┻', '(/¯◡ ‿ ◡)/¯ ~ ┻━┻', '┬─┬ ︵ /(.□. ﾉ）(wait wut)'];
            let critRoll = Math.floor(Math.random() * 6);
            if (critRoll === 5) {
                critHappened = true;
                msg.channel.send("**CRIT**\n┻━┻ ︵ヽ(`Д´)ﾉ︵ ┻━┻");
            } else {
                let faceChoice = faces[Math.floor(Math.random() * faces.length)]
                msg.channel.send(faceChoice);
            }
        }
    },
    "fixtable": {
        fn: msg => {
            if (critHappened === true) {
                msg.channel.send("**COUNTER**\n┬──┬ ︵ヽ( ゜- ゜)ﾉ︵ ┬──┬");
                critHappened = false;
            } else {
                msg.channel.send("┬──┬ ノ( ゜-゜ノ)");
            }
        }
    },
    "phil": {
        fn: msg => {
            msg.channel.send("Needs more Phil");
        }
    },
    "rip": {
        fn: msg => {
            msg.channel.send("Press F to pay respects");
        }
    },
    "trip": {
        fn: msg => {
            msg.channel.send("Press T to pay respects to Josh Jr.");
        }
    },
    "nani": {
        fn: msg => {
            let sender = msg.member;
            msg.channel.send("*" + sender + " steps back in shock.*\nNANI??");
        }
    },
    "hug": {
        fn: (msg, args) => {
            let sender = msg.member;
            if (args.length > 0) {
                msg.channel.send(sender + " gives a big hug to " + args + "\n(.づ◡﹏◡)づ.");
            } else {
                msg.channel.send(sender + " gives a big hug to everyone!\n(.づ◡﹏◡)づ.");
            }
        }
    },
    "isawthat": {
        fn: msg => {
            let preMsg = ['I saw that edit! ', 'Is that a...NINJA EDIT? ', 'Nice edit you did there...'];
            let lennys = ['(͠≖ ͜ʖ͠≖)', '( ͡~ ͜ʖ ͡°)', '( ͡◉ ͜ʖ ͡◉)', '( ͡° ͜ʖ ͡°)']
            let pre = Math.floor(Math.random() * preMsg.length);
            let len = Math.floor(Math.random() * lennys.length);
            msg.channel.send(preMsg[pre] + lennys[len]);
        }
    },
    "thisisfine": {
        fn: msg => {
            let fire = ":fire:";
            msg.channel.send(fire + emotes.thisisfine + fire);
        }
    },
    "badum": {
        fn: msg => {
            msg.channel.send("Ba dum tss. What a knee slapper! (☞ﾟヮﾟ)☞");
        }
    },
}