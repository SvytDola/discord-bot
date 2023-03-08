import {ChatInputCommandInteraction, SlashCommandSubcommandBuilder} from "discord.js";
import {validateRole} from "./validate.mjs";

import {User} from "../../database/model/user.mjs";
import {BaseCommand} from "../base.mjs";
import {RoleAlreadyExists, RoleNotFound} from "../../error/role.mjs";

import {getUserIfNotExistThenCreate} from "../../service/user.mjs";
import {Roles} from "../../guard/role.mjs";
import {Role} from "../../enum/role.mjs";

export class RoleAddSubCommand extends BaseCommand<SlashCommandSubcommandBuilder> {

    constructor() {
        super(new SlashCommandSubcommandBuilder()
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
            ));
    }

    @Roles(Role.admin)
    public async execute(interaction: ChatInputCommandInteraction, user: User): Promise<void> {
        const role = interaction.options.getString("role", true);

        if (!validateRole(role)) throw new RoleNotFound(role);


        const userId = interaction.options.getUser("user")?.id!;
        user = await getUserIfNotExistThenCreate(userId);

        if (user.roles.includes(role))
            throw new RoleAlreadyExists(role);


        user.roles = [...user.roles, role];

        await user.save();
        await interaction.reply("Role added.");
    }
}