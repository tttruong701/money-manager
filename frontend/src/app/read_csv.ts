// import fs from 'fs';
import * as fs from 'fs';
// import csv from 'csv-parser';
import * as csv from 'csv-parser';
import { resolve } from 'path';

// Transaction Date, Post Date, Description, Category, Type,Amount,Memo
// ToODO Find proper datetype for MM/DD/YYY dates and amount
export interface ChaseTransaction {
    transactionDate: string;
    postDate: string;
    description: string;
    category: string;
    type: string;
    amount: string;
}

export default async function readCSVFile(filePath: string): Promise<ChaseTransaction[]> {
    const results: ChaseTransaction[] = [];
    return new Promise ((resolve, reject) => {
        fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data: ChaseTransaction) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', (error) => reject(error));

    });
}
