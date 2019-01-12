import { TestCar } from "../../artifacts/TestCar";
import { TestCarModel } from "../../artifacts/TestCarModel";

describe("Entity Base tests", () => {

    let carModel: TestCarModel;

    beforeAll(() => {
        const car = new TestCar("BMW");
        car.addModel(new TestCarModel("X5", car));
        carModel = car.models[0];
    });

    it("should have id", () => {
        expect(carModel.id).not.toBeUndefined();
        console.log(`${carModel}`);
    });
});
