import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {TestCar} from "./TestCar";
import {EntityBase} from "../../src/core/model/EntityBase";

@Entity()
export class TestCarModel extends EntityBase {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @ManyToOne(type => TestCar, c => c.models)
    testCar: TestCar;

    constructor(name: string, testCar: TestCar) {
        super();
        this.id = this.newGuid();
        this.name = name;
        this.testCar = testCar;
    }

    toString(): string {
        return `${this.testCar}, ${this.name}`;
    }
}
