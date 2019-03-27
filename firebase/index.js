const firebase = require('firebase');
const firebaseData = require('./firebaseData');
const fn = require('./functions');

firebase.initializeApp(firebaseData.module);

let database = firebase.database();

function modifyDB(user) {
    database.ref('users/' + user).once('value').then(snapshot => {
        if (snapshot.exists()) {
            // If the user does exist
            if (snapshot.val().strikes < 3) {
                // If the number of strikes they have is less than 3
                let currentStrikes = snapshot.val().strikes;
                console.log("Adding a strike to user " + user);
                database.ref('users/' + user).set({
                    strikes: currentStrikes + 1
                });
            } else {
                console.log("Maximum number of strikes met. Time for the boot!");
            }
        } else {
            // If the user does not exist
            console.log("The user does not exist in the database. Adding " + user);
            database.ref('users/' + user).set({
                username: user,
                strikes: 1
            });
        }
    });
}

modifyDB("Jest");
