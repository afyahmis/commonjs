import "reflect-metadata";
import {InjectConnection, InjectManager} from "typeorm-typedi-extensions";
import {Connection, EntityManager, getManager} from "typeorm";
import {AggregateRoot} from "../core/model/AggregateRoot";
import {IRepositoryBase} from "../core/interfaces/IRepositoryBase";
import {Service} from "typedi";
import {ObjectType} from "../core/model/ObjectType";

@Service()
export abstract class RepositoryBase<T extends AggregateRoot> implements IRepositoryBase<T> {

    entityManager: EntityManager;
    type: ObjectType<T>;

    constructor(type: ObjectType<T>, @InjectConnection() connection: Connection) {
        this.type = type;
        this.entityManager = connection.manager;
    }

    createOrUpdate(entity: T): Promise<T> {
        return this.entityManager.save(entity);
    }

    createOrUpdateBatch(entities: T[]): Promise<T[]> {
        return this.entityManager.save(entities);
    }

    getAll(): Promise<Array<T>> {
        return this.entityManager.find(this.type);
    }

    get(id: string): Promise<T> {
        return this.entityManager.findOne(this.type, id);
    }

    async remove(id: string): Promise<T> {
        const entity = await this.get(id);
        return this.entityManager.remove(entity);
    }


}