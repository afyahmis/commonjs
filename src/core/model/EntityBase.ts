import {Entity, CreateDateColumn, UpdateDateColumn, VersionColumn} from "typeorm";
import uuidv1 from "uuid/v1";

@Entity()
export abstract class EntityBase {

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn({nullable: true, default: () => "null"})
    updatedDate: Date;

    @VersionColumn()
    version: number;

    protected newGuid(): string {
        return uuidv1();
    }
}
