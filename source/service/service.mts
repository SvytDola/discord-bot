import {Repository} from "sequelize-typescript";

export abstract class Service<T> {

    protected repository: Repository<T>;

    public constructor(repository: Repository<T>) {
        this.repository = repository;
    }
}