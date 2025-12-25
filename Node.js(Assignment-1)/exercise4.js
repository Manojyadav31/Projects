const fs = require('fs').promises;
const path = require('path');

async function processDebugLog() {
  const filePath = path.join(__dirname, 'lib', 'debug.log');
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    const lines = content.trim().split('\n');
    
    const timestamp = '14-Apr-2022 11:15:45 AM';
    const updatedLines = lines.map(line => `${timestamp} ${line}`);
    
    await fs.writeFile(filePath, updatedLines.join('\n') + '\n');
    console.log('debug.log updated with timestamps');
  } catch (err) {
    console.error('Error:', err.message);
  }
}

processDebugLog();