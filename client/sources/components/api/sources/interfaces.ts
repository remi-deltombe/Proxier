import { Serializable } from "serializable";

export type SerializableClass<C extends Serializable> = new () => C;

export enum ApiAction {
    GET = "GET",
    LIST = "LIST",
    CREATE = "CREATE",
    UPDATE = "UPDATE",
    DELETE = "DELETE"
}
