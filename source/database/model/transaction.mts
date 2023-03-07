import {Sequelize, DataTypes, Model} from "sequelize";

export class Transaction extends Model {
    declare id: string;
    declare from: string;
    declare to: string;
    declare coins: number;
}

export function getTransactionsRepository(sequelize: Sequelize) {
    return Transaction.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        from: {
            type: DataTypes.STRING
        },
        to: {
            type: DataTypes.STRING
        },
        coins: {
            type: DataTypes.DOUBLE
        }
    }, {sequelize});
}
