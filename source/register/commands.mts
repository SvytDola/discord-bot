import {REST, Routes} from "discord.js";


export async function registerCommands(
    token: string,
    clientId: string,
    guildId: string,
    commands: any[],
    isGlobal: boolean) {
    // Construct and prepare an instance of the REST module
    const rest = new REST({version: '10'}).setToken(token);

    // The put method is used to fully refresh all commands in the guild with the current set
    if (!isGlobal) {
        return  await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            {body: commands},
        );
    } else {
        return  await rest.put(
            Routes.applicationCommands(clientId),
            {body: commands},
        );
    }
}
