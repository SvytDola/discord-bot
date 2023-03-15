import {Column, DataType, Model, Table} from "sequelize-typescript";


interface Role {
    permissions: string[];
    id: string;
    channels: string[];
    categories: string[];
}

@Table({tableName: "profiles"})
export class Profile extends Model {

    @Column({
        type: DataType.STRING
    })
    declare userId: string;

    @Column({
        type: DataType.STRING
    })
    declare guildId: string;

    @Column({
        type: DataType.JSON,
        defaultValue: []
    })
    declare roles: Role[];
}
