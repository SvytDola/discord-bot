import {APIEmbedField} from "discord-api-types/payloads/v10"
import {ChatInputCommandInteraction, EmbedBuilder, SlashCommandSubcommandBuilder} from "discord.js";

import {BaseCommand} from "../base.mjs";

import {Role} from "../../enum/role.mjs";
import {EMBED_COLOR} from "../../config/index.mjs";


export class RoleListSubCommand extends BaseCommand<SlashCommandSubcommandBuilder> {

    constructor() {
        super(new SlashCommandSubcommandBuilder()
            .setName("list")
            .setDescription("Return all roles."));
    }

    async execute(interaction: ChatInputCommandInteraction) {
        const fields: APIEmbedField[] = [];
        const roles = Object.keys(Role) as Role[];

        for (const role of roles.slice(0, roles.length / 2 + 1)) {
            const field = {
                name: role,
                value: `${Role[role]}`
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
