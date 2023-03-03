import {Interaction} from "discord.js";
import {commands} from "../command/index.mjs"
import {BaseError} from "../error/base.mjs";

export async function onInteractionCreate(interaction: Interaction) {
    if (!interaction.isChatInputCommand()) return

    const command = commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`)
        return
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error)
        if (error instanceof BaseError) {
             await interaction.reply({content: error.message, ephemeral: true})
             return
        }

        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({content: 'There was an error while executing this command!', ephemeral: true})
        } else {
            await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true})
        }
    }
}