const http = require('http');
const path = require('path');
const process = require('process');
const url = require('url');
const os = require('os');
const ip = require('ip');

const port = 3000;
const host = 'localhost';

const server = http.createServer((req, res) => {
    const script_name = path.basename(__filename);
    const script_args = process.argv;
    const server_ip_address = ip.address();
    const client_ip_address = req.socket.remoteAddress;
    const host_name = os.hostname();
    const protocol = `HTTP ${req.httpVersion}`;
    const request_method = req.method;
    const user_agent = req.headers['user-agent'];
    const url_params = JSON.stringify(url.parse(req.url, true).query);
    
    console.log(`Name of executed script: ${script_name}`);
    console.log(`Arguments passed to the script: ${script_args}`);
    console.log(`IP address of the server: ${server_ip_address}`);
    console.log(`Name of host that invokes the current script: ${host_name}`);
    console.log(`Name and a version of the information protocol: ${protocol}`);
    console.log(`Query method: ${request_method}`);
    console.log(`User-Agent information: ${user_agent}`);
    console.log(`IP address of the client: ${client_ip_address}`);
    console.log(`List of URL passed parameters: ${url_params}`);
});

server.listen(port, host, () => {
    console.log(`Server is running at http://${host}:${port}?hero=true&page=1`);
});