import {UserWithThisIdNotFound} from "../error/user.js";

import {sequelize} from "../database/db.mjs";
import {User} from "../model/user.mjs";

const usersRepository = sequelize.getRepository(User);
export async function find(id: string): Promise<User> {
    const user = await usersRepository.findOne({where: {id}});
    if (!user) {
        throw new UserWithThisIdNotFound(id);
    }
    return user;
}


export async function create(id: string): Promise<User> {
    return await usersRepository.create({
        id: id
    });
}

export async function getUserIfNotExistThenCreate(id: string): Promise<User> {
    try {
        return await find(id);
    } catch (e) {
        return await create(id);
    }
}

export async function getUsers(size: number = 5, start: number = 0) {
    return await usersRepository.findAll({
        limit: size,
        order: [["balance", "DESC"]],
        offset: start
    });
}
