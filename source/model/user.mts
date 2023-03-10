import {Column, DataType, Model, Table} from "sequelize-typescript";
import {Permission} from "../enum/permission.mjs";

@Table({tableName: "users"})
export class User extends Model {

    @Column({
        type: DataType.STRING,
        primaryKey: true
    })
    declare id: string;

    @Column({
        type: DataType.BIGINT,
        defaultValue: 0
    })
    declare xp: number;

    @Column({
        type: DataType.JSON,
        defaultValue: []
    })
    declare permissions: Permission[];

    @Column({
        type: DataType.DOUBLE,
        defaultValue: 0.0
    })
    declare balance: number;

    declare createdAt: Date;
    declare updatedAt: Date;

}
