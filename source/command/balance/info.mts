import {
    ChatInputCommandInteraction,
    SlashCommandSubcommandBuilder,
    EmbedBuilder,
    APIEmbedField
} from "discord.js";

import {BaseCommand} from "../base.mjs";

import {ServiceManager} from "../../manager/service.mjs";
import {UsersService} from "../../service/user.mjs";
import {TransactionsService} from "../../service/transaction.mjs";
import {cfg} from "../../config/index.mjs";

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

    async execute(interaction: ChatInputCommandInteraction, serviceManager: ServiceManager) {
        const userDiscord = interaction.options.getUser("user");
        const discordUserIsNotNull = userDiscord != null;

        const usersService = serviceManager.getService(UsersService);
        const transactionsService  = serviceManager.getService(TransactionsService);

        let user = await usersService.getOrCreate(interaction.user.id);

        if (discordUserIsNotNull) user = await usersService.getOrCreate(userDiscord.id);

        const transactions = await transactionsService.getListFromUserId(user.id);

        const fields: APIEmbedField[] = [];

        for (const transaction of transactions) {
            fields.push({
                name: transaction.createdAt.toLocaleString(),
                value: `<@${transaction.from}> send ${transaction.coins} ${cfg.tokenName} to <@${transaction.to}> gas ${transaction.commission}`
            });
        }
        const url = discordUserIsNotNull ? userDiscord.avatarURL() : interaction.user.avatarURL();
        const embed = new EmbedBuilder()
            .setThumbnail(url)
            .setTitle(`${user.balance.toString()} ${cfg.tokenName}`)
            .setColor(cfg.embedColor)
            .setDescription(`Last ${transactions.length} transactions.`)
            .setTimestamp()
            .setFields(fields);


        await interaction.reply({embeds: [embed], ephemeral: true});
    }
}