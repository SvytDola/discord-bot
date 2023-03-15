import {Service} from "./service.mjs";
import {Guild} from "../model/guild.mjs";

export class GuildService extends Service<Guild>{
    async findOne(id: string) {
        return  await this.repository.findOne({where: {id}});
    }

}