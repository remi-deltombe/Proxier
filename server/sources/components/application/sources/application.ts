import { Proxy } from "../../proxy/proxy";
import { WebServer } from "../../web-server/web-server";
import { SocketServer } from "../../socket-server/socket-server";
import { Api } from "../../api/api";
import { Controller } from "../../controller/controller";

import { Controller as ProxyController } from "../../proxy-controller/proxy-controller";

export class Application {
    private socketserver: SocketServer;
    private webserver: WebServer;
    private api: Api;
    private controllers: Controller[];

    public start({
        clientPath,
        port = 0,
    }: {
        clientPath: string;
        port: number;
    }) {
        this.socketserver = new SocketServer();
        this.webserver = new WebServer(clientPath);
        this.api = new Api(this.socketserver);

        this.webserver.listen(port);
        this.socketserver.listen(this.webserver);

        this.controllers = [new ProxyController(this.api)];

        for (const controller of this.controllers) {
            controller.start();
        }
    }

    public get port(): number {
        return this.webserver.port;
    }
}
