const XLSX = require('xlsx');

const jsonData = [
  {"name": "Anand", "age": 22, "gender": 0, "city": "Mumbai"},
  {"name": "Bihu", "age": 17, "gender": 1, "city": "Pune"}
];

const worksheet = XLSX.utils.json_to_sheet(jsonData);
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');

XLSX.writeFile(workbook, 'output-users.xlsx');
console.log('Excel file output-users.xlsx created');