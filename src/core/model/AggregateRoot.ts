import { Entity } from "typeorm";
import { EntityBase } from "./EntityBase";

@Entity()
export abstract class AggregateRoot extends EntityBase {
}
