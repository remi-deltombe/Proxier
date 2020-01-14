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

    public start() {
        this.socketserver = new SocketServer();
        this.webserver = new WebServer();
        this.api = new Api(this.socketserver);

        this.webserver.listen(8080);
        this.socketserver.listen(this.webserver);

        this.controllers = [new ProxyController(this.api)];

        for (const controller of this.controllers) {
            controller.start();
        }
    }
}

/*
import { Proxy } from '../../components/proxy/proxy';
import { WebServer } from '../../components/web-server/web-server';
import { SocketServer } from '../../components/socket-server/socket-server';
import { Api } from '../../components/api/api';

const socketserver = new SocketServer();
const webserver = new WebServer();
const api = new Api(socketserver);

webserver.listen(8080);
socketserver.listen(webserver);

api.endpoint(Proxy).onCreate.subscribe(proxy=>{
	console.log('Proxy created');
	proxy.start();
	return proxy;
})

*/
