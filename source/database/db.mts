import {Sequelize} from "sequelize-typescript";

import {
    DATABASE_NAME,
    DATABASE_USERNAME,
    DATABASE_DIALECT,
    DATABASE_PASSWORD,
    DATABASE_PORT
} from "../config/index.mjs";

import {User} from "../model/user.mjs";
import {Transaction} from "../model/transaction.mjs";


const sequelize = new Sequelize({
    database: DATABASE_NAME,
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    dialect: DATABASE_DIALECT,
    port: DATABASE_PORT
});

sequelize.addModels([User, Transaction]);

export {sequelize};

