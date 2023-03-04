import {
    SlashCommandBuilder,
    SlashCommandSubcommandBuilder,
    SlashCommandSubcommandsOnlyBuilder,

    ChatInputCommandInteraction,
} from "discord.js";

export abstract class BaseCommand {
    public abstract data: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder | SlashCommandSubcommandBuilder;

    public abstract execute(interaction: ChatInputCommandInteraction, ...args: any): Promise<void>;
}