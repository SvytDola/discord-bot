import {ChatInputCommandInteraction, SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder} from "discord.js";

import {BaseCommand} from "./base.mjs"

import {Role} from "../enum/role.mjs";
import {Roles} from "../guard/role.mjs";
import {User} from "../database/model/user.mjs";
import {RoleAlreadyExists, RoleNotFound} from "../error/role.mjs";
import {UserService} from "../service/user.mjs";

export class RoleCommand extends BaseCommand {
    data: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder;

    constructor() {
        super();
        this.data = new SlashCommandBuilder()
            .setName("role")
            .setDescription("Role editor.")
            .addSubcommand(command =>
                command
                    .setName("add")
                    .setDescription("Add a role to the user.")
                    .addUserOption(option =>
                        option
                            .setName("user")
                            .setDescription("User id.")
                            .setRequired(true)
                    )
                    .addStringOption(option =>
                        option
                            .setName("role")
                            .setDescription("Role title.")
                            .setRequired(true)
                    )
            )
    }

    static async addRole(interaction: ChatInputCommandInteraction, user: User) {
        const role: any = interaction.options.getString("role")?.toUpperCase()
        const roleId = Role[role]

        const userId = interaction.options.getUser("user")?.id!

        if (roleId === undefined)
            throw new RoleNotFound(role)

        const roleIdNumber = +roleId;

        if (userId !== user.id) {
            user = await UserService.getUserIfNotExistThenCreate(userId);
        }
        if (user.roles.includes(roleIdNumber))
            throw new RoleAlreadyExists(role)

        user.roles = [...user.roles, roleIdNumber]

        await user.save()
        await interaction.reply("Role added.")
    }

    @Roles(Role.ADMIN, Role.MODERATOR)
    public async execute(interaction: ChatInputCommandInteraction, user: User): Promise<void> {
        const subcommand = interaction.options.getSubcommand()
        switch (subcommand) {
            case "add": {
                await RoleCommand.addRole(interaction, user)
                break
            }
            case "remove": {
                break
            }
        }

    }
}
