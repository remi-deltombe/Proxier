/// <reference path="../../components/event/event.d.ts" />
/// <reference path="../../components/proxy/proxy.d.ts" />
/// <reference path="../../components/serializable/serializable.d.ts" />
/// <reference path="../../components/socket-client/socket-client.d.ts" />
declare module "sources/interfaces" {
    import { Serializable } from 'serializable';
    export type SerializableClass<C extends Serializable> = new () => C;
    export enum ApiAction {
        LIST = "LIST",
        CREATE = "CREATE",
        UPDATE = "UPDATE",
        DELETE = "DELETE"
    }
}
declare module "sources/endpoint" {
    import { Event } from 'event';
    import { Serializable } from 'serializable';
    import { SerializableClass } from "sources/interfaces";
    import { SocketClient } from 'socket-client';
    export class Endpoint<C extends Serializable> {
        onList: Event<C[], void>;
        onCreate: Event<C, void>;
        onUpdate: Event<C, void>;
        onDelete: Event<C, void>;
        private internalId;
        private internalSerializableClass;
        private client;
        private instances;
        constructor(client: SocketClient, id: string, serializableClass: SerializableClass<C>);
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
}
declare module "sources/api" {
    import { Serializable } from 'serializable';
    import { SerializableClass } from "sources/interfaces";
    import { Endpoint } from "sources/endpoint";
    export class Api {
        private client;
        private itoe;
        constructor();
        registerEndpoint<C extends Serializable>(id: string, serializableClass: SerializableClass<C>): Endpoint<C>;
        private handleMessage;
    }
}
declare module "api" {
    export * from "sources/api";
    export * from "sources/endpoint";
}
