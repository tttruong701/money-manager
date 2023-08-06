// import fs from 'fs';
// import * as fs from 'fs';
// import csv from 'csv-parser';
// import * as csv from 'csv-parser';
// import csv from 'csv-parser';
// import fs from 'fs';
import { resolve } from 'path';
import { Actions } from './actions';
import State from './state';
import Papa, { ParseResult } from 'papaparse';
import { rejects } from 'assert';

// Transaction Date, Post Date, Description, Category, Type,Amount,Memo
// ToODO Find proper datetype for MM/DD/YYY dates and amount
export interface ChaseTransaction {
    id: number;
    transactionDate: string;
    postDate: string;
    description: string;
    category: string;
    type: string;
    amount: string;
}

// export default async function readCSVFile(filePath: string): Promise<ChaseTransaction[]> {
//     const results: ChaseTransaction[] = [];
//     return new Promise((resolve, reject) => {
//         fs.createReadStream(filePath)
//             .pipe(csv())
//             .on('data', (data: ChaseTransaction) => results.push(data))
//             .on('end', () => resolve(results))
//             .on('error', (error) => reject(error));
//     });
// }

// async function parseFile(f: File): Promise<ChaseTransaction[]> {
//     const transactions: ChaseTransaction[] = await readCSVFile(f.name);
//     return transactions;
// }

// export async function parseFiles(files: File[]): Promise<ChaseTransaction[]> {
//     // Promise<[ [], [] ]>
//     const transactionPromises: Promise<ChaseTransaction[]>[] = files.map(parseFile);
//     const transactions: ChaseTransaction[][] = await Promise.all(transactionPromises);
//     return transactions.flat();
// }

// TODO Clean up signature
// async function parseFilesEffect(files: File[], setTransactions: React.Dispatch<React.SetStateAction<ChaseTransaction[]>>) {
//     const transactions: ChaseTransaction[] = await parseFiles(files);
//     setTransactions(transactions);
// }

export async function parse(file: File): Promise<ChaseTransaction[]> {
// export async function parse(file: File) {
    // const config = {
    //     complete: (results, file) => {
    //         resolve(results.data);
    //     },
    //     error: (error, file) => {
    //         reject(error);
    //     }
    // }
    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            header: true,
            complete: (results: ParseResult<ChaseTransaction>, file) => {
                resolve(results.data);
            },
            error: (error, file) => {
                reject(error);
            }
        });
    });
}

export async function parseFiles(files: File[]): Promise<ChaseTransaction[]> {
    return (await Promise.all(files.map(parse))).flat()
}