import {Service} from "./service.mjs";

import {User} from "../model/user.mjs";
import {UserNotFound} from "../error/user.js";
import { Attributes, FindOptions } from "sequelize";


export class UsersService extends Service<User>{

    public async get(id: string): Promise<User> {
        return await this.find({where: {id}});
    }

    public async find(options: FindOptions<Attributes<User>>): Promise<User> {
        const user = await this.repository.findOne(options);
        if (user === null) {
            throw new UserNotFound();
        }
        return user;
    }

    /**
     * The function is made to save resources.
     * Returns only user rights. 
     */
    public async getPermissionsFromUserId(id: string) {
        const user = await this.find({
            where: {id}, 
            attributes: {
                exclude: ["id", "xp", "faucetTimestamp", "createdAt", "updatedAt", "balance"]
            }
        });

        return user.permissions;
    }

    public async create(id: string): Promise<User> {
        return await this.repository.create({
            id: id
        });
    }

    public async getOrCreate(id: string): Promise<User> {
        try {
            return await this.get(id);
        } catch (e) {
            return await this.create(id);
        }
    }

    public async getListTopOfBalance(size: number = 5, start: number = 0) {
        return await this.repository.findAll({
            limit: size,
            order: [["balance", "DESC"]],
            offset: start
        });
    }

}
