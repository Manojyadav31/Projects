const fs = require('fs').promises;
const path = require('path');

function generateRandomWord(length = 10) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let word = '';
  for (let i = 0; i < length; i++) {
    word += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return word;
}

(async () => {
  const words = [];
  for (let i = 0; i < 100; i++) {
    words.push(generateRandomWord());
  }
  const content = words.join('\n');
  const filePath = path.join(__dirname, 'random-wrods.txt');
  
  await fs.writeFile(filePath, content);
  console.log('100 random words written to random-wrods.txt');
})();