import {Collection, Interaction} from "discord.js";
import {ServiceManager} from "../manager/service.mjs";
import {BaseError} from "../error/base.mjs";
import {BaseCommand} from "../command/index.mjs";

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
        if (error instanceof BaseError) {
            await interaction.reply({content: error.message});
            return;
        }
        console.error(error);
    }
}