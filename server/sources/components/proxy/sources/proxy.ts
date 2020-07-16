import { Event } from "../../event/event";
import { Http } from "../../protocol/protocol";
import { Uuid } from "../../uuid/uuid";
import { Timestamp } from "../../timestamp/timestamp";
import { Server } from "./server";
import { Client } from "./client";
import { Parser } from "./parser";
import { Cache } from "./cache";
import {
    ProxyRequestEvent,
    ProxyResponseEvent,
    ProxyExchangeEvent
} from "./interfaces";

export class Proxy {
    public uuid: Uuid;

    public onRequest: Event<ProxyRequestEvent> = new Event();
    public onResponse: Event<ProxyResponseEvent> = new Event();
    public onExchange: Event<ProxyExchangeEvent> = new Event();

    private started: boolean;
    private server: Server;
    private client: Client;
    private cache: Cache;
    private parser: Parser;

    constructor(uuid: Uuid, url?: string) {
        this.uuid = uuid;
        this.started = false;
        this.parser = new Parser();
        this.cache = new Cache();
        this.client = new Client();
        this.server = new Server();

        if (url) {
            this.url = url;
        }

        this.server.onRequest.subscribe(request => this.handleRequest(request));
    }

    public set url(url: string) {
        this.parser.target = url;
    }

    public get url(): string {
        return this.parser.target;
    }

    public get hostname(): string {
        return this.server.hostname;
    }

    public get port(): number {
        return this.server.port;
    }

    public async start(): Promise<void> {
        if (!this.started) {
            this.started = true;
            await this.server.listen();
            this.parser.source = this.server.url;
        }
    }

    public stop(): void {
        if (this.started) {
            this.started = false;
        }
    }

    public restart(): void {
        this.stop();
        this.start();
    }

    public reload(): void {
        if (this.started) {
            this.restart();
        }
    }

    public setResponseForRequest(
        request: Http.Request,
        response: Http.Response
    ) {
        this.cache.set(request, response);
    }

    public enableCache(request: Http.Request) {
        this.cache.enable(request);
    }

    public disableCache(request: Http.Request) {
        this.cache.disable(request);
    }

    private async handleRequest(request: Http.Request): Promise<Http.Response> {
        this.parser.parseRequest(request);
        let exchange: Http.Exchange = this.cache.get(request);
        let response: Http.Response = exchange?.response ?? undefined;
        let cached: boolean = this.cache.cached(request);

        if (!response || !cached) {
            this.onRequest.fire({ request });
            response = await this.client.send(request);
            this.parser.parseResponse(response);
            exchange = this.cache.set(request, response);
        }
        exchange.requestedAt.updateWithNow();

        this.onResponse.fire({ response });
        this.onExchange.fire({ cached, exchange });

        return response;
    }
}
