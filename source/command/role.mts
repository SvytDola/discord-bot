import {ChatInputCommandInteraction, SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder} from "discord.js";

import {BaseCommand} from "./base.mjs"

import {Role} from "../enum/role.mjs";
import {Roles} from "../guard/role.mjs";

export class RoleCommand extends BaseCommand {
    data: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder;

    constructor() {
        super();
        this.data = new SlashCommandBuilder()
            .setName("role")
            .setDescription("Role editor.")
            .addSubcommand(command =>
                command
                    .setName("add")
                    .setDescription("Add a role to the user.")
                    .addStringOption(option => option.setName("Role title."))
            )
    }

    @Roles(Role.ADMIN, Role.MODERATOR)
    public async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        await interaction.reply("Pong!")
    }
}
