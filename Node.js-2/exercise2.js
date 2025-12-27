const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        const filePath = path.join(__dirname, 'lib', 'users.txt');

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Server Error');
                return;
            }
            const lines = data.trim().split('\n');
            let html = '<html><head><title>Users Table</title></head><body>';
            html += '<table border="1" cellpadding="10" cellspacing="0">'; 
            lines.forEach((line, index) => {
                const columns = line.split('|').map(item => item.trim());
                if (index === 0) {
                    html += '<tr>';
                    columns.forEach(col => {
                        html += `<th>${col}</th>`;
                    });
                    html += '</tr>';
                } else {
                    html += '<tr>';
                    columns.forEach(col => {
                        html += `<td>${col}</td>`;
                    });
                    html += '</tr>';
                }
            });
            html += '</table></body></html>';
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(html);
        });
    } 
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(80, () => {
    console.log('Server running at http://localhost (port 80)');
    console.log('Note: Port 80 may require admin/root privileges.');
});