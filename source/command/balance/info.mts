import { 
    CacheType,
    ChatInputCommandInteraction,
    SlashCommandSubcommandBuilder,
    EmbedBuilder,
    APIEmbedField
} from "discord.js";
import { BaseCommand } from "../base.mjs";
import { EMBED_COLOR, NAME_TOKEN } from "../../config/index.mjs";
import { getUserIfNotExistThenCreate } from "../../service/user.mjs";
import { getTransactionsFromUser } from "../../service/transaction.mjs";

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

    async execute(interaction: ChatInputCommandInteraction<CacheType>) {
        
        const userId = interaction.options.getUser("user")?.id;
        const user = await getUserIfNotExistThenCreate(
            userId === undefined ? interaction.user.id : userId
        );


        const transactions = await getTransactionsFromUser(user.id)

        const fields: APIEmbedField[] = [];

        for (const transaction of transactions) {
            fields.push({
                name: transaction.createdAt.toLocaleString(),
                value: `<@${transaction.from}> send ${transaction.coins} ${NAME_TOKEN} to <@${transaction.to}>`
            });
        }

        const embed = new EmbedBuilder()
            .setTitle("Balance")
            .setColor(EMBED_COLOR)
            .setDescription(`${user.balance.toString()} ${NAME_TOKEN}`)
            .setTimestamp()
            .setFields(fields)

        await interaction.reply({embeds: [embed]});
    }
}