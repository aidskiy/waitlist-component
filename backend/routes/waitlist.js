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

    const line = `${email.trim()}\n`;

    fs.appendFile(filePath, line, { encoding: 'utf8', flag: 'a' }, (err) => {
        if (err) {
            console.error('CSV write error:', err);
            return res.status(500).json({ error: 'Failed to write email' });
        }

        return res.status(200).json({ message: 'Email added to waitlist' });
    });
});

module.exports = router;
