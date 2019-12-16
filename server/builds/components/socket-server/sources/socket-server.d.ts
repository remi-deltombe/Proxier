import { Event } from '../../event/event';
import { WebServer } from '../../web-server/web-server';
import { SocketClientEvent } from './interfaces';
export declare class SocketServer {
    onMessage: Event<SocketClientEvent, void>;
    private io;
    get port(): number;
    listen(webServer: WebServer): Promise<boolean>;
    send(id: string, payload: any): void;
    stop(): void;
}
