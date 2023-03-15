
import {Permission} from "../enum/permission.mjs"
import {AccessDenied} from "../error/permission.mjs";
import {BaseCommand} from "../command/index.mjs";
import {UsersService} from "../service/user.mjs";


export const Permissions = (...permissions: Permission[]) => {
    return function (
        target: any,
        functionName: string,
        descriptor: TypedPropertyDescriptor<BaseCommand<any>["execute"]>
    ) {
        const method = descriptor.value!
        descriptor.value = async function (interaction, serviceManager) {
            const usersService = serviceManager.getService(UsersService);
            const user = await usersService.getUserIfNotExistThenCreate(interaction.user.id);
            if (!permissions.some(permission => user.permissions.includes(permission)))
                throw new AccessDenied();

            return await method.apply(this, [interaction, serviceManager]);
        }
    }
}