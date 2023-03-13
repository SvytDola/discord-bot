import {
    EmbedBuilder,
    ChatInputCommandInteraction,
    SlashCommandSubcommandBuilder
} from "discord.js";

import {BaseCommand} from "../base.mjs";

import {User} from "../../model/user.mjs";
import {InadequateBalance} from "../../error/balance.mjs";
import {EMBED_COLOR, NAME_TOKEN} from "../../config/index.mjs";
import {ServiceManager} from "../../manager/service.mjs";
import {UsersService} from "../../service/user.mjs";
import {TransactionsService} from "../../service/transaction.mjs";

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

    async execute(interaction: ChatInputCommandInteraction, userFrom: User, serviceManager: ServiceManager): Promise<void> {
        const userDiscordFrom = interaction.options.getUser("user", true);
        const tokens = interaction.options.getNumber("tokens", true);

        const usersService = serviceManager.getService(UsersService);
        const transactionsService = serviceManager.getService(TransactionsService);

        const userTo = await usersService.getUserIfNotExistThenCreate(userDiscordFrom.id);

        const temp = userFrom.balance - tokens;

        if (temp < 0)
            throw new InadequateBalance();

        userFrom.balance = temp;
        userTo.balance += tokens;

        await userFrom.save();
        await userTo.save();

        const transaction = await transactionsService.create(userFrom.id, userTo.id, tokens);

        const url = interaction.user.avatarURL();

        const embed = new EmbedBuilder()
            .setTitle(`Id transaction ${transaction.id}`)
            .setDescription(
                `${interaction.user.username} send ${transaction.coins} ${NAME_TOKEN} to ${userDiscordFrom.username}`
            )
            .setAuthor({
                name: interaction.user.username,
                iconURL: url == null ? interaction.user.defaultAvatarURL : url
            })
            .setColor(EMBED_COLOR);

        await interaction.reply({embeds: [embed], ephemeral: true});
    }
}