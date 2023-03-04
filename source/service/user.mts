import {UserWithThisIdNotFound} from "../error/user.js";

import {User} from "../database/model/user.mjs";
import {usersRepository} from "../database/db.mjs";


export async function find(id: string): Promise<User> {
    const user = await usersRepository.findOne({where: {id}});
    if (!user) {
        throw new UserWithThisIdNotFound(id);
    }
    return user;
}

export async function create(id: string): Promise<User> {
    return await usersRepository.create({id});
}

export async function getUserIfNotExistThenCreate(id: string): Promise<User> {
    try {
        return await find(id);
    } catch (e) {
        return await create(id);
    }
}
