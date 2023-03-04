import {ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js"

import {BaseCommand} from "./base.mjs"

import {Role} from "../enum/role.mjs"
import {Roles} from "../guard/role.mjs"

export class PingCommand extends BaseCommand {
    public data: SlashCommandBuilder

    constructor() {
        super();

        this.data = new SlashCommandBuilder()
            .setName("ping")
            .setDescription("Replies with Pong!")
    }

    @Roles(Role.ADMIN, Role.MODERATOR)
    public async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        await interaction.reply("Pong!")
    }

}
