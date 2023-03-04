import {BaseError} from "./base.mjs";

export class AccessDenied extends BaseError {
    constructor() {
        super(`Access denied.`)
    }
}
