import { SlashCommandBuilder } from "discord.js";
import { BaseCommandSubCommands } from "../base.mjs";
import { MusicPlaySubCommand } from "./play.mjs";

export class MusicCommand extends BaseCommandSubCommands {
    constructor() {
        super(
            new SlashCommandBuilder()
                .setName("music")
                .setDescription("Music manager"),
            [
                new MusicPlaySubCommand()
            ],
            false
        );
    }
}