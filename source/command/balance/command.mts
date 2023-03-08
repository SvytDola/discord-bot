import {SlashCommandBuilder} from "discord.js";
import {BaseSubCommand} from "../base.mjs";
import {BalanceInfoSubcommand} from "./info.mjs";
import {BalanceSendSubCommand} from "./send.mjs";

export class BalanceCommand extends BaseSubCommand {
    constructor() {
        super(
            new SlashCommandBuilder()
                .setName("balance")
                .setDescription("Balance manager."),
            [
                new BalanceInfoSubcommand(),
                new BalanceSendSubCommand()
            ]
        )
    }
}
