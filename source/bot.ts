import {
    Client,
    GatewayIntentBits,
    Events
} from "discord.js";

import {sequelize} from "./database/db.mjs";
import {onInteractionCreate, onReady} from "./event/index.mjs";
import {DISCORD_TOKEN} from "./config/index.mjs";

async function main() {
    await sequelize.sync()

    const client = new Client({intents: [GatewayIntentBits.Guilds]})

    client.addListener(Events.ClientReady, onReady)
    client.addListener(Events.InteractionCreate, onInteractionCreate)

    await client.login(DISCORD_TOKEN)
}

await main()
