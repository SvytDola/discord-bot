import {
    Client,
    GatewayIntentBits,
    Events
} from "discord.js";

import {sequelize} from "./database/db.mjs";
import {commands} from "./command/index.mjs";
import {registerCommands} from "./register/commands.mjs";
import {onInteractionCreate, onReady} from "./event/index.mjs";
import {CLIENT_ID, DISCORD_TOKEN, GUILD_ID} from "./config/index.mjs";
import {hideBin} from "yargs/helpers";

type AppConfiguration = {
    pushToGlobal: boolean
}

async function getApp(config: AppConfiguration) {
    await sequelize.sync();

    const client = new Client({intents: [GatewayIntentBits.Guilds]});

    client.addListener(Events.ClientReady, onReady);
    client.addListener(Events.InteractionCreate, onInteractionCreate);

    const jsonCommands = [];

    for (const command of commands.values()) {
        jsonCommands.push(command.data.toJSON());
    }

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
