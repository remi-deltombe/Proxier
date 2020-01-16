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
const event_1 = require("../../event/event");
const protocol_1 = require("../../protocol/protocol");
const express = require("express");
class Server {
    constructor() {
        this.onRequest = new event_1.Event();
    }
    get port() {
        return this.server.address().port;
    }
    get hostname() {
        return "localhost";
    }
    get url() {
        return "http://" + this.hostname + ":" + this.port + "/";
    }
    listen(port = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => {
                this.app = express();
                this.app.use(function (req, res, next) {
                    const buffer = [];
                    req.on("data", chunk => {
                        buffer.push(chunk);
                    });
                    req.on("end", () => {
                        req.body = Buffer.concat(buffer);
                        next();
                    });
                });
                this.app.all("*", (req, res) => __awaiter(this, void 0, void 0, function* () {
                    var _a, _b, _c;
                    const request = new protocol_1.Http.Request();
                    request.hostname = (_c = (_b = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.host) === null || _b === void 0 ? void 0 : _b.split(":")[0], (_c !== null && _c !== void 0 ? _c : request.hostname));
                    request.method = req.method;
                    request.path = req.url;
                    request.rawBody = req.body;
                    for (const i in req.headers) {
                        if (Array.isArray(req.headers[i])) {
                            request.header.set(i, req.headers[i].join(","));
                        }
                        else {
                            request.header.set(i, req.headers[i]);
                        }
                    }
                    const promises = this.onRequest.fire(request);
                    const responses = yield Promise.all(promises);
                    res.removeHeader("Transfer-Encoding");
                    res.removeHeader("X-Powered-By");
                    res.removeHeader("ETag");
                    if (responses.length) {
                        const response = responses[0];
                        res.status(response.code);
                        for (let h of response.header) {
                            res.set(h[0], h[1]);
                        }
                        res.send(response.isBinary() ? response.rawBody : response.body);
                    }
                    else {
                        res.status(404);
                        res.send("404");
                    }
                }));
                this.server = this.app.listen(port, () => resolve(true));
            });
        });
    }
    stop() {
        //this.app.stop();
    }
}
exports.Server = Server;

//# sourceMappingURL=server.js.map
