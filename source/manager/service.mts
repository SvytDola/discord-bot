export class ServiceManager {
    private readonly services: any;

    constructor() {
        this.services = {};
    }

    public getService<T extends object>(model: { new(...args: any[]): T }): T {
        return this.services[model.name];
    }

    public setService<T extends object>(model: T) {
        this.services[model.constructor.name] = model;
    }
}