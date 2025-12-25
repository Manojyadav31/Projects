const fs = require('fs').promises;
const path = require('path');

(async () => {
  const users = [
    {"name": "Anand", "age": 22, "gender": 0, "city": "Mumbai"},
    {"name": "Bihu", "age": 17, "gender": 1, "city": "Pune"}
  ];
  
  const lines = users.map(u => `${u.name} | ${u.age} | ${u.gender} | ${u.city}`);
  const content = lines.join('\n');
  
  const filePath = path.join(__dirname, 'users-info.txt');
  await fs.writeFile(filePath, content);
  console.log('users-info.txt created');
})();