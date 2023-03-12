import {BaseError} from "./base.mjs";

export class NeedToBeVoiceChannel extends BaseError {
    constructor() {
        super("You need to be in a voice channel to play music!");
    }
}


export class NeedPermissionToJoinAndSpeak extends BaseError {
    constructor() {
        super("I need the permissions to join and speak in your voice channel!");
    }
}

export class ShouldBeInVoiceChannel extends BaseError {
    constructor() {
        super("I should be in voice channel.");
    }
}

export class NoMoreMusic extends BaseError {
    constructor() {
        super("No more music.");
    }
}