const express = require('express');
const cors = require('cors');
const waitlistRouter = require('./routes/waitlist'); // <- this file must exist

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
}));
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // limit each IP to 50 requests per windowMs
    message: { error: 'Too many requests, slow down.' },
});

app.use('/api/waitlist', limiter);

app.use(express.json());


app.use('/api/waitlist', waitlistRouter); // <- this line is critical

app.listen(3001, () => {
    console.log('Server running on port 3001');
});
