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

    public start(clientPath: string) {
        this.socketserver = new SocketServer();
        this.webserver = new WebServer(clientPath);
        this.api = new Api(this.socketserver);

        this.webserver.listen(8080);
        this.socketserver.listen(this.webserver);

        this.controllers = [new ProxyController(this.api)];

        for (const controller of this.controllers) {
            controller.start();
        }
    }
}
