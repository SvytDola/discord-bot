import {BaseCommand} from "../command/index.mjs";
import {UsersService} from "../service/user.mjs";


export const Roles = (...roles: string[]) => {
    return function (
        target: any,
        functionName: string,
        descriptor: TypedPropertyDescriptor<BaseCommand<any>["execute"]>
    ) {
        const method = descriptor.value!
        descriptor.value = async function (interaction, serviceManager) {
            const usersService = serviceManager.getService(UsersService);
            const user = await usersService.getUserIfNotExistThenCreate(interaction.user.id);

            return await method.apply(this, [interaction, serviceManager]);
        }
    }
}