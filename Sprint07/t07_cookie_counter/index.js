const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();
const port = 3000;

app.use(cookieParser());
app.use(express.static(__dirname));

app.get('/count', (req, res) => {
    let count = 0;
    const count_cookies = req.cookies.visitCount;
    const expiry_cookies = req.cookies.expiryTime;
    
    const now = Date.now();
    let expiry_time_cookies = now + 60000;
    
    if(expiry_cookies && parseInt(expiry_cookies) > now) 
        {
        expiry_time_cookies = parseInt(expiry_cookies);
        if(count_cookies) 
            {
            count = parseInt(count_cookies) + 1;
        }
    } else 
    {
        count = 1;
    }
    
    const cookies_options = {
        expires: new Date(expiry_time_cookies),
        httpOnly: false
    };
    
    res.cookie('visitCount', count, cookies_options);
    res.cookie('expiryTime', expiry_time_cookies, cookies_options);
    
    res.json({ count });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});