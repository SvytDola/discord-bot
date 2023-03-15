import {BaseError} from "./base.mjs";

export class ProfileNotFound extends BaseError {
    constructor() {
        super(`Profile not found.`);
    }
}
