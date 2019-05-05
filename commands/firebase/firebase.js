const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://goggles-strikes.firebaseio.com"
});

let db = admin.database();

exports.addStrike = (msg, id, tag, reason) => {
    let outcome;
    if (reason === '') {
        outcome = '\n'
    } else {
        outcome = 'The reason given:\n\n```' + reason + '```\n';
    }
    db.ref('strikes/' + id).once('value').then(snap => {
        if (snap.exists()) {
            // If the user already exists
            if (snap.val().strikes < 2) {
                // If number of strikes is less than 3
                let currStrike = (snap.val().strikes) + 1;
                console.log("Addding a strike to " + tag);
                db.ref('strikes/' + id).set({
                    name: tag,
                    strikes: currStrike
                });
                msg.mentions.users.first().send("Greetings,\nYou are recieving this message because you have recieved a strike. " + outcome + "You currently have " + currStrike + "/3 strikes.\n\nPlease remember that we still have rules. If you have any questions, please message one of the mods, Squid, or Goggles. Apologies, and have a good day.\n\n");
            } else {
                console.log("Maximum number of strikes reached for " + tag + ". Booting from server.");
                msg.mentions.users.first().send("Greetings,\nI apologize, but this is your third strike. Unfortunately, we have to ban you.\n\nHave a good day.")
                setTimeout(() => {
                    msg.guild.ban(msg.mentions.users.first(), {
                        reason: reason
                    });
                }, 1000);
            }
        } else {
            // If the user doesn't exist
            console.log("The user " + tag + " does not exist in the database yet. Adding...");
            db.ref('strikes/' + id).set({
                name: tag,
                strikes: 1
            });
            msg.mentions.users.first().send("Greetings,\nYou are recieving this message because you have recieved a strike." + outcome + "You currently have 1/3 strikes..\n\nPlease remember that we still have rules. If you have any questions, please message one of the mods, Squid, or Goggles. Apologies, and have a good day.\n\n");
        }
    });
}

/**
 * Check to see if the user has initiated the !happy command before.
 * If not, then add them to the database and send them the DM of the
 * list of songs.
 */
exports.happyCheck = (id, fn1, fn2) => {
    const ref = db.ref('happy/' + id);
    ref.once('value').then(snap => {
        if (snap.exists()) {
            fn1();
        } else {
            // What to do if someone does not exist yet in database
            ref.set({
                init: true
            });
            fn2();
        }
    });
}