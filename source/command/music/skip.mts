import {ChatInputCommandInteraction, SlashCommandSubcommandBuilder,} from "discord.js";

import {BaseCommand} from "../base.mjs";

import {User} from "../../model/user.mjs";



export class MusicSkipSubCommand extends BaseCommand<SlashCommandSubcommandBuilder> {

    constructor() {
        super(
            new SlashCommandSubcommandBuilder()
                .setName("skip")
                .setDescription("Skip music.")
        );
    }

    async execute(interaction: ChatInputCommandInteraction, user: User) {

    }
}
