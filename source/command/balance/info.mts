import {
    ChatInputCommandInteraction,
    SlashCommandSubcommandBuilder,
    EmbedBuilder,
    APIEmbedField
} from "discord.js";

import {BaseCommand} from "../base.mjs";
import {EMBED_COLOR, NAME_TOKEN} from "../../config/index.mjs";

import {User} from "../../model/user.mjs";
import {ServiceManager} from "../../manager/service.mjs";
import {UsersService} from "../../service/user.mjs";
import {TransactionsService} from "../../service/transaction.mjs";

export class BalanceInfoSubcommand extends BaseCommand<SlashCommandSubcommandBuilder> {
    constructor() {
        super(
            new SlashCommandSubcommandBuilder()
                .setName("info")
                .setDescription("Info of balance.")
                .addUserOption(option =>
                    option
                        .setName("user")
                        .setDescription("Mention.")
                        .setRequired(false)
                )
        );
    }

    async execute(interaction: ChatInputCommandInteraction, user: User, serviceManager: ServiceManager) {
        const userDiscord = interaction.options.getUser("user");
        const discordUserIsNotNull = userDiscord != null;

        const usersService = serviceManager.getService(UsersService);
        const transactionsService  = serviceManager.getService(TransactionsService);

        if (discordUserIsNotNull) user = await usersService.getUserIfNotExistThenCreate(userDiscord.id);

        const transactions = await transactionsService.getFromUser(user.id);

        const fields: APIEmbedField[] = [];

        for (const transaction of transactions) {
            fields.push({
                name: transaction.createdAt.toLocaleString(),
                value: `<@${transaction.from}> send ${transaction.coins} ${NAME_TOKEN} to <@${transaction.to}>`
            });
        }
        const url = discordUserIsNotNull ? userDiscord.avatarURL() : interaction.user.avatarURL();
        const embed = new EmbedBuilder()
            .setThumbnail(url)
            .setTitle(`${user.balance.toString()} ${NAME_TOKEN}`)
            .setColor(EMBED_COLOR)
            .setDescription(`Last ${transactions.length} transactions.`)
            .setTimestamp()
            .setFields(fields);


        await interaction.reply({embeds: [embed], ephemeral: true});
    }
}