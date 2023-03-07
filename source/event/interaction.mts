import {Interaction} from "discord.js"

import {commands} from "../command/index.mjs"
import {BaseError} from "../error/base.mjs"

export async function onInteractionCreate(interaction: Interaction) {
    if (!interaction.isChatInputCommand()) return;

    const command = commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        if (error instanceof BaseError) {
             await interaction.reply({content: error.message});
             return;
        }
        console.error(error);
    }
}