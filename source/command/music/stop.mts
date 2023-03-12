import {ChatInputCommandInteraction, SlashCommandSubcommandBuilder,} from "discord.js";

import {BaseCommand} from "../base.mjs";

import {User} from "../../model/user.mjs";



export class MusicStopSubCommand extends BaseCommand<SlashCommandSubcommandBuilder> {

    constructor() {
        super(
            new SlashCommandSubcommandBuilder()
                .setName("stop")
                .setDescription("Stop playing music.")
        );
    }

    async execute(interaction: ChatInputCommandInteraction, user: User) {

    }
}
