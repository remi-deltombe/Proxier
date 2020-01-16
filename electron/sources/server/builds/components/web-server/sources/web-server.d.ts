/// <reference types="node" />
import * as http from "http";
export declare class WebServer {
    private app;
    private server;
    private clientPath;
    constructor(clientPath?: string);
    get port(): number;
    get url(): string;
    get http(): http.Server;
    listen(port?: number): Promise<boolean>;
    stop(): void;
}
