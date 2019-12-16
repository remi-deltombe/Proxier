/// <reference types="node" />
import * as http from 'http';
export declare class WebServer {
    private app;
    private server;
    socketInfo: any;
    get port(): number;
    get url(): string;
    get http(): http.Server;
    listen(port?: number): Promise<boolean>;
    stop(): void;
}
