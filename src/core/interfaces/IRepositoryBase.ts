import { AggregateRoot } from "../model/AggregateRoot";

export interface IRepositoryBase<T extends AggregateRoot> {
    createOrUpdate(entity: T): Promise<T>;
    createOrUpdateBatch(entity: T[]): Promise<T[]>;
    getAll(): Promise<T[]>;
    get(id: string): Promise<T>;
    remove(id: string): Promise<T>;
}