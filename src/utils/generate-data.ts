// import fs from 'fs';
// import { fileURLToPath } from 'url';
// import { dirname, join } from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

export function generateRecords(count:number) {
    const firstNames = ['Raj', 'Amit', 'Neha', 'Priya', 'Vikram', 'Siddharth', 'Ananya', 'Rohan', 'Sneha', 'Rahul', 'Arjun', 'Deepika', 'Karan', 'Divya', 'Yash', 'Meera', 'Aditya', 'Kriti', 'Gaurav', 'Pooja'];
    const lastNames = ['Solanki', 'Sharma', 'Verma', 'Patel', 'Joshi', 'Gupta', 'Mehta', 'Mishra', 'Singh', 'Kumar', 'Reddy', 'Nair', 'Choudhury', 'Rao', 'Shah', 'Kapoor', 'Malhotra', 'Joshi', 'Bose', 'Das'];
    
    const records = [];

    for (let i = 1; i <= count; i++) {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const age = Math.floor(Math.random() * (65 - 22 + 1)) + 22;
        const salary = (Math.floor(Math.random() * (2500 - 400 + 1)) + 400) * 1000;

        records.push({
            id: i,
            firstName: firstName,
            lastName: lastName,
            Age: age,
            Salary: salary
        });
    }

    return records;
}

const TOTAL_RECORDS = 50000;
// const OUTPUT_FILE = join(__dirname, 'employees.json');

// console.log(`Generating ${TOTAL_RECORDS} employee records...`);
// const data = generateRecords(TOTAL_RECORDS);

// console.log(`Writing data to ${OUTPUT_FILE}...`);
// fs.writeFileSync(OUTPUT_FILE, JSON.stringify(data, null, 2), 'utf-8');

// console.log('Generation complete');
