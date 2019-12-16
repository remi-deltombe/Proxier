import { SerializableInterface } from './serializable';
export declare type SerializableClass<C extends SerializableInterface> = new () => C;
