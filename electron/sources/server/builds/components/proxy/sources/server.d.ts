import { Event } from "../../event/event";
import { Http } from "../../protocol/protocol";
export declare class Server {
    onRequest: Event<Http.Request, Promise<Http.Response>>;
    private app;
    private server;
    get port(): number;
    get hostname(): string;
    get url(): string;
    listen(port?: number): Promise<boolean>;
    stop(): void;
}
