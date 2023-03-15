import {ModelCtor, Sequelize, SequelizeOptions} from "sequelize-typescript";

export async function getSequelize(options: SequelizeOptions, models: ModelCtor[]) {
    const sequelize = new Sequelize(options);
    sequelize.addModels(models);
    await sequelize.sync();
    return sequelize;
}
