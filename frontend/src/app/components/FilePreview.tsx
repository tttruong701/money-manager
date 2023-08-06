import React, { useState, useEffect } from "react";
import styles from "../styles/FilePreview.module.css";
import { Actions } from "../actions";
import State from "../state";
import { ChaseTransaction } from "../read_csv";

{/* Iterate through files and display the filename and type */ }
const FilePreview = ({ state, dispatch }: { state: State, dispatch: React.Dispatch<Actions> }) => {
  return (
    <div className={styles.fileList}>
      <div className={styles.fileContainer}>
        <ol>
          {
            state.transactions.map((t: ChaseTransaction) => {
              return (
                <>
                  <li key={t["Id"]} className={styles.fileList}>
                      {t["Description"]}
                  </li>
                </>
              );
            })
          }
        </ol>
      </div>
    </div>
  );
};

export default FilePreview;