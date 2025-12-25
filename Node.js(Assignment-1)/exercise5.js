const fs = require('fs').promises;
const path = require('path');

async function convertToJson() {
  const filePath = path.join(__dirname, 'lib', 'data.txt'); // assume the file name
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    const lines = content.trim().split('\n');
    
    const jsonArray = lines.map(line => {
      const [name, age, gender, city] = line.split('|').map(s => s.trim());
      return { name, age: parseInt(age), gender: parseInt(gender), city };
    });
    
    console.log(JSON.stringify(jsonArray, null, 2));
  } catch (err) {
    console.error('Error:', err.message);
  }
}

convertToJson();