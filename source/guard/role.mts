import {ChatInputCommandInteraction} from "discord.js"

import {Role} from "../enum/role.mjs"
import {User} from "../database/model/user.mjs";
import {AccessDenied} from "../error/permission.mjs";
import {getUserIfNotExistThenCreate} from "../service/user.mjs";


type OnInteractionUser = (interaction: ChatInputCommandInteraction, user: User) => Promise<void>

export const Roles = (...roles: Role[]) => {
    return function (
        target: any,
        functionName: string,
        descriptor: TypedPropertyDescriptor<OnInteractionUser>
    ) {
        const method = descriptor.value!
        descriptor.value = async function (interaction, _) {
            const userFind = await getUserIfNotExistThenCreate(interaction.user.id)
            if (!roles.some((role) => userFind.roles.includes(role))) {
                throw new AccessDenied()
            }
            return await method.apply(this, [interaction, userFind])
        }
    }
}