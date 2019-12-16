import { SerializableInterface } from '../../serializable/serializable';
import { SocketServer } from '../../socket-server/socket-server';
import { SerializableClass } from '../../serializable/serializable';
import { Endpoint } from './endpoint';
export declare class Api {
    private server;
    private itoe;
    constructor(server: SocketServer);
    registerEndpoint<C extends SerializableInterface>(id: string, serializableClass: SerializableClass<C>): Endpoint<C>;
    private handleMessage;
}
