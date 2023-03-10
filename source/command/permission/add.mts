import {ChatInputCommandInteraction, SlashCommandSubcommandBuilder} from "discord.js";
import {validatePermission} from "./validate.mjs";

import {BaseCommand} from "../base.mjs";

import {User} from "../../model/user.mjs";

import {Permission} from "../../enum/permission.mjs";
import {Permissions} from "../../guard/permission.mjs";

import {
    PermissionAlreadyExists,
    PermissionNotFound
} from "../../error/permission.mjs";

import {getUserIfNotExistThenCreate} from "../../service/user.mjs";

export class RoleAddSubCommand extends BaseCommand<SlashCommandSubcommandBuilder> {

    constructor() {
        super(new SlashCommandSubcommandBuilder()
            .setName("add")
            .setDescription("Add a permission permission to the user.")
            .addUserOption(option =>
                option
                    .setName("user")
                    .setDescription("Mention.")
                    .setRequired(true)
            )
            .addStringOption(option =>
                option
                    .setName("permission")
                    .setDescription("Permission title.")
                    .setRequired(true)
            ));
    }

    @Permissions(Permission.admin)
    public async execute(interaction: ChatInputCommandInteraction, _: User): Promise<void> {
        const permission = interaction.options.getString("permission", true);

        if (!validatePermission(permission)) throw new PermissionNotFound(permission);

        const userId = interaction.options.getUser("user", true).id;
        const user = await getUserIfNotExistThenCreate(userId);

        if (user.permissions.includes(permission))
            throw new PermissionAlreadyExists(permission);

        user.permissions = [...user.permissions, permission];

        await user.save();
        await interaction.reply("Role added.");
    }
}