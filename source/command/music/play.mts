import {ChatInputCommandInteraction, GuildMember, SlashCommandSubcommandBuilder,} from "discord.js";
import play from "play-dl";

import {
    joinVoiceChannel
} from "@discordjs/voice";


import {BaseCommand} from "../base.mjs";

import {User} from "../../model/user.mjs";


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

    createVoiceConnection(
        guildId: string,
        channelId: string,
        voiceAdapterCreator: any
    ) {
        return joinVoiceChannel({
            channelId: channelId,
            guildId: guildId,
            adapterCreator: voiceAdapterCreator
        });
    }

    async execute(interaction: ChatInputCommandInteraction, user: User): Promise<void> {
        if (!(interaction.member instanceof GuildMember)) return;
        if (interaction.guildId == null) return;


        await interaction.deferReply();
        const guildId = interaction.guildId;

        const client = interaction.client;

        let guildQueue = client.player.getQueue(guildId);

        const linkOrTitle = interaction.options.getString(NAME_MUSIC_OPTION, true)

        let queue = client.player.createQueue(interaction.guildId!);
        await queue.join(interaction.member.voice.channel!);
        let song = await queue.play(linkOrTitle).catch(err => {
            console.log(err);
            if (!guildQueue)
                queue.stop();
        });
        await interaction.reply("Added track..");
    }
}
