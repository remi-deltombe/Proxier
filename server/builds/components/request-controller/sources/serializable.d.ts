import { SerializableInterface } from '../../serializable/serializable';
import { Uuid } from '../../uuid/uuid';
export declare class Serializable implements SerializableInterface {
    readonly uuid: Uuid;
    url: string;
    method: string;
    cached: boolean;
    serialize(): any;
    deserialize(data: any): void;
}
