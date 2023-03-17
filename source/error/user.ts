import {BaseError} from "./base.mjs";

export class UserNotFound extends BaseError {
    constructor() {
        super(`User not found.`);
    }
}
