import * as fs from "fs";
import {createConnection, useContainer} from "typeorm";
import {Container} from "typedi";
import * as faker from "faker";

const dbPath: string = "test/commontest.sqlite";

useContainer(Container);

export let clearDb= ()=> {
    fs.unlink(dbPath, (err) => {
            if (err) {
                console.error(err);
            }
        }
    );
}

export let initDbConnection = async () => {
    await createConnection({
            logging: false,
            type: "sqlite",
            database: dbPath,
            entities: ["test/artifacts/*.ts"],
            synchronize: true
        }
    );
};
