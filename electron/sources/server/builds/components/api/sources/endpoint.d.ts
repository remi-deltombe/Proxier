import { AsyncEvent } from "../../event/event";
import { SerializableInterface, SerializableClass } from "../../serializable/serializable";
import { SocketServer } from "../../socket-server/socket-server";
export declare class Endpoint<C extends SerializableInterface> {
    onCreate: AsyncEvent<C, C>;
    onUpdate: AsyncEvent<C, C>;
    onDelete: AsyncEvent<C, boolean>;
    onList: AsyncEvent<C[], SerializableInterface[]>;
    private internalId;
    private internalSerializableClass;
    private server;
    private instances;
    constructor(server: SocketServer, id: string, serializableClass: SerializableClass<C>);
    get id(): string;
    get serializableClass(): SerializableClass<C>;
    getInstances(): C[];
    create(serializable: C): void;
    update(serializable: C): void;
    delete(serializable: C): void;
    get(serializable: SerializableInterface): void;
    list(serializables: SerializableInterface[]): void;
    dispatch(payload: any): void;
    private handleGet;
    private handleList;
    private handleCreate;
    private handleUpdate;
    private handleDelete;
}
