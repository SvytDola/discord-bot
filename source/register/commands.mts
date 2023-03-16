import {REST, Routes} from "discord.js";


export async function registerCommandsInGuild(
    token: string,
    clientId: string,
    guildId: string,
    commands: any[]) {
    // Construct and prepare an instance of the REST module
    const rest = new REST({version: '10'}).setToken(token);

    // The put method is used to fully refresh all commands in the guild with the current set
    return await rest.put(
        Routes.applicationGuildCommands(clientId, guildId),
        {body: commands},
    );
}

export async function registerCommandsInGlobal(
    token: string,
    clientId: string,
    commands: any[]) {
    // Construct and prepare an instance of the REST module
    const rest = new REST({version: '10'}).setToken(token);

    // The put method is used to fully refresh all commands in the guild with the current set
    return await rest.put(
        Routes.applicationCommands(clientId),
        {body: commands},
    );
}
