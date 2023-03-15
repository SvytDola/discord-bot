import {
    EmbedBuilder,
    ChatInputCommandInteraction,
    SlashCommandSubcommandBuilder
} from "discord.js";

import {BaseCommand} from "../base.mjs";

import {ServiceManager} from "../../manager/service.mjs";
import {UsersService} from "../../service/user.mjs";
import {TransactionsService} from "../../service/transaction.mjs";
import {cfg} from "../../config/index.mjs";

export class BalanceSendSubCommand extends BaseCommand<SlashCommandSubcommandBuilder> {

    constructor() {
        super(
            new SlashCommandSubcommandBuilder()
                .setName("send")
                .setDescription("Send tokens to user")
                .addNumberOption(option =>
                    option
                        .setName("tokens")
                        .setDescription("Number of token.")
                        .setRequired(true)
                )
                .addUserOption(option =>
                    option
                        .setName("user")
                        .setDescription("Mention.")
                        .setRequired(true)
                )
        );
    }



    async execute(interaction: ChatInputCommandInteraction, serviceManager: ServiceManager): Promise<void> {
        const userDiscordTo = interaction.options.getUser("user", true);
        const tokens = interaction.options.getNumber("tokens", true);

        const usersService = serviceManager.getService(UsersService);
        const transactionsService = serviceManager.getService(TransactionsService);

        const userFrom = await usersService.getUserIfNotExistThenCreate(interaction.user.id)
        const userTo = await usersService.getUserIfNotExistThenCreate(userDiscordTo.id);

        const transaction = await transactionsService.sendTokens(userFrom, userTo, tokens);

        const url = interaction.user.avatarURL();

        const embed = new EmbedBuilder()
            .setTitle(`Id transaction ${transaction.id}`)
            .setDescription(
                `${interaction.user.username} send ${transaction.coins} ${cfg.tokenName} to ${userDiscordTo.username} gas ${transaction.commission}`
            )
            .setAuthor({
                name: interaction.user.username,
                iconURL: url == null ? interaction.user.defaultAvatarURL : url
            })
            .setColor(cfg.embedColor);

        await interaction.reply({embeds: [embed], ephemeral: true});
    }
}