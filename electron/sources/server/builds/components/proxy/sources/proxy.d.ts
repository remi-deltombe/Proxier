import { Event } from "../../event/event";
import { Http } from "../../protocol/protocol";
import { Uuid } from "../../uuid/uuid";
import { ProxyRequestEvent, ProxyResponseEvent, ProxyExchangeEvent } from "./interfaces";
export declare class Proxy {
    uuid: Uuid;
    onRequest: Event<ProxyRequestEvent>;
    onResponse: Event<ProxyResponseEvent>;
    onExchange: Event<ProxyExchangeEvent>;
    private started;
    private server;
    private client;
    private cache;
    private parser;
    constructor(uuid: Uuid, url?: string);
    set url(url: string);
    get url(): string;
    get hostname(): string;
    get port(): number;
    start(): Promise<void>;
    stop(): void;
    restart(): void;
    reload(): void;
    enableCache(request: Http.Request): void;
    disableCache(request: Http.Request): void;
    private handleRequest;
}
