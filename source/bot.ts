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
import {registerCommandsInGlobal, registerCommandsInGuild} from "./register/commands.mjs";
import {cfg} from "./config/index.mjs";

import {UsersService} from "./service/user.mjs";
import {TransactionsService} from "./service/transaction.mjs";

import {User} from "./model/user.mjs";
import {Transaction} from "./model/transaction.mjs";

import {ServiceManager} from "./manager/service.mjs";
import {ProfileService} from "./service/profile.mjs";
import {Profile} from "./model/profile.mjs";

async function getApp() {
    const sequelize = getSequelize({
        database: cfg.database.name,
        username: cfg.database.username,
        password: cfg.database.password,
        dialect: cfg.database.dialect,
        port: cfg.database.port
    }, [User, Profile, Transaction]);

    await sequelize.sync();

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
        ]
    })
        .addListener(Events.ClientReady, onReady)
        .addListener(Events.InteractionCreate, async (interaction: Interaction) => {
            await onInteractionCreate(interaction, serviceManager, commands);
        });

    const jsonGuildCommands = dataCommands.filter(value => !value.isGlobalCommand).map(value => value.data.toJSON());
    const globalCommands = dataCommands.filter(value => value.isGlobalCommand).map(value => value.data.toJSON());

    for (const guildId of cfg.guildIds) {
        await registerCommandsInGuild(
            cfg.token,
            cfg.clientId,
            guildId,
            jsonGuildCommands
        );
    }
    await registerCommandsInGlobal(cfg.token, cfg.clientId, globalCommands);
    console.log(`Successfully reloaded  application (/) commands.`);
    return client;
}

async function main() {
    const app = await getApp();
    await app.login(cfg.token);
}

await main();
