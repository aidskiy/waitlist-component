const fs = require('fs');
const path = require('path');
const filePath = path.resolve(__dirname, '../../waitlist.csv');

function appendEmailToCSV(email) {
    return new Promise((resolve, reject) => {
        const line = `${email.trim()}\n`;
        fs.appendFile(filePath, line, { encoding: 'utf8', flag: 'a' }, (err) => {
            if (err) return reject(err);
            resolve();
        });
    });
}

module.exports = { appendEmailToCSV };

