const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const filePath = path.resolve(__dirname, '../../waitlist.csv');

router.post('/', (req, res) => {
    const { email } = req.body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: 'Invalid email' });
    }
    {/*     Option to log IP in CSV file 
        const ip = req.ip;
const timestamp = new Date().toISOString();
const line = `${email.trim()},${timestamp},${ip}\n`;*/}
    const timestamp = new Date().toISOString();
    const line = `${email.trim()},${timestamp}\n`;

    fs.appendFile(filePath, line, { encoding: 'utf8', flag: 'a' }, (err) => {
        if (err) {
            console.error('CSV write error:', err);
            return res.status(500).json({ error: 'Failed to write email' });
        }
        const ip = req.ip;
        console.log(`New signup from ${ip}: ${email} at ${timestamp}`);

        return res.status(200).json({ message: 'Email added to waitlist' });
    });
});

module.exports = router;
