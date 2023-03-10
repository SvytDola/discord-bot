import {ChatInputCommandInteraction, SlashCommandSubcommandBuilder} from "discord.js"

import {validatePermission} from "./validate.mjs"

import {BaseCommand} from "../base.mjs"

import {User} from "../../model/user.mjs";

import {Permission} from "../../enum/permission.mjs";
import {Permissions} from "../../guard/permission.mjs";

import {getUserIfNotExistThenCreate} from "../../service/user.mjs"
import {PermissionNotFound, UserDoesNotHaveThisPermission} from "../../error/permission.mjs"


export class RoleRemoveSubCommand extends BaseCommand<SlashCommandSubcommandBuilder> {
    constructor() {
        super(new SlashCommandSubcommandBuilder()
            .setName("remove")
            .setDescription("Remove a permission from a user.")
            .addUserOption(option =>
                option
                    .setName("user")
                    .setDescription("Mention.")
                    .setRequired(true)
            )
            .addStringOption(option =>
                option
                    .setName("permission")
                    .setDescription("Role title.")
                    .setRequired(true)
            ));
    }

    @Permissions(Permission.admin)
    async execute(interaction: ChatInputCommandInteraction, user: User) {
        const permissionInput = interaction.options.getString("permission", true);

        if (!validatePermission(permissionInput)) throw new PermissionNotFound(permissionInput);

        const userId = interaction.options.getUser("user", true).id;
        user = await getUserIfNotExistThenCreate(userId);

        if (!user.permissions.includes(permissionInput))
            throw new UserDoesNotHaveThisPermission(permissionInput);

        user.permissions = user.permissions.filter((permission) => permission != permissionInput);

        await user.save();
        await interaction.reply("Role removed.");
    }
}
