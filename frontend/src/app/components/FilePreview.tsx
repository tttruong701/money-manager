import React, { useState, useEffect } from "react";
import styles from "../styles/FilePreview.module.css";
import read_csv, { ChaseTransaction } from "../read_csv";

async function parseFile(f: File): Promise<ChaseTransaction[]> {
  const transactions: ChaseTransaction[] = await read_csv(f.name);
  return transactions;
}

async function parseFiles(files: File[]): Promise<ChaseTransaction[]> {
  // Promise<[ [], [] ]>
  const transactionPromises: Promise<ChaseTransaction[]>[] = files.map(parseFile);
  const transactions: ChaseTransaction[][] = await Promise.all(transactionPromises);
  return transactions.flat();
}

// TODO Clean up signature
async function parseFilesEffect(files: File[], setTransactions: React.Dispatch<React.SetStateAction<ChaseTransaction[]>>) {
  const transactions: ChaseTransaction[] = await parseFiles(files);
  setTransactions(transactions);
}

{/* Iterate through files and display the filename and type */}
const FilePreview = (files: File[]) => {
  // TODO Add type
  const [transactions, setTransactions] = useState<ChaseTransaction[]>([]);

  useEffect(() => {
    parseFilesEffect(files, setTransactions);

    // This is required for clean-up on unmount, and to use async/await with promises
    return () => {};
  }, []);

  
  return (
    <div className={styles.fileList}>
      <div className={styles.fileContainer}>
        {
          transactions.map((t: ChaseTransaction) => {
            return (
              <>
                <ol>
                  <li key={t.description} className={styles.fileList}>
                    <div key={t.description} className={styles.fileName}>
                      {t.description}
                    </div>
                  </li>
                </ol>
              </>
            );
          })
        }
      </div>
    </div>
  );
};

export default FilePreview;