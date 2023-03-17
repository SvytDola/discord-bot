export class ServiceManager {
    
    /**
     * key -> value 
     */
    private readonly cache: Map<string, any>;

    constructor() {
        this.cache = new Map();
    }

    public getService<T extends object>(model: { new(...args: any[]): T }): T {
        const value = this.cache.get(model.name);

        if (value === undefined) {
            throw Error("Service not found.")
        }

        return value;
    }

    public setService<T extends object>(model: T) {
        this.cache.set(model.constructor.name, model);
    }
}
