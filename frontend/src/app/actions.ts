type SetInDropZone = {
    type: 'SET_IN_DROP_ZONE';
    inDropZone: boolean;
}

type AddFileToList = {
    type: 'ADD_FILE_TO_LIST';
    // files: FileList[];
    files: File[];
}

export type Actions = SetInDropZone | AddFileToList