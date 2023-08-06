"use client";

import React, { useReducer } from "react";
import Image from "next/image";
import FilePreview from "./FilePreview";
import styles from "../styles/DropZone.module.css";
import State from "../state";
import { Actions } from "../actions";
import { ChaseTransaction, parseFiles } from "../read_csv";

// const DropZone = ({ state, dispatch } : {state: State, dispatch: React.Dispatch<Actions>}) => {
const DropZone = () => {
   // reducer function to handle state changes
   const reducer = (state: State, action: Actions): State => {
    switch (action.type) {
      case "SET_IN_DROP_ZONE":
        return { ...state, inDropZone: action.inDropZone };
      case "ADD_FILE_TO_LIST":
        return { ...state, files: state.files.concat(action.files) };
      case "ADD_TRANSACTIONS":
          return { ...state, transactions: state.transactions.concat(action.transactions) };
      default:
        return state;
    }
  };

  // destructuring state and dispatch, initializing files to empty array
  const [state, dispatch] = useReducer(reducer, {
    inDropZone: false,
    files: [],
    transactions: [],
  });



  // onDragEnter sets inDropZone to true
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: true });
  };

  // onDragLeave sets inDropZone to false
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false });
  };

  // onDragOver sets inDropZone to true
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    // set dropEffect to copy i.e copy of the source item
    e.dataTransfer.dropEffect = "copy";
    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: true });
  };

  // onDrop sets inDropZone to false and adds files to files
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    // get files from event on the dataTransfer object as an array
    let files = [...e.dataTransfer.files];

    // ensure a file or files are dropped
    if (files && files.length > 0) {
      // loop over existing files
      const existingFiles = state.files.map((f) => f.name);
      // check if file already exists, if so, don't add to files
      // this is to prevent duplicates
      files = files.filter((f) => !existingFiles.includes(f.name));

      // dispatch action to add droped file or files to files
      dispatch({ type: "ADD_FILE_TO_LIST", files });
      // reset inDropZone to false
      dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false });
    }
  };

  // handle file selection via input element
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // ensure a file or files are selected
    if (e.target.files && e.target.files.length > 0) {
      let files: File[] = [...e.target.files];
      // loop over existing files
      const existingFiles: string[] = state.files.map((f: File) => f.name);
      // check if file already exists, if so, don't add to files
      // this is to prevent duplicates
      files = files.filter((f: File) => !existingFiles.includes(f.name));

      const transactions: ChaseTransaction[] = await parseFiles(files);

      // dispatch action to add transactiosn from selected file or files to files
      dispatch({ type: "ADD_TRANSACTIONS", transactions });
    }
  };

  return (
    <>
      <div
        className={styles.dropzone}
        onDragEnter={(e: React.DragEvent<HTMLDivElement>) => handleDragEnter(e)}
        onDragOver={(e: React.DragEvent<HTMLDivElement>) => handleDragOver(e)}
        onDragLeave={(e: React.DragEvent<HTMLDivElement>) => handleDragLeave(e)}
        onDrop={(e: React.DragEvent<HTMLDivElement>) => handleDrop(e)}
      >
        <Image src="/upload.svg" alt="upload" height={50} width={50} />

        <input
          id="fileSelect"
          type="file"
          multiple
          className={styles.files}
          onChange={(e) => handleFileSelect(e)}
        />
        <label htmlFor="fileSelect">You can select multiple Files</label>

        <h3 className={styles.uploadMessage}>
          or drag &amp; drop your files here
        </h3>
      </div>
      {/* Pass the selectect or dropped files as props */}
      <FilePreview state={state} dispatch={dispatch} />
    </>
  );
};

export default DropZone;