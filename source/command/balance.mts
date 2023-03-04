import {ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder} from "discord.js"

import {BaseCommand} from "./base.mjs"

import {EMBED_COLOR} from "../config/index.mjs";
import {getUserIfNotExistThenCreate} from "../service/user.mjs";

export class BalanceCommand extends BaseCommand {
    public data: SlashCommandBuilder

    constructor() {
        super();

        this.data = new SlashCommandBuilder()
            .setName("balance")
            .setDescription("Replies with your balance.")
    }

    public async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        const user = await getUserIfNotExistThenCreate(interaction.user.id)

        const embed = new EmbedBuilder()
            .setTitle("Balance")
            .setColor(EMBED_COLOR)
            .setDescription("Info of balance")
            .setTimestamp()
            .setFields([
                {
                    name: "AGN", value: user.balance.toString()
                }
            ])

        await interaction.reply({embeds: [embed]})
    }
}
