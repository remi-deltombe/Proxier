"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const io = require("socket.io");
const event_1 = require("../../event/event");
class SocketServer {
    constructor() {
        this.onMessage = new event_1.Event();
    }
    get port() {
        return this.io ? this.io.httpServer.address().port : undefined;
    }
    listen(webServer) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => {
                this.io = io();
                this.io.attach(webServer.http);
                this.io.on("connection", socket => {
                    socket.use(data => {
                        this.onMessage.fire({
                            id: data[0],
                            payload: data[1]
                        });
                    });
                });
            });
        });
    }
    send(id, payload) {
        if (this.io) {
            this.io.emit(id, payload);
        }
    }
    stop() {
        //this.app.stop();
    }
}
exports.SocketServer = SocketServer;

//# sourceMappingURL=socket-server.js.map
