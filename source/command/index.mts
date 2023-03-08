import {Collection, SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder} from "discord.js";

import {PingCommand} from "./ping.mjs";
import {BaseCommand} from "./base.mjs";
import {RoleCommand} from "./role/command.mjs"
import { BalanceCommand } from "./balance/command.mjs";
import {FaucetCommand} from "./faucet.mjs";

const commands: Collection<string,
    BaseCommand<SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder>> =
    new Collection<string, BaseCommand<SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder>>();

const dataCommands = [
    new PingCommand(),
    new RoleCommand(),
    new BalanceCommand(),
    new FaucetCommand()
];

for (const command of dataCommands) {
    commands.set(command.data.name, command);
}

export {commands};
