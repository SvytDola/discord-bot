import {REST, Routes} from "discord.js";


export async function registerCommands(
    token: string,
    clientId: string,
    guildId: string,
    commands: any[],
    isGlobal: boolean) {
    // Construct and prepare an instance of the REST module
    const rest = new REST({version: '10'}).setToken(token);

    // and deploy your commands!
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        let data: any;
        // The put method is used to fully refresh all commands in the guild with the current set
        if (!isGlobal) {
            data = await rest.put(
                Routes.applicationGuildCommands(clientId, guildId),
                {body: commands},
            );
        } else {
            data = await rest.put(
                Routes.applicationCommands(clientId),
                {body: commands},
            );
        }

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
}
