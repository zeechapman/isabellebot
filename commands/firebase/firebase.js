var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

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
        outcome = 'The reason given:\n`' + reason + '`\n';
    }
    db.ref('users/' + id).once('value').then(snap => {
        if (snap.exists()) {
            // If the user already exists
            if (snap.val().strikes < 2) {
                // If number of strikes is less than 3
                let currStrike = (snap.val().strikes) + 1;
                console.log("Addeding a strike to " + tag);
                db.ref('users/' + id).set({
                    name: tag,
                    strikes: currStrike
                });
                msg.mentions.users.first().send("Greetings,\nYou are recieving this message because you have recieved a strike." + outcome + "You currently have " + currStrike + "/3 strikes.\nPlease remember that we still have rules. If you have any questions, please message one of the mods, Squid, or Goggles. Apologies, and have a good day.");
            } else {
                console.log("Maximum number of strikes reached for " + tag + ". Booting from server.");
                msg.mentions.users.first().send("Greetings,\nI apologize, but you have been banned from the server.\n\nHave a good day.")
                setTimeout(() => {
                    msg.guild.ban(msg.mentions.users.first(), {
                        reason: reason
                    });
                }, 1000);
            }
        } else {
            // If the user doesn't exist
            console.log("The user " + tag + " does not exist in the database yet. Adding...");
            db.ref('users/' + id).set({
                name: tag,
                strikes: 1
            });
            msg.mentions.users.first().send("Greetings,\nYou are recieving this message because you have recieved a strike." + outcome + "You currently have 1/3 strikes..\nPlease remember that we still have rules. If you have any questions, please message one of the mods, Squid, or Goggles. Apologies, and have a good day.");
        }
    });
}