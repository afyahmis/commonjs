import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {TestCarModel} from "./TestCarModel";
import * as faker from "faker";
import {AggregateRoot} from "../../src/core/model/AggregateRoot";

@Entity()
export class TestCar extends AggregateRoot {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @OneToMany(type => TestCarModel, m => m.testCar, {cascade: true, eager: true})
    models: TestCarModel[];

    constructor(name: string) {
        super();
        this.id = this.newGuid();
        this.name = name;
    }

    addModel(model: TestCarModel) {
        model.testCar = this;
        if (!this.models) {
            this.models = [];
        }
        this.models.push(model);
    }

    static getTestCars(count: number = 2): Array<TestCar> {
        let i: number;
        const testCars: Array<TestCar> = [];
        for (i = 0; i < count; i++) {
            testCars.push(new TestCar(faker.commerce.productMaterial()));
        }
        return testCars;
    }

    static createTestCarsWithModes(count: number = 2, modelCount: number = 3): Array<TestCar> {
        let i: number;
        let m: number;
        const testCars: Array<TestCar> = [];
        for (i = 0; i < count; i++) {
            testCars.push(new TestCar(faker.commerce.productMaterial()));
            for (m = 0; m < modelCount; m++) {
                testCars[i].addModel(new TestCarModel(faker.commerce.productMaterial(), testCars[i]));
            }
        }
        return testCars;
    }

    toString(): string {
        return `${this.name} (${this.id})`;
    }
}
