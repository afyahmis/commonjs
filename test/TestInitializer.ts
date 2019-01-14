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
            logging: true,
            type: "sqlite",
            database: dbPath,
            entities: ["test/artifacts/*.ts"],
            synchronize: true
        }
    );
};

export let initDbConnectionMSSQL = async () => {
    await createConnection({
            logging: true,
            type: "mssql",
            host: "localhost",
            schema:"dbo",
            port: 1433,
            username: "sa",
            password: "M@un1983",
            database: "commonjsTest",
            entities: ["test/artifacts/*.ts"],
            synchronize: true
        }
    );
};
