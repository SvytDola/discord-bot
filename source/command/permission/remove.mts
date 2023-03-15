import {ChatInputCommandInteraction, SlashCommandSubcommandBuilder} from "discord.js"

import {validatePermission} from "./validate.mjs"
import {NAME_PERMISSION_ROLE_OPTION, NAME_USER_OPTION} from "./options.mjs";


import {BaseCommand} from "../base.mjs"

import {Permission} from "../../enum/permission.mjs";
import {Permissions} from "../../guard/permission.mjs";

import {PermissionNotFound, UserDoesNotHaveThisPermission} from "../../error/permission.mjs"
import {ServiceManager} from "../../manager/service.mjs";
import {UsersService} from "../../service/user.mjs";


export class RoleRemoveSubCommand extends BaseCommand<SlashCommandSubcommandBuilder> {
    constructor() {
        super(new SlashCommandSubcommandBuilder()
            .setName("remove")
            .setDescription("Remove a permission from a user.")
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
    async execute(interaction: ChatInputCommandInteraction, serviceManager: ServiceManager) {
        const usersService = serviceManager.getService(UsersService);
        const permissionRole = interaction.options.getString(NAME_PERMISSION_ROLE_OPTION, true);

        if (!validatePermission(permissionRole)) throw new PermissionNotFound(permissionRole);

        const userId = interaction.options.getUser(NAME_PERMISSION_ROLE_OPTION, true).id;
        let user = await usersService.getUserIfNotExistThenCreate(userId);

        if (!user.permissions.includes(permissionRole))
            throw new UserDoesNotHaveThisPermission(permissionRole);

        user.permissions = user.permissions.filter((permission) => permission != permissionRole);

        await user.save();
        await interaction.reply("Permission role removed.");
    }
}
