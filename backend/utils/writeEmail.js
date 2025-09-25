const fs = require('fs');
const path = require('path');
const filePath = path.resolve(__dirname, '../../waitlist.csv');
const validator = require('validator');
function appendEmailToCSV(email) {
    return new Promise((resolve, reject) => {

        if (!validator.isEmail(email)) {
            return reject(new Error('Invalid email'));
        }
        const line = `${email.trim()}\n`;
        fs.appendFile(filePath, line, { encoding: 'utf8', flag: 'a' }, (err) => {
            if (err) return reject(err);
            resolve();
        });
    });
}

module.exports = { appendEmailToCSV };

