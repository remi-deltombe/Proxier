import { AsyncEvent } from '../../event/event';
import { SerializableInterface, SerializableClass } from '../../serializable/serializable';
import { SocketServer } from '../../socket-server/socket-server';
export declare class Endpoint<C extends SerializableInterface> {
    onCreate: AsyncEvent<C, C>;
    onUpdate: AsyncEvent<C, C>;
    onDelete: AsyncEvent<C, boolean>;
    private internalId;
    private internalSerializableClass;
    private server;
    private instances;
    constructor(server: SocketServer, id: string, serializableClass: SerializableClass<C>);
    get id(): string;
    get serializableClass(): SerializableClass<C>;
    create(serializable: C): void;
    update(serializable: C): void;
    delete(serializable: C): void;
    list(): void;
    dispatch(payload: any): void;
    private handleList;
    private handleCreate;
    private handleUpdate;
    private handleDelete;
}
