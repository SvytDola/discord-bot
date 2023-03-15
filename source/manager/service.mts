export class ServiceManager {
    private readonly services: Map<string, any>;

    constructor() {
        this.services = new Map();
    }

    public getService<T extends object>(model: { new(...args: any[]): T }): T {
        return this.services.get(model.name);
    }

    public setService<T extends object>(model: T) {
        this.services.set(model.constructor.name, model);
    }
}