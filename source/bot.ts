import {
    Client,
    GatewayIntentBits,
    Events,
    Collection,
    Interaction
} from "discord.js";

import {getSequelize} from "./database/db.mjs";
import {
    BalanceCommand,
    BaseCommand,
    FaucetCommand,
    PingCommand,
    PermissionCommand
} from "./command/index.mjs";

import {onInteractionCreate, onReady} from "./event/index.mjs";
import {registerCommandsInGuild} from "./register/commands.mjs";
import {
    CLIENT_ID,
    DATABASE_DIALECT,
    DATABASE_NAME,
    DATABASE_PASSWORD,
    DATABASE_PORT,
    DATABASE_USERNAME,
    DISCORD_TOKEN, GUILD_IDS
} from "./config/index.mjs";

import {UsersService} from "./service/user.mjs";
import {TransactionsService} from "./service/transaction.mjs";

import {User} from "./model/user.mjs";
import {Transaction} from "./model/transaction.mjs";

import {ServiceManager} from "./manager/service.mjs";
import {ProfileService} from "./service/profile.mjs";
import {Profile} from "./model/profile.mjs";

async function getApp() {
    const sequelize = await getSequelize({
        database: DATABASE_NAME,
        username: DATABASE_USERNAME,
        password: DATABASE_PASSWORD,
        dialect: DATABASE_DIALECT,
        port: DATABASE_PORT
    }, [User, Profile, Transaction]);

    const serviceManager = new ServiceManager();

    serviceManager.setService(new UsersService(sequelize.getRepository(User)));
    serviceManager.setService(new TransactionsService(sequelize.getRepository(Transaction)));
    serviceManager.setService(new ProfileService(sequelize.getRepository(Profile)))

    const commands = new Collection<string, BaseCommand<any>>();

    const dataCommands = [
        new PingCommand(),
        new PermissionCommand(),
        new BalanceCommand(),
        new FaucetCommand()
    ];

    for (const command of dataCommands) {
        commands.set(command.data.name, command);
    }

    const client = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildVoiceStates,
            GatewayIntentBits.DirectMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildMessages
        ]})
        .addListener(Events.ClientReady, onReady)
        .addListener(Events.InteractionCreate, async (interaction: Interaction) => {
            await onInteractionCreate(interaction, serviceManager, commands);
        });

    const jsonGuildCommands = commands.map(value => value.data.toJSON());

    for (const guildId of GUILD_IDS) {
        await registerCommandsInGuild(
            DISCORD_TOKEN,
            CLIENT_ID,
            guildId,
            jsonGuildCommands
        );
    }

    console.log(`Successfully reloaded  application (/) commands.`);
    return client;
}

async function main() {
    const app = await getApp();
    await app.login(DISCORD_TOKEN)
}

await main();
