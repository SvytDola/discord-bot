import { Op } from "sequelize";
import {transactionsRepository} from "../database/db.mjs";

export async function createTransaction(from: string, to: string, coins: number) {
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

export async function getTransactionsFromUser(userId: string, limit: number = 5) {
    return await transactionsRepository.findAll({
        where: {
            [Op.or]: [{from: userId}, {to: userId}]
        },
        limit,
        order: [["createdAt", "DESC"]] 
    });
}
