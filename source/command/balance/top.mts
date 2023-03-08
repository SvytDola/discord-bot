import {BaseCommand} from "../base.mjs";
import {APIEmbedField, ChatInputCommandInteraction, EmbedBuilder, SlashCommandSubcommandBuilder} from "discord.js";
import {getUsers} from "../../service/user.mjs";
import {EMBED_COLOR, NAME_TOKEN} from "../../config/index.mjs";


export class BalanceTopSubCommand extends BaseCommand<SlashCommandSubcommandBuilder> {

    constructor() {
        super(
            new SlashCommandSubcommandBuilder()
                .setName("top")
                .setDescription("List top user of balance.")
        );
    }

    async execute(interaction: ChatInputCommandInteraction): Promise<void> {

        const users = await getUsers();

        const fields: APIEmbedField[] = []

        for (const user of users) {
            fields.push({
                name: `${user.balance} ${NAME_TOKEN}`,
                value: `<@${user.id}>`
            });
        }

        const embed = new EmbedBuilder()
            .setFields(fields)
            .setTimestamp()
            .setColor(EMBED_COLOR)
            .setTitle("Top of balance")
            .setDescription("First five users")

        await interaction.reply({embeds: [embed]});
    }
}