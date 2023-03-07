import {ChatInputCommandInteraction, EmbedBuilder, SlashCommandSubcommandBuilder} from "discord.js";

import {Role} from "../../enum/role.mjs";
import {EMBED_COLOR} from "../../config/index.mjs";
import {BaseCommand} from "../base.mjs";
import {APIEmbedField} from "discord-api-types/payloads/v10"


const StringIsNumber = (value: any) => {
    return isNaN(Number(value));
};

export class RoleListSubCommand implements BaseCommand<SlashCommandSubcommandBuilder> {
    public data: SlashCommandSubcommandBuilder;

    constructor() {
        this.data = new SlashCommandSubcommandBuilder()
            .setName("list")
            .setDescription("Return all roles.");
    }

    async execute(interaction: ChatInputCommandInteraction) {
        const fields: APIEmbedField[] = [];

        for (const val of Object.keys(Role).filter(StringIsNumber)) {
            const field = {
                name: val,
                value: `${Role[val as any]}`
            }
            fields.push(field);
        }

        const embed = new EmbedBuilder()
            .setColor(EMBED_COLOR)
            .setTitle("Permission roles")
            .setDescription("Roles responsible for moderating the bot.")
            .setFields(fields)
            .setTimestamp();

        await interaction.reply({embeds: [embed]});
    }
}
