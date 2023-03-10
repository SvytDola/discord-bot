import { Op } from "sequelize";
import {sequelize} from "../database/db.mjs";
import {Transaction} from "../model/transaction.mjs";


const transactionsRepository = sequelize.getRepository(Transaction);

export async function createTransaction(from: string, to: string, coins: number) {
    return await transactionsRepository.create({
        from,
        to,
        coins
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
