import { SerializableInterface } from "./serializable";

export type SerializableClass<C extends SerializableInterface> = new () => C;
