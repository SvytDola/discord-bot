import { BaseError } from "./base.mjs";

export class InadequateBalance extends  BaseError {
    constructor() {
        super("Insufficient balance.");
    }
}

export class FaucetError extends BaseError {
    constructor() {
        super("You have recently registered this command.");
    }
}

export class FaucetEmpty extends BaseError {
    constructor() {
        super("The faucet is empty.");
    }
}