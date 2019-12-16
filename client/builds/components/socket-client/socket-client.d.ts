/// <reference path="../../components/event/event.d.ts" />
declare module "sources/interfaces" {
    export interface SocketClientEvent {
        id: string;
        payload: any;
    }
}
declare module "sources/socket-client" {
    import { Event } from 'event';
    import { SocketClientEvent } from "sources/interfaces";
    export class SocketClient {
        private io;
        onMessage: Event<SocketClientEvent>;
        constructor();
        send(id: string, payload: any): void;
    }
}
declare module "socket-client" {
    export * from "sources/socket-client";
}
