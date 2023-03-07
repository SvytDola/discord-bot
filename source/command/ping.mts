import {ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js";

import {BaseCommand} from "./base.mjs";

import {Role} from "../enum/role.mjs";
import {Roles} from "../guard/role.mjs";
import {User} from "../database/model/user.mjs";

export class PingCommand implements BaseCommand<SlashCommandBuilder> {
    public data: SlashCommandBuilder;

    constructor() {
        this.data = new SlashCommandBuilder()
            .setName("ping")
            .setDescription("Replies with Pong!");
    }

    @Roles(Role.admin, Role.moderator)
    public async execute(interaction: ChatInputCommandInteraction, user: User): Promise<void> {
        await interaction.reply("Pong!");
    }
}
