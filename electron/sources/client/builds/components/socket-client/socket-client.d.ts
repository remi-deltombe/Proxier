/// <reference path="../../components/event/event.d.ts" />
declare module "socket-client/sources/interfaces" {
    export interface SocketClientEvent {
        id: string;
        payload: any;
    }
}
declare module "socket-client/sources/socket-client" {
    import { Event } from "event";
    import { SocketClientEvent } from "socket-client/sources/interfaces";
    export class SocketClient {
        private io;
        onMessage: Event<SocketClientEvent>;
        constructor();
        send(id: string, payload: any): void;
    }
}
declare module "socket-client" {
    export * from "socket-client/sources/socket-client";
}
