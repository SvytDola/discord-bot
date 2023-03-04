import {
    Client,
    GatewayIntentBits,
    Events
} from "discord.js";

import {sequelize} from "./database/db.mjs";
import {onInteractionCreate, onReady} from "./event/index.mjs";
import {CLIENT_ID, DISCORD_TOKEN, GUILD_ID} from "./config/index.mjs";
import {registerCommands} from "./register/commands.mjs";
import {commands} from "./command/index.mjs";

async function main() {
    await sequelize.sync()

    const client = new Client({intents: [GatewayIntentBits.Guilds]})

    client.addListener(Events.ClientReady, onReady)
    client.addListener(Events.InteractionCreate, onInteractionCreate)

    const jsonCommands = []

    for (const command of commands.values()) {
        jsonCommands.push(command.data.toJSON())
    }

    await registerCommands(DISCORD_TOKEN, CLIENT_ID, GUILD_ID, jsonCommands, false)

    await client.login(DISCORD_TOKEN)
}

await main()
