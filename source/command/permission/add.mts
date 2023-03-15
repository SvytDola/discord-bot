import {ChatInputCommandInteraction, SlashCommandSubcommandBuilder} from "discord.js";
import {validatePermission} from "./validate.mjs";

import {BaseCommand} from "../base.mjs";


import {Permission} from "../../enum/permission.mjs";
import {Permissions} from "../../guard/permission.mjs";

import {
    PermissionAlreadyExists,
    PermissionNotFound
} from "../../error/permission.mjs";

import {NAME_PERMISSION_ROLE_OPTION, NAME_USER_OPTION} from "./options.mjs";
import {ServiceManager} from "../../manager/service.mjs";
import {UsersService} from "../../service/user.mjs";


export class RoleAddSubCommand extends BaseCommand<SlashCommandSubcommandBuilder> {

    constructor() {
        super(new SlashCommandSubcommandBuilder()
            .setName("add")
            .setDescription("Add a permission role permission to the user.")
            .addUserOption(option =>
                option
                    .setName(NAME_USER_OPTION)
                    .setDescription("Mention.")
                    .setRequired(true)
            )
            .addStringOption(option =>
                option
                    .setName(NAME_PERMISSION_ROLE_OPTION)
                    .setDescription("Permission role title.")
                    .setRequired(true)
            ));
    }

    @Permissions(Permission.admin)
    public async execute(interaction: ChatInputCommandInteraction, serviceManager: ServiceManager): Promise<void> {
        const usersService = serviceManager.getService(UsersService);

        const permission = interaction.options.getString(NAME_PERMISSION_ROLE_OPTION, true);

        if (!validatePermission(permission)) throw new PermissionNotFound(permission);

        const userId = interaction.options.getUser(NAME_USER_OPTION, true).id;
        const user = await usersService.getUserIfNotExistThenCreate(userId);

        if (user.permissions.includes(permission))
            throw new PermissionAlreadyExists(permission);

        user.permissions = [...user.permissions, permission];

        await user.save();
        await interaction.reply("Role added.");
    }
}