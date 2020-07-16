import { SerializableInterface } from "../../serializable/serializable";
import { SocketServer } from "../../socket-server/socket-server";
import { SerializableClass } from "../../serializable/serializable";
import { Endpoint } from "./endpoint";

import { Proxy as SerializableProxy } from "../../proxy/proxy";

export class Api {
    private server: SocketServer;

    private itoe: Map<string, Endpoint<SerializableInterface>> = new Map();

    constructor(server: SocketServer) {
        this.server = server;
        this.server.onMessage.subscribe((event) =>
            this.handleMessage(event.id, event.payload)
        );
    }

    public registerEndpoint<C extends SerializableInterface>(
        id: string,
        serializableClass: SerializableClass<C>
    ): Endpoint<C> {
        const endpoint = new Endpoint(this.server, id, serializableClass);
        this.itoe.set(id, endpoint);
        return endpoint;
    }

    private handleMessage(id: string, payload: any) {
        if (this.itoe.has(id)) {
            this.itoe.get(id).dispatch(payload);
        } else {
            console.log(`[error] Unknow endpoint {${id}}`);
        }
    }
}
