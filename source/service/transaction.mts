import { Op } from "sequelize";
import {transactionsRepository} from "../database/db.mjs";

export async function create(from: string, to: string, coins: number) {
    return await transactionsRepository.create({
        from,
        to,
        coins
    });
}

export async function findOne(id: string) {
    return await transactionsRepository.findOne({
        where: {id}
    });
}

export async function getTransactionFromUser(userId: string) {
    return await transactionsRepository.findOne({
        where: {
            [Op.or]: [{from: userId}, {to: userId}]
        }
    });
}
