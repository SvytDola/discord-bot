import {
    ChatInputCommandInteraction,
    SlashCommandSubcommandBuilder,
    EmbedBuilder,
    APIEmbedField
} from "discord.js";
import {BaseCommand} from "../base.mjs";
import {EMBED_COLOR, NAME_TOKEN} from "../../config/index.mjs";
import {getUserIfNotExistThenCreate} from "../../service/user.mjs";
import {getTransactionsFromUser} from "../../service/transaction.mjs";

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

    async execute(interaction: ChatInputCommandInteraction) {
        const userDiscord = interaction.options.getUser("user");
        const condition =  userDiscord == null;

        const user = await getUserIfNotExistThenCreate(
            condition ? interaction.user.id : userDiscord.id
        );
        const transactions = await getTransactionsFromUser(user.id)

        const fields: APIEmbedField[] = [];

        for (const transaction of transactions) {
            fields.push({
                name: transaction.createdAt.toLocaleString(),
                value: `<@${transaction.from}> send ${transaction.coins} ${NAME_TOKEN} to <@${transaction.to}>`
            });
        }
        const url =  condition ? interaction.user.avatarURL() : userDiscord.avatarURL();
        const embed = new EmbedBuilder()
            .setTitle(`${user.balance.toString()} ${NAME_TOKEN}`)
            .setColor(EMBED_COLOR)
            .setDescription(`Last ${transactions.length} transactions.`)
            .setTimestamp()
            .setFields(fields)
            .setAuthor({
                name: condition ? interaction.user.username : userDiscord.username,
                iconURL: url == null ? interaction.user.defaultAvatarURL : url
            });

        await interaction.reply({embeds: [embed], ephemeral: true});
    }
}