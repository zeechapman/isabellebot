/**
 * Get the current time in 12 hour format
 */
function getTime() {
    let date = new Date();
    let hrs = date.getHours();
    let min = date.getMinutes();
    let time;

    if (hrs > 12) {
        time = (hrs - 12) + ':' + min + ' PM';
    } else {
        time = hrs + ':' + min + ' AM';
    }

    return time;
}

exports.getTime = getTime;