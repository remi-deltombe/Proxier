"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protocol_1 = require("../../protocol/protocol");
class Parser {
    constructor() {
        this.internalTargetUrl = "";
        this.internalSourceUrl = "";
        this.internalTargetRequest = new protocol_1.Http.Request();
        this.internalSourceRequest = new protocol_1.Http.Request();
        this.responseAliases = new Map();
        this.requestAliases = new Map();
    }
    set source(url) {
        this.internalSourceUrl = url;
        this.internalSourceRequest = protocol_1.Http.Request.fromUrl(url);
        this.buildAliases();
    }
    get source() {
        return this.internalSourceUrl;
    }
    set target(url) {
        this.internalTargetUrl = url;
        this.internalTargetRequest = protocol_1.Http.Request.fromUrl(url);
        this.buildAliases();
    }
    get target() {
        return this.internalTargetUrl;
    }
    parseRequest(request) {
        request.protocol = this.internalTargetRequest.protocol;
        request.port = this.internalTargetRequest.port;
        request.hostname = request.hostname.replace(this.internalSourceRequest.hostname, this.internalTargetRequest.hostname);
        for (let alias of this.requestAliases) {
            for (const [key, value] of request.header) {
                request.header.set(key, value.replace(alias[0], alias[1]));
            }
        }
    }
    parseResponse(response) {
        if (!response.isBinary()) {
            for (let alias of this.responseAliases) {
                for (const [key, value] of response.header) {
                    response.header.set(key, value.replace(alias[0], alias[1]));
                }
                response.body = response.body.replace(alias[0], alias[1]);
            }
        }
    }
    buildAliases() {
        this.responseAliases = new Map();
        this.requestAliases = new Map();
        // http://(*).hostname:port/ <-> http://$0.localhost:port/
        this.responseAliases.set(new RegExp(`${this.internalTargetRequest.protocol}://([a-zA-Z0-9\\-]*)\\.${this.internalTargetRequest.hostname}:${this.internalTargetRequest.port}`, "g"), `${this.internalSourceRequest.protocol}://$1.${this.internalSourceRequest.hostname}:${this.internalSourceRequest.port}`);
        this.requestAliases.set(new RegExp(`${this.internalSourceRequest.protocol}://([a-zA-Z0-9\\-]*)\\.${this.internalSourceRequest.hostname}:${this.internalSourceRequest.port}`, "g"), `${this.internalTargetRequest.protocol}://$1.${this.internalTargetRequest.hostname}:${this.internalTargetRequest.port}`);
        // http://hostname:port/ <-> http://localhost:port/
        this.responseAliases.set(new RegExp(`${this.internalTargetRequest.protocol}://${this.internalTargetRequest.hostname}:${this.internalTargetRequest.port}`, "g"), `${this.internalSourceRequest.protocol}://${this.internalSourceRequest.hostname}:${this.internalSourceRequest.port}`);
        this.requestAliases.set(new RegExp(`${this.internalSourceRequest.protocol}://${this.internalSourceRequest.hostname}:${this.internalSourceRequest.port}`, "g"), `${this.internalTargetRequest.protocol}://${this.internalTargetRequest.hostname}:${this.internalTargetRequest.port}`);
        // http://(*).hostname/ -> http://$0.localhost:port/
        this.responseAliases.set(new RegExp(`${this.internalTargetRequest.protocol}://([a-zA-Z0-9\\-]*)\\.${this.internalTargetRequest.hostname}`, "g"), `${this.internalSourceRequest.protocol}://$1.${this.internalSourceRequest.hostname}:${this.internalSourceRequest.port}`);
        // http://hostname/ -> http://localhost:port/
        this.responseAliases.set(new RegExp(`${this.internalTargetRequest.protocol}://${this.internalTargetRequest.hostname}`, "g"), `${this.internalSourceRequest.protocol}://${this.internalSourceRequest.hostname}:${this.internalSourceRequest.port}`);
        // hostname:port <- localhost:port
        this.requestAliases.set(new RegExp(`${this.internalSourceRequest.hostname}:${this.internalSourceRequest.port}`, "g"), `${this.internalTargetRequest.hostname}`);
    }
}
exports.Parser = Parser;

//# sourceMappingURL=parser.js.map
