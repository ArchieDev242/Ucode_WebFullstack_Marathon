const express = require('express');
const session = require('express-session');
const path = require('path');
const crypto = require('crypto');
const app = express();
const port = 3000;

app.use(session({
    secret: 'mySecretKey123',
    resave: false,
    saveUninitialized: false
}));

app.use(express.static(path.join(__dirname)));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/save', (req, res) => {
    let password = req.body.password || '';
    let salt = req.body.salt || '';
    
    let hashed_password = '';
    
    if(password && salt) 
        {
        hashed_password = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha256').toString('hex');
    }
    
    req.session.hackData = {
        password: password,
        salt: salt,
        hashedPassword: hashed_password
    };
    
    res.json({ success: true });
});

app.post('/guess', (req, res) => {
    let guess = req.body.guess || '';
    let sessionData = req.session.hackData || {};
    
    let hashedGuess = '';
    
    if(guess && sessionData.salt) 
        {
        hashedGuess = crypto.pbkdf2Sync(guess, sessionData.salt, 1000, 64, 'sha256').toString('hex');
    }
    
    if(hashedGuess === sessionData.hashedPassword) 
        {
        req.session.destroy();
        res.json({ success: true });
    } else 
    {
        res.json({ success: false });
    }
});

app.get('/get-session', (req, res) => {
    if(req.session.hackData) 
        {
        res.json(req.session.hackData);
    } else 
    {
        res.json({});
    }
});

app.get('/clear', (req, res) => {
    req.session.destroy(error => {
        if(error) 
            {
            console.error("Failed to clean:", error);
            return res.status(500).json({ error: 'failed to clean' });
        }
    });
    res.json({ success: true });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});