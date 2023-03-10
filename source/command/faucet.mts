import {ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js";

import {BaseCommand} from "./base.mjs";

import {createTransaction} from "../service/transaction.mjs";
import {CLIENT_ID} from "../config/index.mjs";
import {User} from "../model/user.mjs";

export class FaucetCommand extends BaseCommand<SlashCommandBuilder> {

    constructor() {
        super(
            new SlashCommandBuilder()
                .setName("faucet")
                .setDescription("Get test tokens.")
        );
    }

    async execute(interaction: ChatInputCommandInteraction, user: User): Promise<void> {
        user.balance += 0.1;
        await user.save();
        await createTransaction(CLIENT_ID, user.id, 0.1);
        await interaction.reply("Faucet confirmed.");
    }

}