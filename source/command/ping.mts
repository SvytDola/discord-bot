import {ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js";

import {BaseCommand} from "./base.mjs";

import {User} from "../model/user.mjs";
import {Permission} from "../enum/permission.mjs";
import {Permissions} from "../guard/permission.mjs";
import {ServiceManager} from "../manager/service.mjs";

export class PingCommand extends BaseCommand<SlashCommandBuilder> {

    constructor() {
        super(new SlashCommandBuilder()
            .setName("ping")
            .setDescription("Replies with Pong!"));
    }

    @Permissions(Permission.admin, Permission.moderator)
    public async execute(interaction: ChatInputCommandInteraction, user: User, serviceManager: ServiceManager) {
        await interaction.reply("Pong!");
    }
}
