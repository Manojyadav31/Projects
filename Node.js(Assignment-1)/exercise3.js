const fs = require('fs').promises;
const path = require('path');

async function copyFile(fileName, newFile) {
  const sourcePath = path.join(__dirname, fileName);
  const destPath = path.join(__dirname, newFile);
  
  try {
    await fs.copyFile(sourcePath, destPath);
    console.log(`Copied ${fileName} to ${newFile}`);
  } catch (err) {
    console.error('Error copying file:', err.message);
  }
}

// Example usage
(async () => {
  await copyFile('random-wrods.txt', 'random-wrods-copy.txt');
})();