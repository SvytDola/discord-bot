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
    PermissionCommand,
    MusicCommand
} from "./command/index.mjs";

import {onReady} from "./event/index.mjs";
import {BaseError} from "./error/base.mjs";
import {registerCommands} from "./register/commands.mjs";
import {
    CLIENT_ID,
    DATABASE_DIALECT,
    DATABASE_NAME,
    DATABASE_PASSWORD,
    DATABASE_PORT,
    DATABASE_USERNAME,
    DISCORD_TOKEN
} from "./config/index.mjs";
import {UsersService} from "./service/user.mjs";
import {User} from "./model/user.mjs";
import {TransactionsService} from "./service/transaction.mjs";
import {Transaction} from "./model/transaction.mjs";
import {ServiceManager} from "./manager/service.mjs";

async function getApp() {
    const sequelize = await getSequelize({
        database: DATABASE_NAME,
        username: DATABASE_USERNAME,
        password: DATABASE_PASSWORD,
        dialect: DATABASE_DIALECT,
        port: DATABASE_PORT
    });

    const serviceManager = new ServiceManager();

    serviceManager.setService(new UsersService(sequelize.getRepository(User)));
    serviceManager.setService(new TransactionsService(sequelize.getRepository(Transaction)));

    const usersService = serviceManager.getService<UsersService>(UsersService);

    const commands = new Collection<string, BaseCommand<any>>();

    const jsonCommands = [];
    const dataCommands = [
        new PingCommand(),
        new PermissionCommand(),
        new BalanceCommand(),
        new FaucetCommand(),
        new MusicCommand()
    ];

    for (const command of dataCommands) {
        commands.set(command.data.name, command);
        jsonCommands.push(command.data.toJSON());
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
            if (!interaction.isChatInputCommand()) return;

            const command = commands.get(interaction.commandName);

            if (!command) {
                console.error(`No command matching ${interaction.commandName} was found.`);
                return;
            }

            try {
                const user = await usersService.getUserIfNotExistThenCreate(interaction.user.id);
                await command.execute(interaction, user, serviceManager);
            } catch (error) {
                if (error instanceof BaseError) {
                    await interaction.reply({content: error.message});
                    return;
                }
                console.error(error);
            }
        });

    const data: any = await registerCommands(DISCORD_TOKEN, CLIENT_ID, jsonCommands);
    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    return client;
}

async function main() {
    const app = await getApp();
    await app.login(DISCORD_TOKEN)
}

await main();
