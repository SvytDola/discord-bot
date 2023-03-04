import {
    ChatInputCommandInteraction,
    Collection,
    SlashCommandBuilder,
    SlashCommandSubcommandsOnlyBuilder
} from "discord.js";

import {BaseCommand} from "../base.mjs"

import {RoleAddSubCommand} from "./add.mjs";
import {RoleListSubCommand} from "./list.mjs";
import {RoleRemoveSubCommand} from "./remove.mjs";

import {Role} from "../../enum/role.mjs";
import {Roles} from "../../guard/role.mjs";
import {User} from "../../database/model/user.mjs";

const commands = new Collection<string, BaseCommand>()

export class RoleCommand extends BaseCommand {
    public data: SlashCommandSubcommandsOnlyBuilder

    constructor() {
        super();

        const roleAddSubCommand = new RoleAddSubCommand()
        const roleListSubCommand = new RoleListSubCommand()
        const roleRemoveSubCommand = new RoleRemoveSubCommand()

        commands.set("add", roleAddSubCommand)
        commands.set("list", roleListSubCommand)
        commands.set("remove", roleRemoveSubCommand)

        this.data = new SlashCommandBuilder()
            .setName("role")
            .setDescription("Role editor.")
            .addSubcommand(roleAddSubCommand.data)
            .addSubcommand(roleRemoveSubCommand.data)
            .addSubcommand(roleListSubCommand.data)
    }

    @Roles(Role.ADMIN)
    public async execute(interaction: ChatInputCommandInteraction, user: User): Promise<void> {
        const subcommand = interaction.options.getSubcommand()
        const command = commands.get(subcommand)
        if (!command) return
        await command.execute(interaction, user)
    }
}
