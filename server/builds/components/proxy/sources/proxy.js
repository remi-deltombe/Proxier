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
const server_1 = require("./server");
const client_1 = require("./client");
const parser_1 = require("./parser");
const cache_1 = require("./cache");
class Proxy {
    constructor(uuid, url) {
        this.onRequest = new event_1.Event();
        this.onResponse = new event_1.Event();
        this.uuid = uuid;
        this.started = false;
        this.parser = new parser_1.Parser();
        this.cache = new cache_1.Cache();
        this.client = new client_1.Client();
        this.server = new server_1.Server();
        if (url) {
            this.url = url;
        }
        this.server.onRequest.subscribe(request => this.handleRequest(request));
    }
    set url(url) {
        this.parser.target = url;
    }
    get url() {
        return this.parser.target;
    }
    get hostname() {
        return this.server.hostname;
    }
    get port() {
        return this.server.port;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.started) {
                this.started = true;
                yield this.server.listen();
                this.parser.source = this.server.url;
                console.log(`proxy listening on port ${this.server.port}`);
            }
        });
    }
    stop() {
        if (this.started) {
            this.started = false;
        }
    }
    restart() {
        this.stop();
        this.start();
    }
    reload() {
        if (this.started) {
            this.restart();
        }
    }
    enableCache(request) {
        this.cache.enable(request);
    }
    disableCache(request) {
        this.cache.disable(request);
    }
    handleRequest(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = this.cache.get(request);
            let cached = this.cache.cached(request);
            if (!response || !cached) {
                this.parser.parseRequest(request);
                this.onRequest.fire({ request });
                response = yield this.client.send(request);
                this.parser.parseResponse(response);
                this.onResponse.fire({ cached, request, response });
                this.cache.set(request, response);
            }
            return response;
        });
    }
}
exports.Proxy = Proxy;

//# sourceMappingURL=proxy.js.map
