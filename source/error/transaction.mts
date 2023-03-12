import {BaseError} from "./base.mjs"

export class TransactionNotFound extends BaseError {
    constructor(name: string) {
        super(`Transaction '${name}' not found.`);
    }
}