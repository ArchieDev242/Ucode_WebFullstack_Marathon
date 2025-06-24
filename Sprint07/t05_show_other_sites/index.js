import express from 'express';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import * as cheerio from 'cheerio';
import session from 'express-session';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.use(session({
    secret: 'show-other-sites-secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    if(!req.session.urlHistory) 
        {
        req.session.urlHistory = [];
        req.session.contentHistory = [];
    }
    next();
});

app.get('/', (req, res) => {
    req.session.urlHistory = [];
    req.session.contentHistory = [];
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.post('/fetch-url', async (req, res) => {
    const url = req.body.url;

    if(!url) 
        {
        return res.send(generateHtml('Error: URL is required', url));
    }

    try 
    {
        if(typeof fetch !== 'function') 
            {
            throw new Error('Fetch function is not available. Ensure node-fetch is installed correctly.');
        }

        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        if(!response.ok) 
            {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const html = await response.text();
        
        const body_match = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
        const body_content = body_match ? 
            `<body>\n${body_match[1]}\n</body>` : 
            'No <body> tags found in the page';

        const escapedContent = body_content
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
            
        req.session.urlHistory.push(url);
        req.session.contentHistory.push(escapedContent);
        req.session.currentIndex = req.session.urlHistory.length - 1;

        res.send(generateHtml(escapedContent, url, req.session.urlHistory.length > 1));
    } catch(error) 
    {
        res.send(generateHtml(`Error: Failed to fetch URL: ${error.message}`, url));
    }
});

app.get('/back', (req, res) => {
    if(!req.session.urlHistory || req.session.urlHistory.length <= 1) 
        {
        return res.redirect('/');
    }
    
    req.session.urlHistory.pop();
    req.session.contentHistory.pop();
    
    const previous_Url = req.session.urlHistory[req.session.urlHistory.length - 1];
    const previous_content = req.session.contentHistory[req.session.contentHistory.length - 1];
    
    res.send(generateHtml(previous_content, previous_Url, req.session.urlHistory.length > 1));
});

function generateHtml(content, lastUrl, hasHistory = false) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Show Other Sites</title>
    <style>
        pre {
            white-space: pre-wrap;
            background-color: #f5f5f5;
            padding: 10px;
            border: 1px solid #ccc;
            max-height: 500px;
            overflow: auto;
        }
        .text_url {
            font-weight: bold;
            margin: 15px 0;
            padding: 10px 0;
        }
        .line_gray {
            height: 1px;
            background-color: #ccc;
            margin: 10px 0;
        }
    </style>
</head>
<body>
    <h1>Show other sites</h1>
    <form id="form_url" action="/fetch-url" method="POST">
        <label for="input_url">Enter URL:</label>
        <input type="url" id="input_url" name="url" required value="${lastUrl || ''}">
        <button id="btn_submit" type="submit">Go</button>
        <a id="link_back" href="${hasHistory ? '/back' : '/'}">BACK</a>
    </form>
    ${lastUrl ? `
        <div class="line_gray"></div>
        <div class="text_url">url: ${lastUrl}</div>
        <div class="line_gray"></div>
    ` : ''}
    <div id="div_content">
        <pre>${content}</pre>
    </div>
    <script src="script.js"></script>
</body>
</html>
    `;
}

app.listen(port, () => {
    console.log(`Server started on port http://localhost:${port}`);
});