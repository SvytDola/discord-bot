import {Op} from "sequelize";

import {Service} from "./service.mjs";
import {Transaction} from "../model/transaction.mjs";


export class TransactionsService extends Service<Transaction>{
    public async create(from: string, to: string, coins: number) {
        return await this.repository.create({
            from,
            to,
            coins
        });
    }

    async getFromUser(userId: string, limit: number = 5) {
        return await this.repository.findAll({
            where: {
                [Op.or]: [{from: userId}, {to: userId}]
            },
            limit,
            order: [["createdAt", "DESC"]]
        });
    }
}

