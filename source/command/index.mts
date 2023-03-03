import {Collection} from "discord.js";
import {PingCommand} from "./ping.mjs";
import {BaseCommand} from "./base.mjs";

export {PingCommand} from "./ping.mjs"


const commands: Collection<string, BaseCommand> = new Collection<string, BaseCommand>();

commands.set("ping", new PingCommand());


export {commands}
