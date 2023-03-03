import {Interaction, SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder} from "discord.js";

export abstract class BaseCommand {
    public abstract data: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder;

    public abstract execute(interaction: Interaction, ...args: any): Promise<void>;
}