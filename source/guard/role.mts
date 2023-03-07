import {ChatInputCommandInteraction} from "discord.js"

import {Role} from "../enum/role.mjs"
import {User} from "../database/model/user.mjs";
import {AccessDenied} from "../error/permission.mjs";
import {getUserIfNotExistThenCreate} from "../service/user.mjs";


type OnInteractionUser = (interaction: ChatInputCommandInteraction, user: User) => Promise<void>;

export const Roles = (...roles: Role[]) => {
    return function (
        target: any,
        functionName: string,
        descriptor: TypedPropertyDescriptor<OnInteractionUser>
    ) {
        const method = descriptor.value!
        /**
         *
         * @param interaction
         * @param _ Первоначально этот параметр undefined, предназначен лишь
         * для того чтобы уменьшить колчичество запросов к базе данных
         */
        descriptor.value = async function (interaction, _) {
            const user = await getUserIfNotExistThenCreate(interaction.user.id);
            if (!roles.some((role) => user.roles.includes(role))) {
                throw new AccessDenied()
            }
            return await method.apply(this, [interaction, user]);
        }
    }
}