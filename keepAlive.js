// A way to keep the server up without relying on any third-part service
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
                    console.log("WAKE UP!  " + chunk);
                } catch (err) {
                    console.log(err.message);
                }
            });
        }).on('error', (err) => {
            console.log(err.message);
        });
    }, 20 * 60 * 1000); // 20 minutes
}