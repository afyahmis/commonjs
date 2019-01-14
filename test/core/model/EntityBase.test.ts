import {TestCar} from "../../artifacts/TestCar";
import {TestCarModel} from "../../artifacts/TestCarModel";

describe("Entity Base tests", () => {
    let car: TestCar;
    beforeAll(() => {
        car = new TestCar("BMW");
        car.addModel(new TestCarModel("X5", car));
        car.addModel(new TestCarModel("X1", car));
    });

    it("should have id", () => {
        expect(car.models[0].id).not.toBeUndefined();
        expect(car.models[0].id).not.toBeUndefined();
        car.models.forEach(carModel=>console.log(`${carModel.testCar.name} ${carModel.name} (${carModel.id})`));
    });
});
