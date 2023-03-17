import {
    APIEmbedField,
    ChatInputCommandInteraction,
    EmbedBuilder,
    SlashCommandSubcommandBuilder
} from "discord.js";

import {BaseCommand} from "../base.mjs";
import {ServiceManager} from "../../manager/service.mjs";
import {UsersService} from "../../service/user.mjs";
import {cfg} from "../../config/index.mjs";


export class BalanceTopSubCommand extends BaseCommand<SlashCommandSubcommandBuilder> {

    constructor() {
        super(
            new SlashCommandSubcommandBuilder()
                .setName("top")
                .setDescription("List top user of balance.")
        );
    }

    async execute(interaction: ChatInputCommandInteraction, serviceManager: ServiceManager): Promise<void> {
        const usersService = serviceManager.getService(UsersService);
        const users = await usersService.getListTopOfBalance();

        const fields: APIEmbedField[] = [];

        for (const user of users) {
            fields.push({
                name: `${user.balance} ${cfg.tokenName}`,
                value: `<@${user.id}>`
            });
        }

        const embed = new EmbedBuilder()
            .setFields(fields)
            .setTimestamp()
            .setColor(cfg.embedColor)
            .setTitle("Top of balance")
            .setDescription("First five users");

        await interaction.reply({embeds: [embed]});
    }
}