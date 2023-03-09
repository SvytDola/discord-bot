import {
    Sequelize,
    DataTypes,
    Model,
    CreationOptional,
    NonAttribute
} from "sequelize"

import {Transaction} from "./transaction.mjs";

import {Role} from "../../enum/role.mjs"

export class User extends Model {
    declare id: string;
    declare xp: number;
    declare balance: number;
    declare roles: Role[];
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    declare transactions: NonAttribute<Transaction>;
}

export function getUsersRepository(sequelize: Sequelize): typeof User {
    return User.init({
        id: {
            primaryKey: true,
            type: DataTypes.STRING
        },
        xp: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        balance: {
            type: DataTypes.DOUBLE,
            defaultValue: 0
        },
        roles: {
            type: DataTypes.JSON,
            defaultValue: []
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {sequelize, tableName: "users"});
}
