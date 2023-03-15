import {APIEmbedField} from "discord-api-types/payloads/v10"
import {ChatInputCommandInteraction, EmbedBuilder, SlashCommandSubcommandBuilder} from "discord.js";

import {BaseCommand} from "../base.mjs";

import {Permission} from "../../enum/permission.mjs";
import {ServiceManager} from "../../manager/service.mjs";
import {cfg} from "../../config/index.mjs";


export class RoleListSubCommand extends BaseCommand<SlashCommandSubcommandBuilder> {

    constructor() {
        super(new SlashCommandSubcommandBuilder()
            .setName("list")
            .setDescription("Return all permission roles."));
    }

    async execute(interaction: ChatInputCommandInteraction, _: ServiceManager) {
        const fields: APIEmbedField[] = [];
        const roles = Object.keys(Permission) as Permission[];

        for (const role of roles.slice(0, roles.length / 2 + 1)) {
            const field = {
                name: role,
                value: `${Permission[role]}`
            }
            fields.push(field);
        }

        const embed = new EmbedBuilder()
            .setColor(cfg.embedColor)
            .setTitle("Permission roles")
            .setDescription("Roles responsible for moderating the bot.")
            .setFields(fields)
            .setTimestamp();

        await interaction.reply({embeds: [embed]});
    }
}
