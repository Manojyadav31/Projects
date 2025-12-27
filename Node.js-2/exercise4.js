const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.listen(PORT, () => {
    console.log(`Static web server running at http://localhost:${PORT}`);
    console.log(`Place all your HTML files inside the 'public' folder.`);
    console.log(`Examples:`);
    console.log(`  http://localhost:${PORT}/home.html`);
    console.log(`  http://localhost:${PORT}/about.html`);
    console.log(`  http://localhost:${PORT}/contact.html`);
    console.log(`  http://localhost:${PORT}/images/photo.jpg  (if images folder exists)`);
});