const fs = require('fs').promises;
const path = require('path');
const XLSX = require('xlsx');

async function excelToJson() {
  const filePath = path.join(__dirname, 'lib', 'marks.xlsx');
  try {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    const json = XLSX.utils.sheet_to_json(worksheet);
    console.log(JSON.stringify(json, null, 2));
  } catch (err) {
    console.error('Error:', err.message);
  }
}

excelToJson();