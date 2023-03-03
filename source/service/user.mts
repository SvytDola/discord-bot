import {UserWithThisIdNotFound} from "../error/user.js";

import {Role} from "../enum/role.mjs";
import {User} from "../database/model/user.mjs";
import {usersRepository} from "../database/db.mjs";


export class UserService {
    public static async find(id: string): Promise<User> {
        const user = await usersRepository.findOne({where: {id}});
        if (!user) {
            throw new UserWithThisIdNotFound(id);
        }
        return user;
    }

    public static async create(id: string): Promise<User> {
        return await usersRepository.create({id});
    }

    public static async getUserIfNotExistThenCreate(id: string): Promise<User> {
        try {
            return await this.find(id);
        } catch (e) {
            return await this.create(id);
        }
    }

    public static async update(id: string, values: any) {
        return await usersRepository.update(
            {...values},
            {where: {id}}
        );
    }

    public static async setCoins(id: string, coins: number) {
        return await this.update(id, {balance: coins});
    }

}
