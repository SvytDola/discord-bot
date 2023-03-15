import {Column, DataType, Model} from "sequelize-typescript";

export class Guild extends Model {
    @Column({
        type: DataType.STRING
    })
    declare id: string;

    @Column({
        type: DataType.STRING
    })
    declare welcome: string;
}