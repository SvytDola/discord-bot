import {
    Client,
    GatewayIntentBits,
    Events, Collection, SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder, Interaction
} from "discord.js";

import {sequelize} from "./database/db.mjs";
import {
    BalanceCommand,
    BaseCommand,
    FaucetCommand,
    PingCommand,
    PermissionCommand
} from "./command/index.mjs";

import {onReady} from "./event/index.mjs";
import {BaseError} from "./error/base.mjs";
import {registerCommands} from "./register/commands.mjs";
import {
    CLIENT_ID,
    DISCORD_TOKEN,
    GUILD_ID
} from "./config/index.mjs";
import {getUserIfNotExistThenCreate} from "./service/user.mjs";

type AppConfiguration = {
    pushToGlobal: boolean
}

async function getApp(config: AppConfiguration) {
    await sequelize.sync({force: config.pushToGlobal});

    const commands: Collection<string,
        BaseCommand<SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder>> =
        new Collection<string, BaseCommand<SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder>>();

    const jsonCommands = [];
    const dataCommands = [
        new PingCommand(),
        new PermissionCommand(),
        new BalanceCommand(),
        new FaucetCommand()
    ];

    for (const command of dataCommands) {
        commands.set(command.data.name, command);
        jsonCommands.push(command.data.toJSON());
    }

    const client = new Client({intents: [GatewayIntentBits.Guilds]})
        .addListener(Events.ClientReady, onReady)
        .addListener(Events.InteractionCreate, async (interaction: Interaction) => {
            if (!interaction.isChatInputCommand()) return;

            const command = commands.get(interaction.commandName);

            if (!command) {
                console.error(`No command matching ${interaction.commandName} was found.`);
                return;
            }

            try {
                const user = await getUserIfNotExistThenCreate(interaction.user.id);
                await command.execute(interaction, user);
            } catch (error) {
                if (error instanceof BaseError) {
                    await interaction.reply({content: error.message});
                    return;
                }
                console.error(error);
            }
        });

    const data: any = await registerCommands(DISCORD_TOKEN, CLIENT_ID, GUILD_ID, jsonCommands, config.pushToGlobal);
    console.log(`Successfully reloaded ${data.length} application (/) commands.`);

    return client;
}

async function main() {
    const app = await getApp({
        pushToGlobal: process.argv.includes("release")
    });
    await app.login(DISCORD_TOKEN)
}

await main();
