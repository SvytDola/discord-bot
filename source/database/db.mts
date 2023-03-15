import {ModelCtor, Sequelize, SequelizeOptions} from "sequelize-typescript";

export function getSequelize(options: SequelizeOptions, models: ModelCtor[]) {
    const sequelize = new Sequelize(options);
    sequelize.addModels(models);
    return sequelize;
}
