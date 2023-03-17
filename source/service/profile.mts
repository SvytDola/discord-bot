import {Service} from "./service.mjs";
import {Profile} from "../model/profile.mjs";
import {ProfileNotFound} from "../error/profile.mjs";

export class ProfileService extends Service<Profile> {
    
    public async find(guildId: string, userId: string) {
        const profile = await this.repository.findOne({where: {guildId, userId}});
        if (profile === null) throw new ProfileNotFound();
        return profile;
    }

    public async create(guildId: string, userId: string) {
        return await this.repository.create({
            userId, 
            guildId
        });
    }

    public async getProfileIfNotExistThenCreate(guildId: string, userId: string) {
        try {
            return await this.find(guildId, userId);
        } catch (e) {
            return await this.create(guildId, userId);
        }
    }
}