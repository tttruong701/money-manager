import { ChaseTransaction } from "./read_csv";

type SetInDropZone = {
    type: 'SET_IN_DROP_ZONE';
    inDropZone: boolean;
}

type AddFileToList = {
    type: 'ADD_FILE_TO_LIST';
    files: File[];
}

type AddTransactions = {
    type: 'ADD_TRANSACTIONS';
    transactions: ChaseTransaction[];
}

export type Actions = SetInDropZone | AddFileToList | AddTransactions