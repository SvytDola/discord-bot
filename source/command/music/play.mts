
import ytdl from "ytdl-core";
import {createAudioResource, StreamType, AudioPlayer, joinVoiceChannel} from "@discordjs/voice";
import {CacheType, ChatInputCommandInteraction, GuildMember, SlashCommandSubcommandBuilder} from "discord.js";

import {BaseCommand} from "../base.mjs";
import {ServiceManager} from "../../manager/service.mjs";



export class MusicPlaySubCommand extends BaseCommand<SlashCommandSubcommandBuilder> {
    
    constructor() {
        super(
            new SlashCommandSubcommandBuilder()
                .setName("play")
                .setDescription("Add music in play list.")
                .addStringOption(option  => 
                    option
                        .setName("link")
                        .setDescription("link.")
                )
        );
    }

    public async execute(interaction: ChatInputCommandInteraction<CacheType>, serviceManager: ServiceManager) {
        if (!(interaction.member instanceof GuildMember) || interaction.member.voice.channelId === null) return;

        const url = interaction.options.getString("link", true);

        const stream = ytdl(url, {quality: "highestaudio", highWaterMark: 1 << 25});

        const resource = createAudioResource(stream, { inputType: StreamType.Opus, inlineVolume: true});

        const player = new AudioPlayer();

        player.play(resource);

        const connection = joinVoiceChannel({
            channelId: interaction.member.voice.channelId,
            guildId: interaction.member.guild.id,
            adapterCreator: interaction.member.guild.voiceAdapterCreator
        });

        connection.subscribe(player);
        

        await interaction.reply("Start playing");
    }


}