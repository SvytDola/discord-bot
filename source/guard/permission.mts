import {ChatInputCommandInteraction} from "discord.js"

import {User} from "../model/user.mjs";

import {Permission} from "../enum/permission.mjs"
import {AccessDenied} from "../error/permission.mjs";


export const Permissions = (...permissions: Permission[]) => {
    return function (
        target: any,
        functionName: string,
        descriptor: TypedPropertyDescriptor<(interaction: ChatInputCommandInteraction, user: User) => Promise<void>>
    ) {
        const method = descriptor.value!
        descriptor.value = async function (interaction, user) {
            if (!permissions.some(permission => user.permissions.includes(permission)))
                throw new AccessDenied();

            return await method.apply(this, [interaction, user]);
        }
    }
}