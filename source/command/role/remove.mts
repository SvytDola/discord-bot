import {ChatInputCommandInteraction, SlashCommandSubcommandBuilder} from "discord.js"

import {validateRole} from "./validate.mjs"

import {BaseCommand} from "../base.mjs"

import {Roles} from "../../guard/role.mjs";
import {Role} from "../../enum/role.mjs";
import {User} from "../../database/model/user.mjs"
import {getUserIfNotExistThenCreate} from "../../service/user.mjs"
import {RoleNotFound, UserDoesNotHaveThisRole} from "../../error/role.mjs"


export class RoleRemoveSubCommand extends BaseCommand<SlashCommandSubcommandBuilder> {
    constructor() {
        super(new SlashCommandSubcommandBuilder()
            .setName("remove")
            .setDescription("Remove a role from a user.")
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
    async execute(interaction: ChatInputCommandInteraction, user: User) {
        const role = interaction.options.getString("role", true);

        if (!validateRole(role)) throw new RoleNotFound(role);

        const userId = interaction.options.getUser("user", true).id;
        user = await getUserIfNotExistThenCreate(userId);

        if (!user.roles.includes(role))
            throw new UserDoesNotHaveThisRole(role);

        user.roles = user.roles.filter((role) => role !== role);

        await user.save();
        await interaction.reply("Role removed.");
    }
}
