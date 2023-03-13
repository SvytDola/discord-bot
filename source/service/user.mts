import {Service} from "./service.mjs";

import {User} from "../model/user.mjs";
import {UserWithThisIdNotFound} from "../error/user.js";


export class UsersService extends Service<User>{
    public async find(id: string): Promise<User> {
        const user = await this.repository.findOne({where: {id}});
        if (!user) {
            throw new UserWithThisIdNotFound(id);
        }
        return user;
    }

    public async create(id: string): Promise<User> {
        return await this.repository.create({
            id: id
        });
    }

    public async getUserIfNotExistThenCreate(id: string): Promise<User> {
        try {
            return await this.find(id);
        } catch (e) {
            return await this.create(id);
        }
    }

    public async getUsersTopBalance(size: number = 5, start: number = 0) {
        return await this.repository.findAll({
            limit: size,
            order: [["balance", "DESC"]],
            offset: start
        });
    }

}
