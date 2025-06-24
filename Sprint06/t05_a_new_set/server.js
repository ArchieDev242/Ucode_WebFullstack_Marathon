const http = require('http');
const path = require('path');
const fs = require('fs');
const formidable = require('formidable');

const port = 3000;
const host = 'localhost';

const server = http.createServer(function(request, response) 
{
    if(request.method === 'GET') 
        {
        if(request.url === '/') 
            {
            fs.readFile(path.join(__dirname, 'index.html'), 'utf-8', function(error, pageData) 
            {
                if(error) 
                    {
                    response.writeHead(500, { 'Content-Type': 'text/plain' });
                    response.end('Page loading Error :<');
                }else 
                {
                    response.writeHead(200, { 'Content-Type': 'text/html' });
                    response.end(pageData);
                }
            });
        }

        if(request.url === '/style.css') 
            {
            fs.readFile(path.join(__dirname, 'style.css'), 'utf-8', function(error, cssData) 
            {
                if(error) 
                    {
                    response.writeHead(500, { 'Content-Type': 'text/plain' });
                    response.end('CSS Error:<');
                }else 
                {
                    response.writeHead(200, { 'Content-Type': 'text/css' });
                    response.end(cssData);
                }
            });
        }

        if(request.url === '/script.js') 
            {
            fs.readFile(path.join(__dirname, 'script.js'), 'utf-8', function(error, jsData) 
            {
                if(error) 
                    {
                    response.writeHead(500, { 'Content-Type': 'text/plain' });
                    response.end('Loading script Error :<');
                }else 
                {
                    response.writeHead(200, { 'Content-Type': 'application/javascript' });
                    response.end(jsData);
                }
            });
        }
    }

    if (request.method === 'POST' && request.url === '/submit') 
        {
        let form_reader = new formidable.IncomingForm({
            keepExtensions: true
        });

        form_reader.parse(request, function(error, textFields, fileFields) 
        {
            if(error) 
                {
                response.writeHead(500, { 'Content-Type': 'text/plain' });
                response.end('Form parsing failed :<');
                return;
            }

            let photo_filename = 'No photo';

            if(fileFields.photo) 
                {
                if(Array.isArray(fileFields.photo) && fileFields.photo.length > 0) 
                    {
                    photo_filename = fileFields.photo[0].originalFilename || fileFields.photo[0].name;
                }else 
                {
                    photo_filename = fileFields.photo.originalFilename || fileFields.photo.name;
                }
            }

            response.writeHead(200, { 'Content-Type': 'text/plain' });
            response.end(
                'POST\n' +
                '[name] => ' + textFields.name + '\n' +
                '[email] => ' + textFields.email + '\n' +
                '[age] => ' + textFields.age + '\n' +
                '[description] => ' + textFields.description + '\n' +
                '[photo] => ' + photo_filename
            );
        });
    }
});

server.listen(port, host, function() 
{
    console.log('Server running at http://' + host + ':' + port);
});