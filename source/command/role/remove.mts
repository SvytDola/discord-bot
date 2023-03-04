import {ChatInputCommandInteraction} from "discord.js";
import {validateRole} from "./validate.mjs";

import {User} from "../../database/model/user.mjs";
import {getUserIfNotExistThenCreate} from "../../service/user.mjs";
import {UserDoesNotHaveThisRole} from "../../error/role.mjs";

export async function removeRole(interaction: ChatInputCommandInteraction, user: User) {
    const [roleIdNumber, role] = await validateRole(interaction)

    const userId = interaction.options.getUser("user")?.id!
    user = await getUserIfNotExistThenCreate(userId);

    if (!user.roles.includes(roleIdNumber))
        throw new UserDoesNotHaveThisRole(role)

    user.roles = user.roles.filter((role) => role !== roleIdNumber)

    await user.save()
    await interaction.reply("Role removed.")
}