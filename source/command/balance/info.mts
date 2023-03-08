import { 
    CacheType,
    ChatInputCommandInteraction,
    SlashCommandSubcommandBuilder,
    EmbedBuilder
} from "discord.js";
import { BaseCommand } from "../base.mjs";
import { EMBED_COLOR, NAME_TOKEN } from "../../config/index.mjs";
import { getUserIfNotExistThenCreate } from "../../service/user.mjs";

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

        const embed = new EmbedBuilder()
            .setTitle("Balance")
            .setColor(EMBED_COLOR)
            .setDescription("Info of balance")
            .setTimestamp()
            .setFields([
                {
                    name: NAME_TOKEN, value: user.balance.toString()
                }
            ]);

        await interaction.reply({embeds: [embed]});
    }
}