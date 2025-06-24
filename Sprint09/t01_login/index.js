const User = require('./models/user');
const express = require('express');
const session = require('express-session');
const body_parser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

app.use(session({
    secret: 'sword_secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }
}));

app.use(body_parser.json());
app.use(express.static(path.join(__dirname, 'public')));

const require_auth = (req, res, next) => {
    if(!req.session.user) 
        {
        return res.status(401).json({ error: 'Unauthorized :<' });
    }
    next();
};

app.get('/check-auth', (req, res) => {
    res.json({
        authenticated: !!req.session.user,
        user: req.session.user || null
    });
});

app.post('/login', async (req, res) => {
    const { login, password } = req.body;
    
    try 
    {
        const user = await User.authenticate(login, password);
        
        if(!user) 
            {
            return res.status(401).json({ 
                error: 'Invalid credentials! :<' 
            });
        }

        req.session.user = {
            id: user.id,
            login: user.login,
            status: user.status
        };

        res.json({ 
            success: true,
            message: 'Access granted!',
            user: req.session.user 
        });

    } catch(error) 
    {
        console.error('Login error :< :', error);
        res.status(500).json({ error: 'Internal server error! :<' });
    }
});

app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if(err) 
            {
            return res.status(500).json({ error: 'Logout failed :<' });
        }
        res.clearCookie('connect.sid');
        res.json({ success: true, message: 'Session terminated! :<' });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});