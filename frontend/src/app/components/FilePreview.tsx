import React from "react";
import styles from "../styles/FilePreview.module.css";

interface FileData {
  fileData: File[];
}

{/* Iterate through files and display the filename and type */}
const FilePreview = ({ fileData } : FileData) => {
  return (
    <div className={styles.fileList}>
      <div className={styles.fileContainer}>
        {
          fileData.map((f: File) => {
            return (
              <>
                <ol>
                  <li key={f.lastModified} className={styles.fileList}>
                    <div key={f.name} className={styles.fileName}>
                      {f.name}
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