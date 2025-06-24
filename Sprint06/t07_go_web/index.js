const http = require('http');
const path = require('path');
const ejs = require('ejs');
const fs = require('fs');

const normal_router_path = require('./normal-router');
const quantum_router_path = require('./quantum-router');
const normal_router = normal_router_path.normalRouter;
const quantum_router = quantum_router_path.quantumRouter;

const port = 3000;
const host = 'localhost';

const server = http.createServer((req, resp) => {
    if(req.method == 'GET') 
        {
        let url_path = req.url;
        
        switch(url_path) 
        {
            case '/':
                let file_path = path.join(__dirname, 'views/index.ejs');

                fs.readFile(file_path, 'utf-8', (err, fileData) => {
                    if(err)
                        {
                        resp.writeHead(500);
                        resp.end('Error loading page!');
                        return;
                    }

                    resp.writeHead(200, { 'Content-Type': 'text/html' });
                    let page_render = ejs.render(fileData);
                    resp.end(page_render);
                });
                break;
                
            case '/normal': normal_router(req, resp); break;
            case '/quantum': quantum_router(req, resp); break;
                
            default:
                resp.writeHead(404, { 'Content-Type': 'text/html' });
                resp.end('<h1 style="text-align: center;">Page Not Found! :< </h1>');
                break;
        }
    }
});

server.listen(port, host, () => {
    console.log('Server running at http://' + host + ':' + port);
});