import {Column, DataType, Model, Table} from "sequelize-typescript";

@Table({tableName: "guilds"})
export class Guild extends Model {
    @Column(DataType.STRING)
    declare id: string;

    @Column( DataType.STRING)
    declare welcome: string;
}