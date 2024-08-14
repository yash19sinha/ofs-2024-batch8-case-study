import fs from 'fs';
import { Employee } from './employee.js';

const employee = new Employee(5, 'Aryan bhai', 65000);

const employeeJson = employee.toJson();

const appendToFileSync = (filePath, newData) => {
    let existingData = '[]';
    try {
        existingData = fs.readFileSync(filePath, 'utf8');
    } catch (err) {
    }

    let employees = [];
    if (existingData.trim()) {
        try {
            employees = JSON.parse(existingData);
        } catch (parseErr) {
            console.error('Error parsing JSON:', parseErr);
            return;
        }
    }

    if (!Array.isArray(employees)) {
        employees = [];
    }

    employees.push(JSON.parse(newData));

    const updatedData = JSON.stringify(employees, null, 2);

    fs.writeFileSync(filePath, updatedData, { flag: 'w' });
    console.log('Employee data appended to employee.json');
};

const filePath = 'employee.json';

appendToFileSync(filePath, employeeJson);
