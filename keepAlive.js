// Ping itself to keep it awake
const http = require('http');

exports.keepAlive = function() {
    setInterval(() => {
        var options = {
            host: 'goggles-bot.herokuapp.com',
            port: 80,
            path: '/'
        };

        http.get(options, (res) => {
            res.on('data', (chunks) => {
                try {
                    console.log("Idle prevention.  Stay awake.");
                } catch (err) {
                    console.log(err.message);
                }
            });
        }).on('error', (err) => {
            console.log(err.message);
        });
    }, 20 * 60 * 1000); // 20 minutes
}