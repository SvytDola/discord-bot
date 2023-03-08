import { BaseError } from "./base.mjs";

export class InadequateBalance extends  BaseError {
    constructor() {
        super("Insufficient balance.");
    }
}