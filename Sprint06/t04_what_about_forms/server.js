const http = require('http');
const path = require('path');
const fs = require('fs');

const host = 'localhost';
const port = 3000;

const answers = {
    'Jumped from the mountain': 'Shame on you! Go and watch Avengers!',
    'Made stone keeper jump from the mountain': 'Shame on you! Go and watch Avengers!',
    'Pushed Gamora of the mountain': 'Correct!'
};

const server = http.createServer((req, res) => {
    if(req.method === 'GET') 
        {
        let file_path = '';

        switch(req.url) 
        {
            case '/': file_path = path.join(__dirname, 'index.html'); break;
            case '/script.js': file_path = path.join(__dirname, 'script.js'); break;
            default: res.writeHead(404); return res.end('Not Found :<');
        }

        fs.readFile(file_path, (err, content) => {
            if(err) 
                {
                res.writeHead(500);
                res.end('Server Error :<');
                return;
            }

            const content_type = file_path.endsWith('.js') 
                ? 'application/javascript' 
                : 'text/html';
            res.writeHead(200, { 'Content-Type': content_type });
            res.end(content);
        });
    }else if(req.method === 'POST' && req.url === '/check-answer') 
        {
        let body = '';

        req.on('data', chunk => body += chunk.toString());
        
        req.on('end', () => {
            try 
            {
                const { answer } = JSON.parse(body);
                const message = answers[answer] || 'Invalid answer!';
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message }));
            } catch(error) 
            {
                res.writeHead(400);
                res.end('Bad Request :<');
            }
        });
    }else 
    {
        res.writeHead(404);
        res.end('Not Found :<');
    }
});

server.listen(port, host, () => {
    console.log(`Server is running at http://${host}:${port}`);
});