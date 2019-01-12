import { TestCar } from "./test-car";
import { InjectConnection } from "typeorm-typedi-extensions";
import { Connection } from "typeorm";
import { Service } from "typedi";
import {RepositoryBase} from "../../src/infrastructure/RepositoryBase";

@Service()
export class TestCarRepository extends RepositoryBase<TestCar> {
    constructor(@InjectConnection() connection: Connection) {
        super(TestCar, connection);
    }
}
