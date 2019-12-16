"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protocol_1 = require("../../protocol/protocol");
class Parser {
    constructor() {
        this.internalTargetUrl = '';
        this.internalSourceUrl = '';
        this.internalTargetRequest = new protocol_1.Http.Request();
        this.internalSourceRequest = new protocol_1.Http.Request();
        this.aliases = new Map();
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
    }
    parseResponse(response) {
        if (!response.isBinary()) {
            for (let alias of this.aliases) {
                response.body = response.body.replace(alias[0], alias[1]);
            }
        }
    }
    buildAliases() {
        this.aliases = new Map();
        // http://hostname/ -> http://localhost:port/
        this.aliases.set(new RegExp(`${this.internalTargetRequest.protocol}://${this.internalTargetRequest.hostname}`, 'g'), `${this.internalSourceRequest.protocol}://${this.internalSourceRequest.hostname}:${this.internalSourceRequest.port}`);
        // http://(*).hostname/ -> http://$0.localhost:port/
        this.aliases.set(new RegExp(`${this.internalTargetRequest.protocol}://([a-zA-Z0-9\\-]*)\\.${this.internalTargetRequest.hostname}`, 'g'), `${this.internalSourceRequest.protocol}://$1.${this.internalSourceRequest.hostname}:${this.internalSourceRequest.port}`);
        // http://hostname:port/ -> http://localhost:port/
        this.aliases.set(new RegExp(`${this.internalTargetRequest.protocol}://${this.internalTargetRequest.hostname}:${this.internalTargetRequest.port}`, 'g'), `${this.internalSourceRequest.protocol}://${this.internalSourceRequest.hostname}:${this.internalSourceRequest.port}`);
        // http://(*).hostname:port/ -> http://$0.localhost:port/
        this.aliases.set(new RegExp(`${this.internalTargetRequest.protocol}://([a-zA-Z0-9\\-]*)\\.${this.internalTargetRequest.hostname}:${this.internalTargetRequest.port}`, 'g'), `${this.internalSourceRequest.protocol}://$1.${this.internalSourceRequest.hostname}:${this.internalSourceRequest.port}`);
    }
}
exports.Parser = Parser;

//# sourceMappingURL=parser.js.map
