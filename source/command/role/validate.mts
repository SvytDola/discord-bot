import {ChatInputCommandInteraction} from "discord.js";

import {Role} from "../../enum/role.mjs";
import {RoleNotFound} from "../../error/role.mjs";

export async function validateRole(interaction: ChatInputCommandInteraction) {
    const role: any = interaction.options.getString("role")?.toUpperCase()
    const roleId = Role[role]

    if (roleId === undefined)
        throw new RoleNotFound(role)

    const roleIdNumber = +roleId;
    return [roleIdNumber, role]
}