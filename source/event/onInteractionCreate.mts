import {Collection, EmbedBuilder, Interaction} from "discord.js";
import {ServiceManager} from "../manager/service.mjs";
import {BaseError} from "../error/base.mjs";
import {BaseCommand} from "../command/index.mjs";
import { cfg } from "../config/index.mjs";

export async function onInteractionCreate(
    interaction: Interaction,
    serviceManager: ServiceManager,
    commands: Collection<string, BaseCommand<any>>
) {
    if (!interaction.isChatInputCommand()) return;

    const command = commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.execute(interaction, serviceManager);
    } catch (error) {
        console.error(error);

        if (error instanceof BaseError) {
            const embed = new EmbedBuilder()
                .setTitle("❌ Error")
                .setColor(cfg.embedColor)
                .setDescription(error.message);


            await interaction.reply({embeds: [embed]});
        }
    }
}