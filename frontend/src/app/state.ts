import { ChaseTransaction } from "./read_csv"

// Use extends Record<string, any> ?
export default interface State {
    inDropZone: boolean
    files: File[]
    transactions: ChaseTransaction[]
}