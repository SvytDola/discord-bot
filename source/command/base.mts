import {
    SlashCommandSubcommandBuilder,
    SlashCommandSubcommandsOnlyBuilder,

    ChatInputCommandInteraction, Collection,
} from "discord.js";

export abstract class BaseCommand<T> {
    protected constructor(public data: T) {}

    abstract execute(interaction: ChatInputCommandInteraction, ...args: any): Promise<void>;
}

export class BaseSubCommand extends BaseCommand<SlashCommandSubcommandsOnlyBuilder> {
    public commands: Collection<string, BaseCommand<SlashCommandSubcommandBuilder>>;

    constructor(public data: SlashCommandSubcommandsOnlyBuilder, commands: BaseCommand<SlashCommandSubcommandBuilder>[]) {
        super(data);
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
