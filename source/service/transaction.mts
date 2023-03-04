import {transactionsRepository} from "../database/db.mjs";

export async function create(from: string, to: string, coins: number) {
    return await transactionsRepository.create({
        from,
        to,
        coins
    })
}
