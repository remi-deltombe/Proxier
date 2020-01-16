"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const web_server_1 = require("../../web-server/web-server");
const socket_server_1 = require("../../socket-server/socket-server");
const api_1 = require("../../api/api");
const proxy_controller_1 = require("../../proxy-controller/proxy-controller");
class Application {
    start(clientPath) {
        this.socketserver = new socket_server_1.SocketServer();
        this.webserver = new web_server_1.WebServer(clientPath);
        this.api = new api_1.Api(this.socketserver);
        this.webserver.listen(8080);
        this.socketserver.listen(this.webserver);
        this.controllers = [new proxy_controller_1.Controller(this.api)];
        for (const controller of this.controllers) {
            controller.start();
        }
    }
}
exports.Application = Application;

//# sourceMappingURL=application.js.map
