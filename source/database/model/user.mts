import {Sequelize, DataTypes, Model} from "sequelize"
import {Role} from "../../enum/role.mjs"

export class User extends Model {
    declare id: string
    declare xp: number
    declare balance: number
    declare marry: string[]
    declare roles: Role[]
}

export function getUsersRepository(sequelize: Sequelize): typeof User {
    return User.init({
        id: {
            type: DataTypes.STRING,
            primaryKey: true
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
        }
    }, {sequelize})
}
