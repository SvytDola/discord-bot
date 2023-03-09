import {
    Client,
    GatewayIntentBits,
    Events, Collection, SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder
} from "discord.js";

import {sequelize} from "./database/db.mjs";
import {BalanceCommand, BaseCommand, FaucetCommand, PingCommand, RoleCommand} from "./command/index.mjs";
import {registerCommands} from "./register/commands.mjs";
import {onInteractionCreate, onReady} from "./event/index.mjs";
import {CLIENT_ID, DISCORD_TOKEN, GUILD_ID} from "./config/index.mjs";

type AppConfiguration = {
    pushToGlobal: boolean
}

async function getApp(config: AppConfiguration) {
    await sequelize.sync();

    const commands: Collection<string,
        BaseCommand<SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder>> =
        new Collection<string, BaseCommand<SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder>>();

    const jsonCommands = [];
    const dataCommands = [
        new PingCommand(),
        new RoleCommand(),
        new BalanceCommand(),
        new FaucetCommand()
    ];

    for (const command of dataCommands) {
        commands.set(command.data.name, command);
        jsonCommands.push(command.data.toJSON());
    }

    const client = new Client({intents: [GatewayIntentBits.Guilds]});

    client.addListener(Events.ClientReady, onReady);
    client.addListener(Events.InteractionCreate, onInteractionCreate);

    await registerCommands(DISCORD_TOKEN, CLIENT_ID, GUILD_ID, jsonCommands, config.pushToGlobal);
    return client;
}
async function main() {
    const app = await getApp({
        pushToGlobal: process.argv.includes("release")
    });
    await app.login(DISCORD_TOKEN)
}

await main();
