import {BaseError} from "./base.mjs";

export class UserWithThisIdNotFound extends BaseError {
    constructor(id: string) {
        super(`User with this id (${id}) not found.`)
    }
}
