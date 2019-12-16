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
const express = require("express");
class WebServer {
    constructor() {
        this.socketInfo = {};
    }
    get port() {
        return this.http.address().port;
    }
    get url() {
        return 'http://localhost:' + this.port;
    }
    get http() {
        return this.server;
    }
    listen(port = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => {
                this.app = express();
                this.app.use(express.static('./../client/'));
                this.server = this.app.listen(port, () => {
                    console.log(`Webserver listening on ${this.server.address().port}`);
                    resolve(true);
                });
            });
        });
    }
    stop() {
        //this.app.stop();
    }
}
exports.WebServer = WebServer;

//# sourceMappingURL=web-server.js.map
