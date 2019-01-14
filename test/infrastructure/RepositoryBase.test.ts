import {TestCarRepository} from "../artifacts/TestCarRepository";
import {TestCar} from "../artifacts/TestCar";
import {Container} from "typedi";
import {clearDb, initDbConnection, initDbConnectionMSSQL} from "../TestInitializer";

describe("RepositoryBase tests", () => {
    const useMssql = false;
    const dummyCars = TestCar.getTestCars(5);
    let repository: TestCarRepository;

    beforeAll(async () => {
        await clearDb();
        if (useMssql){
           await initDbConnectionMSSQL();
        } else {
            await initDbConnection();
        }

        repository = Container.get(TestCarRepository);
        await repository.createOrUpdateBatch(dummyCars);
    });

    it("should create entity", async () => {
        const testCar = await repository.createOrUpdate(new TestCar("Mazda"));
        expect(testCar).not.toBeUndefined();
        console.log(`${testCar}`);
    });

    it("should update entity", async () => {
        const testCar = await repository.get(dummyCars[0].id);
        expect(testCar).not.toBeUndefined();

        console.log(`${testCar}`);
        console.log(`${testCar.createdDate}`);
        console.log(`${testCar.updatedDate}`);
        console.log(`${testCar.version}`);
        testCar.name = "new name";

        await new Promise(resolve => setTimeout(resolve, 1000));

        await repository.createOrUpdate(testCar);

        const savedTestCar = await repository.get(dummyCars[0].id);
        expect(savedTestCar).not.toBeUndefined();
        expect(savedTestCar.name).toEqual("new name");
        console.log("-----------------")
        console.log(`${savedTestCar.createdDate}`);
        console.log(`${savedTestCar.updatedDate}`);
        console.log(`${savedTestCar.version}`);
    });

    it("should create entity with children", async () => {
        const newCar = TestCar.createTestCarsWithModes(1, 2)[0];
        await repository.createOrUpdate(newCar);
        const testCar = await repository.get(newCar.id);
        expect(testCar).not.toBeUndefined();
        expect(testCar.models.length > 0);
        console.log(`${testCar}`);
        testCar.models.forEach((p) => console.log(`${p}`));
    });

    it("should create batch entities", async () => {
        const testCars = await repository.createOrUpdateBatch(TestCar.getTestCars(2));
        expect(testCars.length === 2);
        testCars.forEach((p) => console.log(`${p}`));
    });

    test("should read  entities", async () => {
        const testCars = await repository.getAll();
        expect(testCars.length > 0);
        testCars.forEach((p) => console.log(`${p}`));
    });

    it("should find  entity by id", async () => {
        const testCar = await repository.get(dummyCars[0].id);
        expect(testCar).not.toBeUndefined();
        console.log(`${testCar}`);
    });

    it("should delete  entity by id", async () => {
        const carId = dummyCars[4].id;
        await repository.remove(carId);
        const testCar = await repository.get(carId);
        expect(testCar).toBeUndefined();
    });

    afterAll(async () => {
        await clearDb();
    });
});
