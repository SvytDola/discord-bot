import {ChatInputCommandInteraction} from "discord.js"

import {Role} from "../enum/role.mjs"
import {getUserIfNotExistThenCreate} from "../service/user.mjs";
import {AccessDenied} from "../error/permission.mjs";

export const Roles = (...roles: Role[]) => {
    return function (
        target: any,
        functionName: string,
        descriptor: PropertyDescriptor
    ) {
        const event = descriptor.value
        descriptor.value = async (interaction: ChatInputCommandInteraction) => {
            /*
                TODO:
                  Возможно будет необходимо изменить реализцаию,
                  для того чтобы уменьшить затраты ресурсов.
            */
            const user = await getUserIfNotExistThenCreate(interaction.user.id)
            if (!roles.some((role) => user.roles.includes(role))) {
                throw new AccessDenied()
            }
            return await event(interaction, user)
        }
    }
}