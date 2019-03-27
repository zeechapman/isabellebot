const firebase = require('firebase');
const firebaseData = require('./firebaseData');

// Switch to local token if enviornment variable is not available
let fireToken = process.env.FIRETOKEN;
if (fireToken === undefined) {
    fireToken = require('./firebaseData');
}


// Initialize Firebase App
firebase.initializeApp(fireToken);

console.log("Firebase Initialized");

let database = firebase.database();


let modifyDB = function (user, msg, reason) {
    let firstMsg = () => {
        let message = "Greetings,\n\n" +
            "Sorry to bother you, but you just received a strike from Lady Goggle's server. Please remember that even though the server can be pretty laid back, there are still rules. If you're wondering the reason for your recent, here's a message from a member of the mod team:\n\n\`" +
            reason +
            " \`\n\nPlease note that on your third strike, you will be banned from the server immediately. If you feel like the strike was not fairly given, please contact one of the members of the mod team, Squid Pro Crow, or Goggles herself." +
            "\n\nThank you, and apologies for any inconvencience.";
        msg.mentions.users.first().send(message);

    }
    database.ref('users/' + user).once('value').then(snapshot => {
        if (snapshot.exists()) {
            // If the user does exist
            if (snapshot.val().strikes < 1) {
                // If the number of strikes they have is less than 3
                let currentStrikes = snapshot.val().strikes + 1;
                console.log("Adding a strike to user " + user);
                database.ref('users/' + user).set({
                    strikes: currentStrikes
                });

                // Send the message about the strike (function)
                firstMsg();
            } else if (snapshot.val().strikes < 2) {
                let currentStrikes = snapshot.val().strikes + 1;
                database.ref('users/' + user).set({
                    strikes: currentStrikes
                });
                // Send the message about the second warning
                let message = "Sorry to bother you again, but you are on your second strike. You have been temporarily restricted from certain channels until further notice.\n\nA message from the mod team on the matter:\n\n" +
                    "\`" + reason + "\`\n\n" +
                    "The restrictions will be removed soon. However, if you fail to follow the rules or listen to the mods one last time, then a ban will be given.\n\nPlease don't be a dick."
                    msg.mentions.users.first().send(message);
                } else {
                console.log("Maximum number of strikes met for user " + user + ". Mod team have been informed.");
                // Third strike has been reached (function)
                let message = "I do apologize for this, but you have been banned from the server. You were banned because of the final warning:\n\n" +
                    "\`" + reason + "\`\n\n" +
                    "Warnings were given, and unfortunately a ban is required for not following or listening for the third time.\n\nHave a wonderful day."
                    msg.mentions.users.first().send(message);
                    setTimeout(() => {
                        msg.guild.member(msg.mentions.users.first()).ban(reason);
                    }, 1000);
            }
        } else {
            // If the user does not exist
            console.log("The user does not exist in the database. Adding " + user);
            database.ref('users/' + user).set({
                strikes: 1
            });
            firstMsg();
        }
    });
}

module.exports = modifyDB;