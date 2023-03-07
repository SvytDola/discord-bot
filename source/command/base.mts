import {
    SlashCommandSubcommandBuilder,
    SlashCommandSubcommandsOnlyBuilder,

    ChatInputCommandInteraction, Collection,
} from "discord.js";

export interface BaseCommand<T> {
    data: T;

    execute(interaction: ChatInputCommandInteraction, ...args: any): Promise<void>;
}

export class BaseSubCommand implements BaseCommand<SlashCommandSubcommandsOnlyBuilder> {
    public commands: Collection<string, BaseCommand<SlashCommandSubcommandBuilder>>;

    constructor(public data: SlashCommandSubcommandsOnlyBuilder, commands: BaseCommand<SlashCommandSubcommandBuilder>[]) {

        this.commands = new Collection<string, BaseCommand<SlashCommandSubcommandBuilder>>();
        for (const command of commands) {
            this.data.addSubcommand(command.data);
            this.commands.set(command.data.name, command);
        }
    }

    async execute(interaction: ChatInputCommandInteraction) {
        const subcommand = interaction.options.getSubcommand();
        const command = this.commands.get(subcommand);
        if (!command) return;
        await command.execute(interaction);
    }
}
