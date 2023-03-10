import {Model, Column, DataType, Table} from "sequelize-typescript";

@Table({tableName: "transactions"})
export class Transaction extends Model {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true
    })
    declare id: string;

    @Column(DataType.STRING)
    declare from: string;

    @Column(DataType.STRING)
    declare to: string;

    @Column(DataType.DOUBLE)
    declare coins: number;
    declare createdAt: Date;
    declare updatedAt: Date;
}
