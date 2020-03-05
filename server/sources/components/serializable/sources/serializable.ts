import { Uuid } from "../../uuid/uuid";

export interface SerializableInterface {
    readonly uuid: Uuid;
    serialize(children?: boolean): any;
    deserialize(data: any): void;
}
