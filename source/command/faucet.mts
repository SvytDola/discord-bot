import {ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js";

import {BaseCommand} from "./base.mjs";

import {CLIENT_ID} from "../config/index.mjs";
import {User} from "../model/user.mjs";
import {ServiceManager} from "../manager/service.mjs";
import {TransactionsService} from "../service/transaction.mjs";

export class FaucetCommand extends BaseCommand<SlashCommandBuilder> {

    constructor() {
        super(
            new SlashCommandBuilder()
                .setName("faucet")
                .setDescription("Get test tokens.")
        );
    }

    async execute(interaction: ChatInputCommandInteraction, user: User, serviceManager: ServiceManager): Promise<void> {
        const transactionsService = serviceManager.getService(TransactionsService);
        user.balance += 0.1;
        await user.save();
        await transactionsService.create(CLIENT_ID, user.id, 0.1);
        await interaction.reply("Faucet confirmed.");
    }

}