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
        const method = descriptor.value!
        descriptor.value = async function () {
            const user = await getUserIfNotExistThenCreate((arguments[0] as ChatInputCommandInteraction).user.id)
            if (!roles.some((role) => user.roles.includes(role))) {
                throw new AccessDenied()
            }
            return await method.apply(this, arguments)
        }
    }
}