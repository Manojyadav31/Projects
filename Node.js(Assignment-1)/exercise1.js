const fs = require('fs').promises;
const path = require('path');

async function getFileContent(file) {
  const filePath = path.join(__dirname, 'lib', file);
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return content;
  } catch (err) {
    console.error(`Error reading ${file}:`, err.message);
    return '';
  }
}

(async () => {
  console.log('--- readme.txt ---');
  console.log(await getFileContent('readme.txt'));
  
  console.log('\n--- students.csv ---');
  console.log(await getFileContent('students.csv'));
  
  console.log('\n--- index.html ---');
  console.log(await getFileContent('index.html'));
})();