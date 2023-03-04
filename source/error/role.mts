import {BaseError} from "./base.mjs";

export class RoleNotFound extends BaseError {
    constructor(name: string) {
        super(`Role '${name}' not found.`)
    }
}

export class RoleAlreadyExists extends BaseError {
    constructor(name: string) {
        super(`Such a role '${name}' already exists`)
    }
}
