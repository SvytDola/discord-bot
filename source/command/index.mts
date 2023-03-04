import {Collection} from "discord.js"
import {PingCommand} from "./ping.mjs"
import {BaseCommand} from "./base.mjs"
import {RoleCommand} from "./role/command.mjs"
import {BalanceCommand} from "./balance.mjs";

const commands: Collection<string, BaseCommand> = new Collection<string, BaseCommand>()

commands.set("ping", new PingCommand())
commands.set("role", new RoleCommand())
commands.set("balance", new BalanceCommand())

export {commands}
