import {Sequelize} from "sequelize";

import {getUser} from "./model/user.mjs";
import {
    DATABASE_NAME,
    DATABASE_USERNAME,
    DATABASE_DIALECT,
    DATABASE_PASSWORD,
    DATABASE_PORT
} from "../config/index.mjs";

export const sequelize = new Sequelize({
    database: DATABASE_NAME,
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    dialect: DATABASE_DIALECT,
    port: DATABASE_PORT
})

export const usersRepository = getUser(sequelize)
