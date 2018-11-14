// Make a counter file, and update it accordingly
const fs = require('fs');
const mkdirp = require('mkdirp');

module.exports = function counter(msg) {
    // mkdir
    mkdirp('./counters', (err) => {
        if (err) throw err;
        else console.log('Created directory');
    });
    
    this.guildID = msg.guild.id; // Get server id for file sort
    this.fileName = this.guildID + ".counter.json"; // The file name
    this.file = './counters/' + this.guildID + '.counter.json'; // Path to file
    
    // If file doesn't exist, write one
    if (!fs.existsSync(this.file)) {
        fs.writeFileSync(this.file, '{ "respects": 0 }');
    }
    let fullFile = require(this.file); // Import/read the file
    fullFile.respects++; // Add the respect counter
    this.counter = fullFile.respects; // Grab the amount of respects
    let str = JSON.stringify(fullFile); // Stringify
    fs.writeFileSync(this.file, str); // Write it out
}