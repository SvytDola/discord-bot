import {ChatInputCommandInteraction} from "discord.js";
import {validateRole} from "./validate.mjs";

import {User} from "../../database/model/user.mjs";
import {UserService} from "../../service/user.mjs";
import {RoleAlreadyExists} from "../../error/role.mjs";

export async function addRole(interaction: ChatInputCommandInteraction, user: User) {
    const [roleIdNumber, role] = await validateRole(interaction)

    const userId = interaction.options.getUser("user")?.id!
    user = await UserService.getUserIfNotExistThenCreate(userId);

    if (user.roles.includes(roleIdNumber))
        throw new RoleAlreadyExists(role)

    user.roles = [...user.roles, roleIdNumber]

    await user.save()
    await interaction.reply("Role added.")
}
