import {ChatInputCommandInteraction, SlashCommandSubcommandBuilder} from "discord.js"
import {validateRole} from "./validate.mjs"

import {BaseCommand} from "../base.mjs"
import {User} from "../../database/model/user.mjs"
import {getUserIfNotExistThenCreate} from "../../service/user.mjs"
import {UserDoesNotHaveThisRole} from "../../error/role.mjs"


export class RoleRemoveSubCommand implements BaseCommand<SlashCommandSubcommandBuilder> {
    public data: SlashCommandSubcommandBuilder;

    constructor() {
        this.data = new SlashCommandSubcommandBuilder()
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
            )

    }

    async execute(interaction: ChatInputCommandInteraction, user: User) {
        const [roleIdNumber, role] = await validateRole(interaction)

        const userId = interaction.options.getUser("user")?.id!
        user = await getUserIfNotExistThenCreate(userId);

        if (!user.roles.includes(roleIdNumber))
            throw new UserDoesNotHaveThisRole(role)

        user.roles = user.roles.filter((role) => role !== roleIdNumber)

        await user.save()
        await interaction.reply("Role removed.")
    }

}
