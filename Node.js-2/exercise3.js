const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url);
    let fileName = '';

    switch (parsedUrl.pathname) {
        case '/home':
            fileName = 'home.html';
            break;
        case '/about':
            fileName = 'about.html';
            break;
        case '/contact':
            fileName = 'contact.html';
            break;
        default:
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 - Page Not Found');
            return;
    }
const filePath = path.join(__dirname, 'lib', fileName);
fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Server Error');
            return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });
});

server.listen(80, () => {
    console.log('Server running on port 80');
    console.log('Visit:');
    console.log('  http://localhost/home');
    console.log('  http://localhost/about');
    console.log('  http://localhost/contact');
});