import {BaseCommandSubCommands} from "../base.mjs";
import {SlashCommandBuilder} from "discord.js";
import {MusicPlaySubCommand} from "./play.mjs";
import {MusicSkipSubCommand} from "./skip.mjs";
import {MusicStopSubCommand} from "./stop.mjs";

export class MusicCommand extends BaseCommandSubCommands {

    constructor() {
        super(
            new SlashCommandBuilder()
                .setName("music")
                .setDescription("Music manager."),
            [
                new MusicPlaySubCommand(),
                new MusicSkipSubCommand(),
                new MusicStopSubCommand()
            ]
        );
    }

}