import {Column, DataType, Model} from "sequelize-typescript";


interface Role {
    permissions: string[];
    id: string;
    channels: string[];
    categories: string[];
}

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
        type: DataType.JSON
    })
    declare roles: Role[];
}
