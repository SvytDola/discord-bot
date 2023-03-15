import {ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js";

import {BaseCommand} from "./base.mjs";

import {ServiceManager} from "../manager/service.mjs";
import {TransactionsService} from "../service/transaction.mjs";
import {UsersService} from "../service/user.mjs";
import {FaucetEmpty, FaucetError} from "../error/balance.mjs";
import {cfg} from "../config/index.mjs";

export class FaucetCommand extends BaseCommand<SlashCommandBuilder> {

    constructor() {
        super(
            new SlashCommandBuilder()
                .setName("faucet")
                .setDescription("Get test tokens.")
        );
    }

    async execute(interaction: ChatInputCommandInteraction, serviceManager: ServiceManager) {
        const transactionsService = serviceManager.getService(TransactionsService);
        const usersService = serviceManager.getService(UsersService);

        const userFrom = await usersService.getUserIfNotExistThenCreate(interaction.client.user.id);
        const userTo = await usersService.getUserIfNotExistThenCreate(interaction.user.id);

        if (Date.now() - userTo.faucetTimestamp <= 1000 * 60 * 60)
            throw new FaucetError();


        const temp = userFrom.balance - cfg.faucetTokensNumber;

        if (temp < 0)
            throw new FaucetEmpty();

        userFrom.balance = temp;
        userTo.balance += cfg.faucetTokensNumber;
        userTo.faucetTimestamp = Date.now();

        await userFrom.save();
        await userTo.save();

        const transaction = await transactionsService.create(
            userFrom.id,
            userTo.id,
            cfg.faucetTokensNumber,
            0
        );

        await interaction.reply(`Faucet confirmed ${transaction.id}.`);
    }
}