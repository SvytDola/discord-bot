import {BaseCommand} from "../command/index.mjs";
import {ProfileService} from "../service/profile.mjs";
import {AccessDenied} from "../error/permission.mjs";


export const Roles = (...roles: string[]) => {
    return function (
        target: any,
        functionName: string,
        descriptor: TypedPropertyDescriptor<BaseCommand<any>["execute"]>
    ) {
        const method = descriptor.value!
        descriptor.value = async function (interaction, serviceManager) {
            if (interaction.channel === null || interaction.guild === null) throw new AccessDenied();

            const profileService = serviceManager.getService(ProfileService);

            const profile = await profileService.getProfileIfNotExistThenCreate(
                interaction.guildId!,
                interaction.user.id
            );


            const channelId = interaction.channelId;
            const categoryId = interaction.channel;

            const role = profile.roles[0];

            return await method.apply(this, [interaction, serviceManager]);
        }
    }
}