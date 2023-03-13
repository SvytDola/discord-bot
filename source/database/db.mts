import {Sequelize, SequelizeOptions} from "sequelize-typescript";

import {User} from "../model/user.mjs";
import {Transaction} from "../model/transaction.mjs";

export async function getSequelize(options: SequelizeOptions) {
    const sequelize = new Sequelize(options);
    sequelize.addModels([User, Transaction]);
    await sequelize.sync();

    return sequelize;
}
