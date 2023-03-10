import {
    Collection,
    ChatInputCommandInteraction,
    SlashCommandSubcommandBuilder,
    SlashCommandSubcommandsOnlyBuilder,
} from "discord.js";
import {User} from "../model/user.mjs";

export abstract class BaseCommand<T> {
    protected constructor(public data: T) {}

    public abstract execute(interaction: ChatInputCommandInteraction, user: User): Promise<void>;
}

export class BaseCommandSubCommands extends BaseCommand<SlashCommandSubcommandsOnlyBuilder> {
    public commands: Collection<string, BaseCommand<SlashCommandSubcommandBuilder>>;

    constructor(public data: SlashCommandSubcommandsOnlyBuilder, commands: BaseCommand<SlashCommandSubcommandBuilder>[]) {
        super(data);
        this.commands = new Collection<string, BaseCommand<SlashCommandSubcommandBuilder>>();
        for (const command of commands) {
            this.data.addSubcommand(command.data);
            this.commands.set(command.data.name, command);
        }
    }

    async execute(interaction: ChatInputCommandInteraction, user: User) {
        const subcommand = interaction.options.getSubcommand();
        const command = this.commands.get(subcommand);
        if (!command) return;
        await command.execute(interaction, user);
    }
}
