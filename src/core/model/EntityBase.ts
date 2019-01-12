import {Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import uuidv1 from "uuid/v1";

@Entity()
export abstract class EntityBase {
    @PrimaryColumn("uuid")
    id: string;

    protected constructor() {
        this.id = uuidv1();
    }
}
