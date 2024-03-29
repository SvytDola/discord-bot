import {Op} from "sequelize";
import {Repository} from "sequelize-typescript";

import {Service} from "./service.mjs";

import {cfg} from "../config/index.mjs";
import {User} from "../model/user.mjs";
import {Transaction} from "../model/transaction.mjs";
import {InadequateBalance} from "../error/balance.mjs";

export class TransactionsService extends Service<Transaction> {

    constructor(repository: Repository<Transaction>, private clientUser: User) {
        super(repository);
    }

    public async create(from: string, to: string, coins: number, commission: number) {
        return await this.repository.create({
            from,
            to,
            coins,
            commission
        });
    }

    public async getListFromUserId(userId: string, limit: number = 5) {
        return await this.repository.findAll({
            where: {
                [Op.or]: [{from: userId}, {to: userId}]
            },
            limit,
            order: [["createdAt", "DESC"]]
        });
    }

    /**
     * It is better to use this function to send tokens, 
     * it takes into account the commit by sending it to the client (bot), 
     * and causes an error if the balance is zero.
     */
    public async sendTokens(userFrom: User, userTo: User, tokens: number) {
        const commission = tokens * (cfg.commissionPercent / 100);
        const temp = userFrom.balance - tokens - commission;

        if (temp < 0)
            throw new InadequateBalance();

        this.clientUser.balance += commission;

        userFrom.balance = temp;
        userTo.balance += tokens;

        await this.clientUser.save();
        await userFrom.save();
        await userTo.save();

        return await this.create(userFrom.id, userTo.id, tokens, commission);
    }
}

