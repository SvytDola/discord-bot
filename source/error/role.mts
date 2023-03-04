import {BaseError} from "./base.mjs";

export class RoleNotFound extends BaseError {
    constructor(name: string) {
        super(`Role '${name}' not found.`);
    }
}
