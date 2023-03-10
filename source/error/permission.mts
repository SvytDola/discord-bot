import {BaseError} from "./base.mjs";

export class AccessDenied extends BaseError {
    constructor() {
        super(`Access denied.`);
    }
}
export class PermissionNotFound extends BaseError {
    constructor(name: string) {
        super(`Role '${name}' not found.`);
    }
}

export class PermissionAlreadyExists extends BaseError {
    constructor(name: string) {
        super(`Such a role '${name}' already exists`);
    }
}


export class UserDoesNotHaveThisPermission extends BaseError {
    constructor(name: string) {
        super(`This user don't have that role '${name}'.`);
    }
}
