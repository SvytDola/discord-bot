import {ChatInputCommandInteraction, GuildMember, SlashCommandSubcommandBuilder} from "discord.js";

import {BaseCommand} from "../base.mjs";

import {User} from "../../model/user.mjs";
import {NeedPermissionToJoinAndSpeak, NeedToBeVoiceChannel} from "../../error/music.mjs";


const NAME_MUSIC_OPTION = "link"

export class MusicPlaySubCommand extends BaseCommand<SlashCommandSubcommandBuilder> {

    constructor() {
        super(
            new SlashCommandSubcommandBuilder()
                .setName("play")
                .setDescription("Start playing music.")
                .addStringOption(option =>
                    option
                        .setName(NAME_MUSIC_OPTION)
                        .setDescription("Url or title.")
                        .setRequired(true)
                )
        );
    }

    async execute(interaction: ChatInputCommandInteraction, user: User): Promise<void> {
        if (!(interaction.member instanceof GuildMember)) return;

        const linkOrTitle = interaction.options.getString(NAME_MUSIC_OPTION, true);

        const voiceChannel = interaction.member.voice.channel;

        if (!voiceChannel) throw new NeedToBeVoiceChannel();

        const permissions = voiceChannel.permissionsFor(interaction.user)!;
        if (!permissions.has("Connect") || !permissions.has("Speak"))
            throw new NeedPermissionToJoinAndSpeak();


    }
}